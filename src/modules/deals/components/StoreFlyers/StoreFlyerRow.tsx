import { Avatar } from '@/shared/components/Avatar/Avatar'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { formatRelativeDay } from '@/shared/utils/dates'
import type { DealStore, StoreFlyer } from '../../types'
import { formatDealCount, getStoreInitial } from '../../utils'
import { ViewFlyerLink } from '../ViewFlyerLink/ViewFlyerLink'

interface StoreFlyerRowProps {
  store: DealStore
  flyer?: StoreFlyer
  className?: string
}

export const StoreFlyerRow = ({ store, flyer, className }: StoreFlyerRowProps) => {
  return (
    <li className={cn('flex items-center gap-3 py-3 first:pt-0 last:pb-0', className)}>
      <Avatar shape="square" size="md" aria-hidden>
        {getStoreInitial(store)}
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Text weight="medium" color="strong" className="truncate">
          {store}
        </Text>
        <Text size="sm" color="muted" className="truncate">
          {flyer ? (
            <>
              {formatDealCount(flyer.dealCount)} · Uploaded by {flyer.uploadedBy} ·{' '}
              <time dateTime={flyer.uploadedAt}>{formatRelativeDay(flyer.uploadedAt)}</time>
            </>
          ) : (
            'No flyer this week'
          )}
        </Text>
      </div>
      {flyer && <ViewFlyerLink href={flyer.fileUrl} store={store} />}
    </li>
  )
}
