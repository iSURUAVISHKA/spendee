import { ArrowDown01Icon, ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRef, useState } from 'react'
import { Button } from '@/shared/components/Button/Button'
import { buttonVariants } from '@/shared/components/Button/buttonVariants'
import { IconButton } from '@/shared/components/Button/IconButton'
import { Popover, PopoverTrigger } from '@/shared/components/Popover/Popover'
import { PopoverPopup } from '@/shared/components/Popover/PopoverPopup'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { formatMonthYear, formatShortMonth } from '@/shared/utils/dates'
import { months } from './constants'
import type { MonthPickerProps } from './types'
import { getCurrentYearMonth } from './utils'

export const MonthPicker = ({
  value,
  defaultValue,
  onValueChange,
  className,
}: MonthPickerProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    () => defaultValue ?? getCurrentYearMonth(),
  )
  const selected = value ?? uncontrolledValue
  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(selected.year)
  const selectedMonthRef = useRef<HTMLButtonElement>(null)

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) setViewYear(selected.year)
    setOpen(nextOpen)
  }

  const handleSelect = (month: number) => {
    const nextValue = { year: viewYear, month }

    setUncontrolledValue(nextValue)
    onValueChange?.(nextValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger className={cn(buttonVariants({ variant: 'secondary' }), 'group', className)}>
        {formatMonthYear(selected.year, selected.month)}
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          aria-hidden
          className="transition-transform group-data-popup-open:rotate-180"
        />
      </PopoverTrigger>
      <PopoverPopup
        align="start"
        aria-label="Choose month"
        initialFocus={selectedMonthRef}
        className="w-64"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <IconButton
            icon={<HugeiconsIcon icon={ArrowLeft01Icon} />}
            tooltip="Previous year"
            onClick={() => setViewYear(viewYear - 1)}
          />
          <Text render={<span />} weight="semibold" color="strong" aria-live="polite">
            {viewYear}
          </Text>
          <IconButton
            icon={<HugeiconsIcon icon={ArrowRight01Icon} />}
            tooltip="Next year"
            onClick={() => setViewYear(viewYear + 1)}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {months.map((month) => {
            const isSelected = viewYear === selected.year && month === selected.month

            return (
              <Button
                key={month}
                ref={isSelected ? selectedMonthRef : undefined}
                variant={isSelected ? 'primary' : 'secondary'}
                disabled={false}
                aria-pressed={isSelected}
                aria-label={formatMonthYear(viewYear, month)}
                onClick={() => handleSelect(month)}
              >
                {formatShortMonth(month)}
              </Button>
            )
          })}
        </div>
      </PopoverPopup>
    </Popover>
  )
}
