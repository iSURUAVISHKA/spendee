import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { dateKeyFormat } from './constants'

dayjs.extend(customParseFormat)

export const toDateKey = (date: Date) => dayjs(date).format(dateKeyFormat)

export const parseDateKey = (value?: string | null) => {
  if (!value) return undefined

  const date = dayjs(value, dateKeyFormat, true)

  return date.isValid() ? date.toDate() : undefined
}

export const getDayState = (date: Date, selected?: Date) => {
  if (selected && dayjs(date).isSame(selected, 'day')) return 'selected'
  if (dayjs(date).isSame(dayjs(), 'day')) return 'today'

  return 'default'
}
