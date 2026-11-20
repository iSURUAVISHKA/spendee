import { useEffect, useEffectEvent, useRef } from 'react'

interface UseInfiniteScrollOptions {
  enabled: boolean
  onLoadMore: () => void
  rootMargin?: string
}

export const useInfiniteScroll = <T extends Element>({
  enabled,
  onLoadMore,
  rootMargin = '0px 0px 300px 0px',
}: UseInfiniteScrollOptions) => {
  const sentinelRef = useRef<T>(null)
  const loadMore = useEffectEvent(onLoadMore)

  useEffect(() => {
    const sentinel = sentinelRef.current

    if (!enabled || !sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore()
      },
      { rootMargin },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [enabled, rootMargin])

  return sentinelRef
}
