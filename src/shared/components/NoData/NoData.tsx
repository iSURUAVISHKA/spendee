import type { ComponentProps } from 'react'
import NoResultsIcon from '@/shared/assets/icon/NoResults.svg?react'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'

interface NoDataProps extends Omit<ComponentProps<'div'>, 'title' | 'children'> {
  title: string
  description?: string
}

export const NoData = ({ title, description, className, ...props }: NoDataProps) => {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-4 py-12 text-center', className)}
      {...props}
    >

      <NoResultsIcon width={50} height={50} />

      <div className="flex flex-col gap-1">
        <Text weight="medium" color="strong">
          {title}
        </Text>
        {description && (
          <Text size="sm" color="muted">
            {description}
          </Text>
        )}
      </div>
    </div>
  )
}
