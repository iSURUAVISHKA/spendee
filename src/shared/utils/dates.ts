import dayjs from 'dayjs'

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

export const formatTimestamp = (dateTime: string) => {
  const value = dayjs(dateTime)
  const today = dayjs()

  if (value.isSame(today, 'day')) return `Today, ${value.format('HH:mm')}`
  if (value.isSame(today.subtract(1, 'day'), 'day')) return `Yesterday, ${value.format('HH:mm')}`
  if (value.isSame(today, 'year')) return value.format('D MMM')

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
