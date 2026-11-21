export type PageItem = number | 'start-ellipsis' | 'end-ellipsis'

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => from + index)

export const getPageItems = (page: number, totalPages: number): PageItem[] => {
  if (totalPages <= 7) return range(1, totalPages)

  if (page <= 4) return [...range(1, 5), 'end-ellipsis', totalPages]

  if (page >= totalPages - 3) return [1, 'start-ellipsis', ...range(totalPages - 4, totalPages)]

  return [1, 'start-ellipsis', page - 1, page, page + 1, 'end-ellipsis', totalPages]
}
