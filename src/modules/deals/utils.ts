export const formatDealCount = (count: number) => (count === 1 ? '1 deal' : `${count} deals`)

export const getStoreInitial = (store: string) => store.charAt(0).toUpperCase()
