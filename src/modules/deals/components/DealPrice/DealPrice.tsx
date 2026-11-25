import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { formatMoney } from '@/shared/utils/money'

interface DealPriceProps {
  price: number
  unitPrice: number
  unit: string
  currency: string
  className?: string
}

export const DealPrice = ({ price, unitPrice, unit, currency, className }: DealPriceProps) => {
  return (
    <div className={cn('flex flex-col gap-0.5 tabular-nums', className)}>
      <Text size="xl" weight="semibold" color="strong">
        {formatMoney(price, { currency, decimals: 'always' })}
      </Text>
      <Text size="sm" color="muted">
        {formatMoney(unitPrice, { currency, decimals: 'always' })}/{unit}
      </Text>
    </div>
  )
}
