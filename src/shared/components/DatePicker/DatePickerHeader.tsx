import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { IconButton } from '@/shared/components/Button/IconButton'
import { Text } from '@/shared/components/Text/Text'
import { formatMonthYear } from '@/shared/utils/dates'
import type { DatePickerHeaderProps } from './types'

export const DatePickerHeader = ({
  monthDate,
  decreaseMonth,
  increaseMonth,
}: DatePickerHeaderProps) => {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <IconButton
        icon={<HugeiconsIcon icon={ArrowLeft01Icon} />}
        tooltip="Previous month"
        onClick={decreaseMonth}
      />
      <Text render={<span />} weight="semibold" color="strong">
        {formatMonthYear(monthDate.getFullYear(), monthDate.getMonth() + 1)}
      </Text>
      <IconButton
        icon={<HugeiconsIcon icon={ArrowRight01Icon} />}
        tooltip="Next month"
        onClick={increaseMonth}
      />
    </div>
  )
}
