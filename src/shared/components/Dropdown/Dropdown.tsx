import { Select as BaseSelect } from '@base-ui/react/select'
import { ArrowDown01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'
import { buttonVariants } from '@/shared/components/Button/buttonVariants'
import { cn } from '@/shared/utils/cn'
import { dropdownItemClassName, dropdownPopupClassName } from './constants'
import type { DropdownProps } from './types'
import { toValueArray } from './utils'

export const Dropdown = <Value extends string>({
  name,
  options,
  multiple = false,
  value,
  defaultValue = [],
  onValueChange,
  className,
}: DropdownProps<Value>) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const selected = value ?? uncontrolledValue
  const count = selected.length
  const selectedLabel = multiple
    ? undefined
    : options.find((option) => option.value === selected[0])?.label
  const triggerLabel = selectedLabel ? `${name}: ${selectedLabel}` : name

  const handleValueChange = (nextValue: Value[] | Value | null) => {
    const nextSelected = toValueArray(nextValue)

    setUncontrolledValue(nextSelected)
    onValueChange?.(nextSelected)
  }

  return (
    <BaseSelect.Root<Value, boolean>
      multiple={multiple}
      value={multiple ? selected : (selected[0] ?? null)}
      onValueChange={handleValueChange}
    >
      <BaseSelect.Trigger
        aria-label={multiple && count > 0 ? `${name}, ${count} selected` : triggerLabel}
        className={cn(buttonVariants({ variant: 'secondary' }), 'group', className)}
      >
        {triggerLabel}
        {multiple && count > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-xs tabular-nums">
            {count}
          </span>
        )}
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          aria-hidden
          className="transition-transform group-data-popup-open:rotate-180"
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
  )
}
