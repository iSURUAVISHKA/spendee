import type { ReactNode } from 'react'
import { SearchInput } from '@/shared/components/SearchInput/SearchInput'
import { Text } from '@/shared/components/Text/Text'
import { useDebouncedCallback } from '@/shared/hooks/useDebouncedCallback'
import { useSearchParam } from '@/shared/hooks/useSearchParam'
import { cn } from '@/shared/utils/cn'

interface HeaderProps {
  title: string
  actions?: ReactNode
  withSearch?: boolean
  className?: string
}

export const Header = ({ title, actions, withSearch = false, className }: HeaderProps) => {
  const [search, setSearch] = useSearchParam()
  const debouncedSetSearch = useDebouncedCallback(setSearch, 300)

  return (
    <header
      className={cn(
        'box-content grid min-h-9 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 border-b border-border pb-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]',
        className,
      )}
    >
      <Text render={<h1 />} size="xl" weight="semibold" className="min-w-0 truncate">
        {title}
      </Text>
      {withSearch && (
        <SearchInput
          placeholder="Search"
          defaultValue={search}
          onValueChange={(value) => debouncedSetSearch(value)}
          onClear={() => debouncedSetSearch('')}
          className="col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:w-80"
        />
      )}
      {actions && (
        <div className="col-start-2 row-start-1 flex items-center gap-2 justify-self-end lg:col-start-3">
          {actions}
        </div>
      )}
    </header>
  )
}
