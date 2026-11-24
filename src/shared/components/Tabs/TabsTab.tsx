import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from '@/shared/utils/cn'

interface TabsTabProps extends Omit<BaseTabs.Tab.Props, 'className'> {
  className?: string
}

export const TabsTab = ({ className, ...props }: TabsTabProps) => {
  return (
    <BaseTabs.Tab
      className={cn(
        'flex cursor-pointer flex-col items-start gap-1 rounded-md border border-muted bg-card p-4 text-left text-foreground transition-colors outline-none select-none hover:bg-muted/40 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-active:border-primary data-active:bg-muted/40 data-disabled:pointer-events-none data-disabled:opacity-50 lg:p-6',
        className,
      )}
      {...props}
    />
  )
}
