import { Button } from '@/shared/components/Button/Button'
import { Card } from '@/shared/components/Card/Card'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { dealStores } from '../../constants'
import type { StoreFlyer } from '../../types'
import { StoreFlyerRow } from './StoreFlyerRow'
import { StoreFlyerRowSkeleton } from './StoreFlyerRowSkeleton'

interface StoreFlyersProps {
  flyers: StoreFlyer[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
  className?: string
}

export const StoreFlyers = ({
  flyers,
  isLoading,
  isError,
  onRetry,
  className,
}: StoreFlyersProps) => {
  return (
    <Card className={cn('gap-5', className)}>
      <div className="flex flex-col gap-1">
        <Text render={<h2 />} size="xl" weight="semibold" color="strong">
          Store flyers
        </Text>
        <Text size="sm" color="muted">
          The latest flyer from each store.
        </Text>
      </div>
      {isError ? (
        <div role="alert" className="flex flex-col items-center gap-3 py-8 text-center">
          <Text size="sm" color="muted">
            Couldn't load flyers.
          </Text>
          <Button variant="secondary" disabled={false} onClick={onRetry}>
            Try again
          </Button>
        </div>
      ) : (
        <ul aria-busy={isLoading} className="flex flex-col divide-y divide-muted">
          {dealStores.map((store) =>
            isLoading ? (
              <StoreFlyerRowSkeleton key={store} />
            ) : (
              <StoreFlyerRow
                key={store}
                store={store}
                flyer={flyers.find((flyer) => flyer.store === store)}
              />
            ),
          )}
        </ul>
      )}
    </Card>
  )
}
