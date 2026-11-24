import { sampleDocuments } from '../constants'

export const useSampleDocument = (documentId: string) => ({
  data: sampleDocuments.find((doc) => doc.id === documentId),
  isLoading: false,
  isError: false,
  refetch: () => {},
})
