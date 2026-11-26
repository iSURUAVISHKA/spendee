import { Store01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { formatDealCount, getStoreInitial } from '@/modules/deals'
import { Avatar } from '@/shared/components/Avatar/Avatar'
import { Badge } from '@/shared/components/Badge/Badge'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { formatMoney } from '@/shared/utils/money'
import { shoppingListCurrency } from '../../constants'
import type { StoreTotals } from '../../types'
import { getStoreLabel } from '../../utils'

interface StoreComparisonRowProps {
  totals: StoreTotals
  isSelected: boolean
  isCheapest: boolean
  onSelect: () => void
  className?: string
}

const getDescription = ({ store, dealCount }: StoreTotals) => {
  if (store === null) return 'Best deal for each item'
  if (dealCount === 0) return 'No deals for your list'

  return formatDealCount(dealCount)
}

export const StoreComparisonRow = ({
  totals,
  isSelected,
  isCheapest,
  onSelect,
  className,
}: StoreComparisonRowProps) => {
  const { store, total, saving } = totals

  return (
    <li className={className}>
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={onSelect}
        className="flex w-full cursor-pointer items-center gap-3 rounded-md border border-muted p-3 text-left transition-colors outline-none hover:bg-muted/40 focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-pressed:border-primary aria-pressed:bg-muted/40"
      >
        <Avatar shape="square" size="md" aria-hidden>
          {store ? getStoreInitial(store) : <HugeiconsIcon icon={Store01Icon} className="size-5" />}
        </Avatar>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex min-w-0 items-center gap-2">
            <Text render={<span />} weight="medium" color="strong" className="truncate">
              {getStoreLabel(store)}
            </Text>
            {isCheapest && <Badge className="shrink-0 px-2 py-0.5 text-xs">Cheapest</Badge>}
          </span>
          <Text render={<span />} size="sm" color="muted" className="truncate">
            {getDescription(totals)}
          </Text>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-0.5 tabular-nums">
          <Text render={<span />} weight="semibold" color="strong">
            {formatMoney(total, { currency: shoppingListCurrency, decimals: 'always' })}
          </Text>
          {saving > 0 && (
            <Text render={<span />} size="sm" color="inherit" className="text-income">
              Save {formatMoney(saving, { currency: shoppingListCurrency, decimals: 'always' })}
            </Text>
          )}
        </span>
        <HugeiconsIcon
          icon={Tick02Icon}
          aria-hidden
          className={cn('size-5 shrink-0 text-foreground-strong', !isSelected && 'invisible')}
        />
      </button>
    </li>
  )
}
