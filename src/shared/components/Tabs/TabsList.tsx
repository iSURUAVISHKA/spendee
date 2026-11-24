import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from '@/shared/utils/cn'

interface TabsListProps extends Omit<BaseTabs.List.Props, 'className'> {
  className?: string
}

export const TabsList = ({ className, ...props }: TabsListProps) => {
  return <BaseTabs.List className={cn('flex gap-4', className)} {...props} />
}
