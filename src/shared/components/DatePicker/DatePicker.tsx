import { useId, useState, type KeyboardEvent } from 'react'
import ReactDatePicker from 'react-datepicker'
import { Label } from '@/shared/components/Label/Label'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { calendarClassName, displayDateFormat, weekDayClassName, weekStartsOn } from './constants'
import { DatePickerHeader } from './DatePickerHeader'
import { DatePickerInput } from './DatePickerInput'
import { dayVariants } from './dayVariants'
import type { DatePickerProps } from './types'
import { getDayState, parseDateKey, toDateKey } from './utils'

export const DatePicker = ({
  label,
  value,
  defaultValue = null,
  onValueChange,
  placeholder = 'Select a date',
  errorMessage,
  id,
  ref,
  className,
}: DatePickerProps) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const selectedDate = parseDateKey(value === undefined ? uncontrolledValue : value)

  const handleChange = (date: Date | null) => {
    if (!date) return

    const nextValue = toDateKey(date)
    setUncontrolledValue(nextValue)
    onValueChange?.(nextValue)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && event.defaultPrevented) event.stopPropagation()
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)} onKeyDown={handleKeyDown}>
      <Label htmlFor={inputId}>{label}</Label>
      <ReactDatePicker
        id={inputId}
        customInput={
          <DatePickerInput
            inputRef={ref}
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={errorMessage ? errorId : undefined}
          />
        }
        selected={selectedDate}
        onChange={handleChange}
        dateFormat={displayDateFormat}
        placeholderText={placeholder}
        autoComplete="off"
        fixedHeight
        useWeekdaysShort
        calendarStartDay={weekStartsOn}
        showPopperArrow={false}
        popperPlacement="bottom-start"
        popperClassName="z-50"
        calendarClassName={calendarClassName}
        weekDayClassName={() => weekDayClassName}
        renderCustomDayName={({ shortName, fullName }) => (
          <>
            <span className="sr-only">{fullName}</span>
            <span aria-hidden>{shortName}</span>
          </>
        )}
        dayClassName={(date) => dayVariants({ state: getDayState(date, selectedDate) })}
        renderCustomHeader={(headerProps) => <DatePickerHeader {...headerProps} />}
      />
      {errorMessage && (
        <Text id={errorId} size="sm" color="destructive">
          {errorMessage}
        </Text>
      )}
    </div>
  )
}
