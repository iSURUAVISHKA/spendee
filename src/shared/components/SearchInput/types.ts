import type { Input as BaseInput } from '@base-ui/react/input'

export interface SearchInputProps extends Omit<
  BaseInput.Props,
  'className' | 'type' | 'value' | 'defaultValue'
> {
  defaultValue?: string
  onClear?: () => void
  className?: string
}
