import dayjs, { type Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import type { Week } from '@/shared/types/week'

dayjs.extend(isoWeek)

export const formatShortDate = (date: string) => dayjs(date).format('D MMM')

export const formatDate = (date: string) => dayjs(date).format('D MMM YYYY')

export const formatWeekday = (date: string) => dayjs(date).format('ddd')

export const formatDateRange = (start: string, end: string) => {
  const from = dayjs(start)
  const to = dayjs(end)

  if (from.isSame(to, 'month')) return `${from.format('D')}–${to.format('D MMM YYYY')}`
  if (from.isSame(to, 'year')) return `${from.format('D MMM')} – ${to.format('D MMM YYYY')}`

  return `${from.format('D MMM YYYY')} – ${to.format('D MMM YYYY')}`
}

export const formatShortDateRange = (start: string, end: string) => {
  const from = dayjs(start)
  const to = dayjs(end)

  if (from.isSame(to, 'month')) return `${from.format('MMM D')}–${to.format('D')}`

  return `${from.format('MMM D')} – ${to.format('MMM D')}`
}

export const getCurrentWeek = (): Week => {
  const today = dayjs()

  return {
    number: today.isoWeek(),
    start: today.startOf('isoWeek').format('YYYY-MM-DD'),
    end: today.endOf('isoWeek').format('YYYY-MM-DD'),
  }
}

const getRelativeDay = (value: Dayjs) => {
  const today = dayjs()

  if (value.isSame(today, 'day')) return 'Today'
  if (value.isSame(today.subtract(1, 'day'), 'day')) return 'Yesterday'

  return null
}

export const formatRelativeDay = (dateTime: string) => {
  const value = dayjs(dateTime)
  const relativeDay = getRelativeDay(value)

  if (relativeDay) return relativeDay
  if (value.isAfter(dayjs().subtract(7, 'day'), 'day')) return value.format('dddd')

  return value.format('D MMM')
}

export const formatTimestamp = (dateTime: string) => {
  const value = dayjs(dateTime)
  const relativeDay = getRelativeDay(value)

  if (relativeDay) return `${relativeDay}, ${value.format('HH:mm')}`
  if (value.isSame(dayjs(), 'year')) return value.format('D MMM')

  return value.format('D MMM YYYY')
}

export const formatMonthYear = (year: number, month: number) =>
  dayjs()
    .year(year)
    .month(month - 1)
    .format('MMMM YYYY')

export const formatShortMonth = (month: number) =>
  dayjs()
    .month(month - 1)
    .format('MMM')
