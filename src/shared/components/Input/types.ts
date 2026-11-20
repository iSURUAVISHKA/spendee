import type { Input as BaseInput } from '@base-ui/react/input'

export interface InputProps extends Omit<BaseInput.Props, 'className'> {
  label: string
  errorMessage?: string | null
  className?: string
}
