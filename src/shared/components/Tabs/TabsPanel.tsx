import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from '@/shared/utils/cn'

interface TabsPanelProps extends Omit<BaseTabs.Panel.Props, 'className'> {
  className?: string
}

export const TabsPanel = ({ className, ...props }: TabsPanelProps) => {
  return (
    <BaseTabs.Panel
      className={cn(
        'rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className,
      )}
      {...props}
    />
  )
}
