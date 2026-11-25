import { Dropdown } from '@/shared/components/Dropdown/Dropdown'
import { dealSortOptions, dealStoreOptions } from '../../constants'
import type { DealFilterValues, DealSort } from '../../types'

interface DealsFiltersProps {
  filters: DealFilterValues
  onFilterChange: <Key extends keyof DealFilterValues>(
    key: Key,
    value: DealFilterValues[Key],
  ) => void
  sort: DealSort
  onSortChange: (sort: DealSort) => void
}

export const DealsFilters = ({
  filters,
  onFilterChange,
  sort,
  onSortChange,
}: DealsFiltersProps) => {
  const handleSortChange = ([nextSort]: DealSort[]) => {
    if (nextSort) onSortChange(nextSort)
  }

  return (
    <>
      <Dropdown
        name="Store"
        multiple
        options={dealStoreOptions}
        value={filters.store}
        onValueChange={(value) => onFilterChange('store', value)}
      />
      <Dropdown
        name="Sort"
        options={dealSortOptions}
        value={[sort]}
        onValueChange={handleSortChange}
      />
    </>
  )
}
