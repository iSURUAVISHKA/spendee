import type { ReactNode } from 'react'
import { Link } from 'react-router'
import BackIcon from '@/shared/assets/icon/Back.svg?react'
import { buttonVariants } from '@/shared/components/Button/buttonVariants'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { SearchParamInput } from '@/shared/widgets/SearchParamInput/SearchParamInput'

interface HeaderProps {
  title: string
  backTo?: string
  actions?: ReactNode
  withSearch?: boolean
  className?: string
}

export const Header = ({ title, backTo, actions, withSearch = false, className }: HeaderProps) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-20 box-content grid min-h-9 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 border-b border-border bg-background pt-4 pb-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        {backTo && (
          <Link
            to={backTo}
            aria-label="Back"
            className={buttonVariants({ variant: 'secondary', size: 'icon' })}
          >
            <BackIcon aria-hidden />
          </Link>
        )}
        <Text render={<h1 />} size="xl" weight="semibold" className="min-w-0 truncate">
          {title}
        </Text>
      </div>
      {withSearch && (
        <SearchParamInput
          placeholder="Search"
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
