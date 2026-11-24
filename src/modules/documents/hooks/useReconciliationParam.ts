import { useSearchParamState } from '@/shared/hooks/useSearchParamState'
import { reconciliationParam, reconciliationStatuses } from '../constants'
import type { ReconciliationStatus } from '../types'

export const useReconciliationParam = () =>
  useSearchParamState<ReconciliationStatus>(reconciliationParam, {
    defaultValue: 'noReceipt',
    serialize: (value) => value,
    deserialize: (value) => reconciliationStatuses.find((status) => status === value) ?? null,
    replace: true,
  })
