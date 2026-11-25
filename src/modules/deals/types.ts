export type DealStore = 'Coop' | 'Hemköp' | 'ICA Nära' | 'Lidl' | 'Willys'

export type DealSort = 'price.asc' | 'price.desc'

export interface Deal {
  id: number
  productName: string
  description: string
  memberPrice: boolean
  price: number
  currency: string
  unitPrice: number
  unit: string
  store: DealStore
  endsOn: string
  onShoppingList: boolean
}

export interface StoreFlyer {
  id: number
  store: DealStore
  dealCount: number
  uploadedBy: string
  uploadedAt: string
  fileUrl: string
}

export interface DealFilterValues {
  store: DealStore[]
}
