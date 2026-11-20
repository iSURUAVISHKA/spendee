import { Link } from 'react-router'
import { Button } from '@/shared/components/Button/Button'
import { buttonVariants } from '@/shared/components/Button/buttonVariants'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'

const actionClass = 'h-auto p-0 text-base font-normal'

interface SectionHeaderProps {
  title: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  className?: string
}

export const SectionHeader = ({
  title,
  actionLabel,
  actionHref,
  onAction,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <Text render={<h2 />} size="xl" weight="semibold" color="strong" className="min-w-0 truncate">
        {title}
      </Text>
      {actionLabel &&
        (actionHref ? (
          <Link to={actionHref} className={cn(buttonVariants({ variant: 'link' }), actionClass)}>
            {actionLabel}
          </Link>
        ) : (
          <Button variant="link" className={actionClass} disabled={false} onClick={onAction}>
            {actionLabel}
          </Button>
        ))}
    </div>
  )
}
