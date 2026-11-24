import { SparklesIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@/shared/components/Button/Button'
import { Card } from '@/shared/components/Card/Card'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { RoundIcon } from '../RoundIcon/RoundIcon'

interface TipOfTheWeekProps {
  title: string
  message: string
  confirmLabel?: string
  onConfirm?: () => void
  dismissLabel?: string
  onDismiss?: () => void
  className?: string
}

export const TipOfTheWeek = ({
  title,
  message,
  confirmLabel,
  onConfirm,
  dismissLabel,
  onDismiss,
  className,
}: TipOfTheWeekProps) => {
  return (
    <Card className={cn('gap-4', className)}>
      <div className="flex items-center gap-3">
        <RoundIcon icon={<HugeiconsIcon icon={SparklesIcon} />} tone="blue" />
        <Text render={<h2 />} size="xl" weight="semibold" color="strong">
          {title}
        </Text>
      </div>
      <Text>
        <span className="sr-only">AI-generated tip: </span>
        {message}
      </Text>
      {(confirmLabel || dismissLabel) && (
        <div className="flex flex-wrap gap-2">
          {confirmLabel && (
            <Button variant="secondary" disabled={false} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          )}
          {dismissLabel && (
            <Button variant="secondary" disabled={false} onClick={onDismiss}>
              {dismissLabel}
            </Button>
          )}
        </div>
      )}
    </Card>
  )
}
