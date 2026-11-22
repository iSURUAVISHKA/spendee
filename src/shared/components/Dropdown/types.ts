export interface DropdownOption<Value extends string = string> {
  value: Value
  label: string
}

export interface DropdownProps<Value extends string = string> {
  name: string
  options: DropdownOption<Value>[]
  multiple?: boolean
  value?: Value[]
  defaultValue?: Value[]
  onValueChange?: (value: Value[]) => void
  className?: string
}
