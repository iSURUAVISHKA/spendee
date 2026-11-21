import type { ComponentProps } from 'react'
import { cn } from '@/shared/utils/cn'

interface TableProps extends ComponentProps<'table'> {}

export const Table = ({ className, ...props }: TableProps) => {
  return <table className={cn('w-full border-collapse text-sm', className)} {...props} />
}
