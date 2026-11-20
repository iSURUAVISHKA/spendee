import { useId } from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { Label } from '@/shared/components/Label/Label'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
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
        className="h-10 w-full rounded-[4px] border border-border bg-popover px-3 text-sm text-foreground-strong outline-none placeholder:text-input-placeholder focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/50 data-disabled:cursor-not-allowed data-disabled:opacity-50"
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
