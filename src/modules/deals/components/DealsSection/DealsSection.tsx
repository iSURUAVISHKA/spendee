import type { ReactNode } from 'react'
import { Button } from '@/shared/components/Button/Button'
import { Card } from '@/shared/components/Card/Card'
import { NoData } from '@/shared/components/NoData/NoData'
import { Pagination } from '@/shared/components/Pagination/Pagination'
import type { PaginationData } from '@/shared/components/Pagination/types'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import type { Deal } from '../../types'
import { DealsGrid } from '../DealsGrid/DealsGrid'

interface DealsSectionProps {
  toolbar: ReactNode
  deals: Deal[]
  pagination: PaginationData
  isLoading: boolean
  isError: boolean
  isFiltered: boolean
  onRetry: () => void
  onAdd: (deal: Deal) => void
  className?: string
}

export const DealsSection = ({
  toolbar,
  deals,
  pagination,
  isLoading,
  isError,
  isFiltered,
  onRetry,
  onAdd,
  className,
}: DealsSectionProps) => {
  const hasDeals = !isError && deals.length > 0
  const isEmpty = !isLoading && !isError && deals.length === 0

  return (
    <Card className={cn('gap-5', className)}>
      <div className="flex flex-col gap-1">
        <Text render={<h2 />} size="xl" weight="semibold" color="strong">
          This week's deals
        </Text>
        <Text size="sm" color="muted">
          Prices from the latest store flyers.
        </Text>
      </div>
      {toolbar}
      {(isLoading || hasDeals) && <DealsGrid deals={deals} isLoading={isLoading} onAdd={onAdd} />}
      {isError && (
        <div role="alert" className="flex flex-col items-center gap-3 py-12 text-center">
          <Text size="sm" color="muted">
            Couldn't load deals.
          </Text>
          <Button variant="secondary" disabled={false} onClick={onRetry}>
            Try again
          </Button>
        </div>
      )}
      {isEmpty && (
        <NoData
          title={isFiltered ? 'No matching deals' : 'No deals this week'}
          description={
            isFiltered
              ? 'Try a different search or clear the filters.'
              : 'Upload a store flyer to see its deals here.'
          }
        />
      )}
      {hasDeals && <Pagination {...pagination} />}
    </Card>
  )
}
