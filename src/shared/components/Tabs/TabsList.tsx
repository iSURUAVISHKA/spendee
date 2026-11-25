import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from '@/shared/utils/cn'
import { tabsListVariants, type TabsListVariantProps } from './tabsVariants'

interface TabsListProps extends Omit<BaseTabs.List.Props, 'className'>, TabsListVariantProps {
  className?: string
}

export const TabsList = ({ className, variant, ...props }: TabsListProps) => {
  return <BaseTabs.List className={cn(tabsListVariants({ variant }), className)} {...props} />
}
