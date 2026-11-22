import type { Ref } from 'react'
import type { DropdownOption } from '@/shared/components/Dropdown/types'

export interface SelectProps<Value extends string = string> {
  label: string
  options: DropdownOption<Value>[]
  value?: Value | null
  defaultValue?: Value | null
  onValueChange?: (value: Value) => void
  placeholder?: string
  errorMessage?: string | null
  disabled?: boolean
  id?: string
  name?: string
  ref?: Ref<HTMLButtonElement>
  className?: string
}
