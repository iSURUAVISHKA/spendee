import OpenIcon from '@/shared/assets/icon/Open.svg?react'
import { buttonVariants } from '@/shared/components/Button/buttonVariants'
import { cn } from '@/shared/utils/cn'

interface DocumentFileLinkProps {
  href: string
  className?: string
}

export const DocumentFileLink = ({ href, className }: DocumentFileLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(buttonVariants({ variant: 'secondary' }), className)}
    >
      <OpenIcon aria-hidden />
      Open PDF
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
