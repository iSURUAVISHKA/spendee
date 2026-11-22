import type { Ref } from 'react'
import type { Input as BaseInput } from '@base-ui/react/input'
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

export interface DatePickerProps {
  label: string
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string) => void
  placeholder?: string
  errorMessage?: string | null
  id?: string
  ref?: Ref<HTMLInputElement>
  className?: string
}

export interface DatePickerInputProps extends Omit<BaseInput.Props, 'className'> {
  inputRef?: Ref<HTMLInputElement>
  className?: string
}

export interface DatePickerHeaderProps extends Pick<
  ReactDatePickerCustomHeaderProps,
  'monthDate' | 'decreaseMonth' | 'increaseMonth'
> {}
