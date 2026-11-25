import { paginate } from '@/shared/utils/paginate'
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
  const { data, pagination } = paginate(results, page, pageSize)

  return {
    data,
    pagination,
    isLoading: false,
    isError: false,
    refetch: () => {},
  }
}
