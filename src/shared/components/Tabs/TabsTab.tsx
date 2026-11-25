import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from '@/shared/utils/cn'
import { tabsTabVariants, type TabsTabVariantProps } from './tabsVariants'

interface TabsTabProps extends Omit<BaseTabs.Tab.Props, 'className'>, TabsTabVariantProps {
  className?: string
}

export const TabsTab = ({ className, variant, ...props }: TabsTabProps) => {
  return <BaseTabs.Tab className={cn(tabsTabVariants({ variant }), className)} {...props} />
}
