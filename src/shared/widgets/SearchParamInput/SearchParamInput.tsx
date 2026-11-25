import { SearchInput } from '@/shared/components/SearchInput/SearchInput'
import type { SearchInputProps } from '@/shared/components/SearchInput/types'
import { useDebouncedCallback } from '@/shared/hooks/useDebouncedCallback'
import { useSearchParam } from '@/shared/hooks/useSearchParam'

interface SearchParamInputProps extends Omit<
  SearchInputProps,
  'defaultValue' | 'onValueChange' | 'onClear'
> {}

export const SearchParamInput = (props: SearchParamInputProps) => {
  const [search, setSearch] = useSearchParam()
  const debouncedSetSearch = useDebouncedCallback(setSearch, 300)

  return (
    <SearchInput
      defaultValue={search}
      onValueChange={(value) => debouncedSetSearch(value)}
      onClear={() => debouncedSetSearch('')}
      {...props}
    />
  )
}
