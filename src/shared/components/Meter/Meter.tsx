import { Meter as BaseMeter } from '@base-ui/react/meter'
import { cn } from '@/shared/utils/cn'

export const Meter = BaseMeter.Root

export const MeterLabel = BaseMeter.Label

export const MeterValue = BaseMeter.Value

interface MeterTrackProps extends Omit<BaseMeter.Track.Props, 'className'> {
  className?: string
}

export const MeterTrack = ({ className, ...props }: MeterTrackProps) => {
  return (
    <BaseMeter.Track
      className={cn('h-2 overflow-hidden rounded-full bg-muted', className)}
      {...props}
    />
  )
}

interface MeterIndicatorProps extends Omit<BaseMeter.Indicator.Props, 'className'> {
  className?: string
}

export const MeterIndicator = ({ className, ...props }: MeterIndicatorProps) => {
  return (
    <BaseMeter.Indicator
      className={cn('rounded-full transition-[width] duration-500', className)}
      {...props}
    />
  )
}
