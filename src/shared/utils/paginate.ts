import type { PaginationData } from '@/shared/components/Pagination/types'

export const paginate = <Item>(items: Item[], page: number, pageSize: number) => {
  const lastPage = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(page, lastPage)
  const start = (currentPage - 1) * pageSize

  const pagination: PaginationData = {
    page: currentPage,
    pageSize,
    totalCount: items.length,
  }

  return { data: items.slice(start, start + pageSize), pagination }
}
