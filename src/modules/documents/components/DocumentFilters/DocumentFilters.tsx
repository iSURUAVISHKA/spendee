import { Dropdown } from '@/shared/components/Dropdown/Dropdown'
import { documentKindOptions, documentStatusOptions } from '../../constants'
import type { DocumentFilterValues } from '../../types'

interface DocumentFiltersProps {
  filters: DocumentFilterValues
  onFilterChange: <Key extends keyof DocumentFilterValues>(
    key: Key,
    value: DocumentFilterValues[Key],
  ) => void
}

export const DocumentFilters = ({ filters, onFilterChange }: DocumentFiltersProps) => {
  return (
    <>
      <Dropdown
        name="Status"
        multiple
        options={documentStatusOptions}
        value={filters.status}
        onValueChange={(value) => onFilterChange('status', value)}
      />
      <Dropdown
        name="Type"
        multiple
        options={documentKindOptions}
        value={filters.kind}
        onValueChange={(value) => onFilterChange('kind', value)}
      />
    </>
  )
}
