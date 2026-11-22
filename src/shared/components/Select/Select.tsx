import { Select as BaseSelect } from '@base-ui/react/select'
import { ArrowDown01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useId } from 'react'
import {
  dropdownItemClassName,
  dropdownPopupClassName,
} from '@/shared/components/Dropdown/constants'
import { inputClassName } from '@/shared/components/Input/constants'
import { Label } from '@/shared/components/Label/Label'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import type { SelectProps } from './types'

export const Select = <Value extends string>({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select an option',
  errorMessage,
  disabled = false,
  id,
  name,
  ref,
  className,
}: SelectProps<Value>) => {
  const generatedId = useId()
  const triggerId = id ?? generatedId
  const errorId = `${triggerId}-error`

  const handleValueChange = (nextValue: Value | null) => {
    if (nextValue !== null) onValueChange?.(nextValue)
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={triggerId}>{label}</Label>
      <BaseSelect.Root<Value>
        items={options}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        name={name}
      >
        <BaseSelect.Trigger
          ref={ref}
          id={triggerId}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={errorMessage ? errorId : undefined}
          className={cn(
            inputClassName,
            'group flex cursor-pointer items-center justify-between gap-2 text-left data-popup-open:border-ring',
          )}
        >
          <BaseSelect.Value
            placeholder={placeholder}
            className="truncate data-placeholder:text-input-placeholder"
          />
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            aria-hidden
            className="size-4 shrink-0 text-muted-foreground transition-transform group-data-popup-open:rotate-180"
          />
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner
            align="start"
            sideOffset={4}
            alignItemWithTrigger={false}
            className="outline-none"
          >
            <BaseSelect.Popup className={dropdownPopupClassName}>
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  className={dropdownItemClassName}
                >
                  <BaseSelect.ItemIndicator className="col-start-1">
                    <HugeiconsIcon icon={Tick02Icon} className="size-4" aria-hidden />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText className="col-start-2">{option.label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
      {errorMessage && (
        <Text id={errorId} size="sm" color="destructive">
          {errorMessage}
        </Text>
      )}
    </div>
  )
}
