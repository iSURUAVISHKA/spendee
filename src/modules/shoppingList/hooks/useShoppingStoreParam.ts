import { dealStores, type DealStore } from '@/modules/deals'
import { useSearchParamState } from '@/shared/hooks/useSearchParamState'
import { shoppingStoreParam } from '../constants'

const isDealStore = (value: string): value is DealStore =>
  dealStores.some((store) => store === value)

export const useShoppingStoreParam = () =>
  useSearchParamState<DealStore | null>(shoppingStoreParam, {
    defaultValue: null,
    serialize: (store) => store,
    deserialize: (value) => (isDealStore(value) ? value : null),
  })
