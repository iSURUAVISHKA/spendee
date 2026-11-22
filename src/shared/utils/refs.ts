import type { Ref } from 'react'

export const assignRef = <T>(ref: Ref<T> | undefined, value: T | null) => {
  if (typeof ref === 'function') ref(value)
  else if (ref) ref.current = value
}
