import { useEffect, useLayoutEffect, useRef } from 'react'

export const useDebouncedCallback = <Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
) => {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return (...args: Args) => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => callbackRef.current(...args), delay)
  }
}
