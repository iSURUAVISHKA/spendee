import { Calendar03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Input as BaseInput } from '@base-ui/react/input'
import { inputClassName } from '@/shared/components/Input/constants'
import { cn } from '@/shared/utils/cn'
import { assignRef } from '@/shared/utils/refs'
import type { DatePickerInputProps } from './types'

export const DatePickerInput = ({ ref, inputRef, className, ...props }: DatePickerInputProps) => {
  const setRefs = (node: HTMLInputElement | null) => {
    assignRef(ref, node)
    assignRef(inputRef, node)
  }

  return (
    <div className="relative">
      <BaseInput ref={setRefs} className={cn(inputClassName, 'pr-9', className)} {...props} />
      <HugeiconsIcon
        icon={Calendar03Icon}
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )
}
