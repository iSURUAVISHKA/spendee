import { Dropdown } from '@/shared/components/Dropdown/Dropdown'
import { bankStatementOptions, categoryOptions, sourceOptions } from '../../constants'
import type { TransactionFilters } from '../../types'

interface ActivityFiltersProps {
  filters: TransactionFilters
  onFilterChange: <Key extends keyof TransactionFilters>(
    key: Key,
    value: TransactionFilters[Key],
  ) => void
}

export const ActivityFilters = ({ filters, onFilterChange }: ActivityFiltersProps) => {
  return (
    <>
      <Dropdown
        name="Category"
        multiple
        options={categoryOptions}
        value={filters.category}
        onValueChange={(value) => onFilterChange('category', value)}
      />
      <Dropdown
        name="Source"
        multiple
        options={sourceOptions}
        value={filters.source}
        onValueChange={(value) => onFilterChange('source', value)}
      />
      <Dropdown
        name="Bank statement"
        multiple
        options={bankStatementOptions}
        value={filters.bankStatement}
        onValueChange={(value) => onFilterChange('bankStatement', value)}
      />
    </>
  )
}
