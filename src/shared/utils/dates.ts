import dayjs from 'dayjs'

export const formatShortDate = (date: string) => dayjs(date).format('D MMM')

export const formatDate = (date: string) => dayjs(date).format('D MMM YYYY')

export const formatWeekday = (date: string) => dayjs(date).format('ddd')

export const formatMonthYear = (year: number, month: number) =>
  dayjs()
    .year(year)
    .month(month - 1)
    .format('MMMM YYYY')

export const formatShortMonth = (month: number) =>
  dayjs()
    .month(month - 1)
    .format('MMM')
