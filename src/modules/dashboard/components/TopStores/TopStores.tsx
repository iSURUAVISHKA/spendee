import { Badge } from '@/shared/components/Badge/Badge'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { formatMoney } from '@/shared/utils/money'
import type { StoreSpending } from '../../types'

interface TopStoresProps {
  title: string
  stores: StoreSpending[]
  className?: string
}

export const TopStores = ({ title, stores, className }: TopStoresProps) => {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Text render={<h3 />} size="sm" weight="semibold" color="muted">
        {title}
      </Text>
      <ul className="flex flex-wrap gap-2">
        {stores.map((store) => (
          <li key={store.id}>
            <Badge>
              {store.name}
              <span className="font-semibold">
                {formatMoney(store.amount, { decimals: 'never' })}
              </span>
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}
