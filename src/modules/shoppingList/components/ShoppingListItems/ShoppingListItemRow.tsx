import type { DealStore } from '@/modules/deals'
import { Badge } from '@/shared/components/Badge/Badge'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { formatWeekday } from '@/shared/utils/dates'
import { formatMoney } from '@/shared/utils/money'
import type { ShoppingListItem } from '../../types'
import { getItemPrice } from '../../utils'
import { ShoppingListItemActions } from './ShoppingListItemActions'

interface ShoppingListItemRowProps {
  item: ShoppingListItem
  store: DealStore | null
  onEdit: (item: ShoppingListItem) => void
  onDelete: (item: ShoppingListItem) => void
  className?: string
}

export const ShoppingListItemRow = ({
  item,
  store,
  onEdit,
  onDelete,
  className,
}: ShoppingListItemRowProps) => {
  const { deal, total, saving } = getItemPrice(item, store)
  const noDealText = store ? `No deal at ${store} this week` : 'No deal this week'

  return (
    <li className={cn('flex items-center gap-3 py-3 first:pt-0 last:pb-0', className)}>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex min-w-0 items-center gap-2">
          <Text render={<span />} weight="medium" color="strong" className="truncate">
            {item.name}
          </Text>
          {item.quantity > 1 && (
            <Text render={<span />} size="sm" color="muted" className="shrink-0 tabular-nums">
              × {item.quantity}
            </Text>
          )}
          {deal?.memberPrice && (
            <Badge className="shrink-0 px-2 py-0.5 text-xs">Member price</Badge>
          )}
        </div>
        <Text size="sm" color="muted" className="truncate">
          {deal ? (
            <>
              {deal.store} · {deal.productName} · Ends{' '}
              <time dateTime={deal.endsOn}>{formatWeekday(deal.endsOn)}</time>
            </>
          ) : (
            noDealText
          )}
        </Text>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5 text-right tabular-nums">
        <Text
          render={<span />}
          weight={total === null ? 'normal' : 'semibold'}
          color={total === null ? 'muted' : 'strong'}
        >
          {total === null
            ? 'No price'
            : formatMoney(total, { currency: item.currency, decimals: 'always' })}
        </Text>
        {deal && saving > 0 && (
          <Text render={<span />} size="sm" color="inherit" className="text-income">
            Save {formatMoney(saving, { currency: item.currency, decimals: 'always' })}
          </Text>
        )}
        {!deal && total !== null && (
          <Text render={<span />} size="sm" color="muted">
            Usual price
          </Text>
        )}
      </div>
      <ShoppingListItemActions item={item} onEdit={onEdit} onDelete={onDelete} />
    </li>
  )
}
