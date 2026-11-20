import type { ComponentType, SVGProps } from 'react'

export type CategoryColor = 'purple' | 'green' | 'blue' | 'orange' | 'cyan' | 'yellow' | 'gray'

export interface Category {
  name: string
  color: CategoryColor
  icon: ComponentType<SVGProps<SVGSVGElement>>
}
