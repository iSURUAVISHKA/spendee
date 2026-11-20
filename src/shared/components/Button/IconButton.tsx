import { Button as BaseButton } from '@base-ui/react/button'
import type { ReactNode } from 'react'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/shared/components/Tooltip/Tooltip'
import { cn } from '@/shared/utils/cn'
import { buttonVariants } from './buttonVariants'

interface IconButtonProps extends Omit<BaseButton.Props, 'className' | 'children'> {
  icon: ReactNode
  tooltip: string
  className?: string
}

export const IconButton = ({ icon, tooltip, className, ...props }: IconButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <BaseButton
            aria-label={tooltip}
            className={cn(buttonVariants({ variant: 'secondary', size: 'icon' }), className)}
            {...props}
          />
        }
      >
        {icon}
      </TooltipTrigger>
      <TooltipPopup>{tooltip}</TooltipPopup>
    </Tooltip>
  )
}
