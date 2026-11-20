import { useState } from 'react'
import { sampleTransactions, transactionsPageSize } from '../constants'

const fakeDelayMs = 600

export const useSampleTransactions = () => {
  const [loadedCount, setLoadedCount] = useState(transactionsPageSize)
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)

  const hasNextPage = loadedCount < sampleTransactions.length

  const fetchNextPage = () => {
    if (isFetchingNextPage || !hasNextPage) return

    setIsFetchingNextPage(true)
    setTimeout(() => {
      setLoadedCount((count) => count + transactionsPageSize)
      setIsFetchingNextPage(false)
    }, fakeDelayMs)
  }

  const refetch = () => {
    setLoadedCount(transactionsPageSize)
  }

  return {
    data: sampleTransactions.slice(0, loadedCount),
    hasNextPage,
    isLoading: false,
    isFetchingNextPage,
    isError: false,
    fetchNextPage,
    refetch,
  }
}
