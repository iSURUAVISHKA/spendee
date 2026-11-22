import { useId } from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { Label } from '@/shared/components/Label/Label'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { inputClassName } from './constants'
import type { InputProps } from './types'

export const Input = ({ label, errorMessage, id, className, ...props }: InputProps) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <BaseInput
        id={inputId}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={errorMessage ? errorId : undefined}
        className={inputClassName}
        {...props}
      />
      {errorMessage && (
        <Text id={errorId} size="sm" color="destructive">
          {errorMessage}
        </Text>
      )}
    </div>
  )
}
