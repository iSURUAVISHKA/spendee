const shortDateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
})

const weekdayFormat = new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'UTC' })

const toUtcTime = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)

  return Date.UTC(year, month - 1, day)
}

export const formatShortDate = (date: string) => shortDateFormat.format(toUtcTime(date))

export const formatWeekday = (date: string) => weekdayFormat.format(toUtcTime(date))
