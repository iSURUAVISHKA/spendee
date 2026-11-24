import type { PaginationData } from '@/shared/components/Pagination/types'
import { sampleDocuments } from '../constants'
import type { DocumentFilterValues, UploadedDocument } from '../types'

interface UseSampleDocumentsOptions {
  filters: DocumentFilterValues
  page: number
  pageSize: number
}

const matches = <Value extends string>(selected: Value[], value: Value) =>
  selected.length === 0 || selected.includes(value)

const matchesFilters = (doc: UploadedDocument, filters: DocumentFilterValues) =>
  matches(filters.status, doc.status) && matches(filters.kind, doc.kind)

export const useSampleDocuments = ({ filters, page, pageSize }: UseSampleDocumentsOptions) => {
  const results = sampleDocuments.filter((doc) => matchesFilters(doc, filters))
  const lastPage = Math.max(1, Math.ceil(results.length / pageSize))
  const currentPage = Math.min(page, lastPage)
  const start = (currentPage - 1) * pageSize

  const pagination: PaginationData = {
    page: currentPage,
    pageSize,
    totalCount: results.length,
  }

  return {
    data: results.slice(start, start + pageSize),
    pagination,
    isLoading: false,
    isError: false,
    refetch: () => {},
  }
}
