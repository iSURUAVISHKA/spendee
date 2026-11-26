import { Card } from '@/shared/components/Card/Card'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'

interface ShoppingListStatProps {
  label: string
  value: string
  description: string
  isLoading: boolean
  highlight?: boolean
  className?: string
}

export const ShoppingListStat = ({
  label,
  value,
  description,
  isLoading,
  highlight = false,
  className,
}: ShoppingListStatProps) => {
  return (
    <Card className={cn('gap-2', className)}>
      <Text render={<dt />} size="sm" color="muted">
        {label}
      </Text>
      <dd className="flex flex-col gap-1">
        {isLoading ? (
          <span aria-hidden className="my-1 h-6 w-28 animate-pulse rounded bg-muted" />
        ) : (
          <Text
            render={<span />}
            size="2xl"
            weight="semibold"
            color={highlight ? 'inherit' : 'strong'}
            className={cn('tabular-nums', highlight && 'text-income')}
          >
            {value}
          </Text>
        )}
        <Text render={<span />} size="sm" color="muted">
          {isLoading ? 'Loading…' : description}
        </Text>
      </dd>
    </Card>
  )
}
