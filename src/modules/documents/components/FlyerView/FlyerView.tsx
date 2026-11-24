import { cn } from '@/shared/utils/cn'
import type { FlyerDocument } from '../../types'
import { FlyerDeals } from './FlyerDeals'
import { FlyerDetails } from './FlyerDetails'

interface FlyerViewProps {
  flyer: FlyerDocument
  className?: string
}

export const FlyerView = ({ flyer, className }: FlyerViewProps) => {
  return (
    <div className={cn('grid gap-4 lg:grid-cols-3 lg:items-start', className)}>
      <FlyerDetails flyer={flyer} />
      <FlyerDeals flyer={flyer} className="lg:col-span-2" />
    </div>
  )
}
