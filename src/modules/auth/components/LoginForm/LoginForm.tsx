import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/components/Button/Button'
import { Input } from '@/shared/components/Input/Input'
import { Text } from '@/shared/components/Text/Text'
import BrandLogo from '@/shared/assets/icon/spendee_wallet_icon.svg?react'
import { loginSchema, type LoginFormValues } from '../../schemas'
import type { LoginCredentials } from '../../types'

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center gap-5">
        <BrandLogo width={100} height={100} />
        <Text render={<h1 />} size="3xl" weight="medium">
          Sign in to your account
        </Text>
      </div>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-8">
        <Controller
          name="email"
          control={form.control}
          render={({ field: { ref, name, value, onBlur, onChange }, fieldState: { error } }) => (
            <Input
              ref={ref}
              label="Email"
              name={name}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
              type="email"
              autoComplete="email"
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field: { ref, name, value, onBlur, onChange }, fieldState: { error } }) => (
            <Input
              ref={ref}
              label="Password"
              name={name}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
              type="password"
              autoComplete="current-password"
              errorMessage={error?.message}
            />
          )}
        />
        <Button type="submit" size="lg" className="mt-2 w-full" disabled={!form.formState.isDirty}>
          Log in
        </Button>
      </form>
    </div>
  )
}
