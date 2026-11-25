import { sampleFlyers } from '../constants'

export const useSampleFlyers = () => {
  return {
    data: sampleFlyers,
    isLoading: false,
    isError: false,
    refetch: () => {},
  }
}
