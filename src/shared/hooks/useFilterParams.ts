import { useSearchParams } from 'react-router'
import { pageParam } from '@/shared/constants/searchParams'
import { queueSearchParamsUpdate } from '@/shared/utils/searchParamsQueue'

type FilterOptions = Record<string, readonly string[]>

type FilterValues<Options extends FilterOptions> = {
  [Key in keyof Options]: Options[Key][number][]
}

const deserializeFilters = (params: URLSearchParams, options: FilterOptions) =>
  Object.fromEntries(
    Object.entries(options).map(([key, allowed]) => [
      key,
      params.getAll(key).filter((value) => allowed.includes(value)),
    ]),
  )

const serializeFilter = (params: URLSearchParams, key: string, values: readonly string[]) => {
  params.delete(key)
  values.forEach((value) => params.append(key, value))
}

export const useFilterParams = <Options extends FilterOptions>(options: Options) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const values = deserializeFilters(searchParams, options)
  const filters = values as FilterValues<Options>
  const hasFilters = Object.values(values).some((selected) => selected.length > 0)

  const updateParams = (update: (params: URLSearchParams) => void) => {
    queueSearchParamsUpdate(setSearchParams, (params) => {
      params.delete(pageParam)
      update(params)
    })
  }

  const changeFilter = <Key extends keyof Options & string>(
    key: Key,
    selected: FilterValues<Options>[Key],
  ) => {
    updateParams((params) => serializeFilter(params, key, selected))
  }

  const clearFilters = () => {
    updateParams((params) => Object.keys(options).forEach((key) => params.delete(key)))
  }

  return { filters, hasFilters, changeFilter, clearFilters }
}
