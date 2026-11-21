import { pageParam } from '@/shared/constants/searchParams'
import { useSearchParamState } from './useSearchParamState'

const deserializePage = (value: string) => {
  const page = Number(value)

  return Number.isInteger(page) && page >= 1 ? page : null
}

export const usePageParam = (defaultPage = 1) =>
  useSearchParamState(pageParam, {
    defaultValue: defaultPage,
    serialize: String,
    deserialize: deserializePage,
  })
