import { Badge } from '@/shared/components/Badge/Badge'
import { Card } from '@/shared/components/Card/Card'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { formatWeekday } from '@/shared/utils/dates'
import type { Deal } from '../../types'
import { AddToShoppingListButton } from '../AddToShoppingListButton/AddToShoppingListButton'
import { DealPrice } from '../DealPrice/DealPrice'

interface DealCardProps {
  deal: Deal
  onAdd: (deal: Deal) => void
  className?: string
}

export const DealCard = ({ deal, onAdd, className }: DealCardProps) => {
  return (
    <Card className={cn('h-full gap-4', className)}>
      <div className="flex items-center justify-between gap-2">
        <Text size="sm" color="muted" className="truncate">
          {deal.store} · Ends <time dateTime={deal.endsOn}>{formatWeekday(deal.endsOn)}</time>
        </Text>
        {deal.memberPrice && <Badge className="shrink-0 px-2 py-0.5 text-xs">Member price</Badge>}
      </div>
      <div className="flex flex-col gap-0.5">
        <Text render={<h3 />} weight="semibold" color="strong">
          {deal.productName}
        </Text>
        <Text size="sm" color="muted" lang="sv">
          {deal.description}
        </Text>
      </div>
      <div className="mt-auto flex items-end justify-between gap-4">
        <DealPrice
          price={deal.price}
          unitPrice={deal.unitPrice}
          unit={deal.unit}
          currency={deal.currency}
        />
        <AddToShoppingListButton
          productName={deal.productName}
          isAdded={deal.onShoppingList}
          onAdd={() => onAdd(deal)}
        />
      </div>
    </Card>
  )
}
