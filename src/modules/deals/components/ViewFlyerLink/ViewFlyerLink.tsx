import OpenIcon from '@/shared/assets/icon/Open.svg?react'
import { buttonVariants } from '@/shared/components/Button/buttonVariants'
import { cn } from '@/shared/utils/cn'

interface ViewFlyerLinkProps {
  href: string
  store: string
  className?: string
}

export const ViewFlyerLink = ({ href, store, className }: ViewFlyerLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(buttonVariants({ variant: 'secondary' }), className)}
    >
      <OpenIcon aria-hidden />
      View
      <span className="sr-only"> {store} flyer (opens in a new tab)</span>
    </a>
  )
}
