import { useSearchParams } from 'react-router'
import { queueSearchParamsUpdate } from '@/shared/utils/searchParamsQueue'

interface UseSearchParamStateOptions<T> {
  defaultValue: T
  serialize: (value: NonNullable<T>) => string
  deserialize: (value: string) => T | null
  resetKeys?: string[]
  replace?: boolean
}

export const useSearchParamState = <T>(
  key: string,
  { defaultValue, serialize, deserialize, resetKeys = [], replace }: UseSearchParamStateOptions<T>,
) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const stored = searchParams.get(key)
  const value = (stored === null ? null : deserialize(stored)) ?? defaultValue

  const matchesDefault = (nextValue: NonNullable<T>) =>
    defaultValue !== null &&
    defaultValue !== undefined &&
    serialize(nextValue) === serialize(defaultValue)

  const setValue = (nextValue: T) => {
    queueSearchParamsUpdate(
      setSearchParams,
      (params) => {
        resetKeys.forEach((resetKey) => params.delete(resetKey))

        if (nextValue === null || nextValue === undefined || matchesDefault(nextValue)) {
          params.delete(key)
          return
        }

        params.set(key, serialize(nextValue))
      },
      replace,
    )
  }

  return [value, setValue] as const
}
