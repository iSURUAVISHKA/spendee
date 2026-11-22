import dayjs, { type Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type { YearMonth } from './types'

dayjs.extend(customParseFormat)

const monthKeyFormat = 'YYYY-MM'

const toYearMonth = (date: Dayjs): YearMonth => ({ year: date.year(), month: date.month() + 1 })

export const getCurrentYearMonth = () => toYearMonth(dayjs())

export const toMonthKey = ({ year, month }: YearMonth) =>
  dayjs()
    .year(year)
    .month(month - 1)
    .format(monthKeyFormat)

export const parseMonthKey = (value: string) => {
  const date = dayjs(value, monthKeyFormat, true)

  return date.isValid() ? toYearMonth(date) : null
}
