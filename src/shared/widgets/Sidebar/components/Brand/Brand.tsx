import BrandLogo from '@/shared/assets/icon/spendee_wallet_icon.svg?react'
import { cn } from '@/shared/utils/cn'

type BrandProps = {
  className?: string
}

export const Brand = ({ className }: BrandProps) => {
  return (
    <div
      className={cn('flex items-center gap-2 border-b border-sidebar-border px-2 pb-4', className)}
    >
      <BrandLogo aria-hidden className="size-8 shrink-0" />
      <span className="text-lg font-semibold">Spendee</span>
    </div>
  )
}
