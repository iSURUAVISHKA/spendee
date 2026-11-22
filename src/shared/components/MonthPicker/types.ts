export interface YearMonth {
  year: number
  month: number
}

export interface MonthPickerProps {
  value?: YearMonth
  defaultValue?: YearMonth
  onValueChange?: (value: YearMonth) => void
  className?: string
}
