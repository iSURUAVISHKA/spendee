import type { YearMonth } from '@/shared/components/MonthPicker/types'
import {
  getCurrentYearMonth,
  parseMonthKey,
  toMonthKey,
} from '@/shared/components/MonthPicker/utils'
import { monthParam, pageParam } from '@/shared/constants/searchParams'
import { useSearchParamState } from './useSearchParamState'

export const useMonthParam = () =>
  useSearchParamState<YearMonth>(monthParam, {
    defaultValue: getCurrentYearMonth(),
    serialize: toMonthKey,
    deserialize: parseMonthKey,
    resetKeys: [pageParam],
  })
