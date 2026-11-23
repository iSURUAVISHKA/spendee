import { Progress as BaseProgress } from '@base-ui/react/progress'
import { cn } from '@/shared/utils/cn'

export const Progress = BaseProgress.Root

export const ProgressLabel = BaseProgress.Label

export const ProgressValue = BaseProgress.Value

interface ProgressTrackProps extends Omit<BaseProgress.Track.Props, 'className'> {
  className?: string
}

export const ProgressTrack = ({ className, ...props }: ProgressTrackProps) => {
  return (
    <BaseProgress.Track
      className={cn('h-1.5 overflow-hidden rounded-full bg-muted', className)}
      {...props}
    />
  )
}

interface ProgressIndicatorProps extends Omit<BaseProgress.Indicator.Props, 'className'> {
  className?: string
}

export const ProgressIndicator = ({ className, ...props }: ProgressIndicatorProps) => {
  return (
    <BaseProgress.Indicator
      className={cn(
        'rounded-full bg-(image:--primary-gradient) transition-[width] duration-300',
        className,
      )}
      {...props}
    />
  )
}
