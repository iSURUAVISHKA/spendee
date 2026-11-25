import {
  DealsFilters,
  DealsSection,
  DealsWeek,
  FlyerUploadCard,
  StoreFlyers,
  dealFilterOptions,
  dealsPageSize,
  useDealSortParam,
  useSampleDeals,
  useSampleFlyers,
} from '@/modules/deals'
import { useSampleUpload } from '@/modules/documents'
import { Button } from '@/shared/components/Button/Button'
import { useFilterParams } from '@/shared/hooks/useFilterParams'
import { usePageParam } from '@/shared/hooks/usePageParam'
import { useSearchParam } from '@/shared/hooks/useSearchParam'
import { getCurrentWeek } from '@/shared/utils/dates'
import { Header } from '@/shared/widgets/Header/Header'
import { SearchParamInput } from '@/shared/widgets/SearchParamInput/SearchParamInput'
import { TopBar } from '@/shared/widgets/TopBar/TopBar'

export const DealsPage = () => {
  const { upload, selectFile, retryUpload, cancelUpload } = useSampleUpload()
  const flyers = useSampleFlyers()
  const [search] = useSearchParam()
  const { filters, hasFilters, changeFilter, clearFilters } = useFilterParams(dealFilterOptions)
  const [sort, setSort] = useDealSortParam()
  const [page] = usePageParam(1)
  const deals = useSampleDeals({ search, filters, sort, page, pageSize: dealsPageSize })
  const week = getCurrentWeek()

  return (
    <>
      <Header title="Deals" actions={<DealsWeek week={week} />} />
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <FlyerUploadCard
          upload={upload}
          onFileSelected={selectFile}
          onCancel={cancelUpload}
          onRetry={upload?.canRetry ? retryUpload : undefined}
        />
        <StoreFlyers
          flyers={flyers.data}
          isLoading={flyers.isLoading}
          isError={flyers.isError}
          onRetry={flyers.refetch}
        />
      </div>
      <DealsSection
        className="mt-4"
        toolbar={
          <TopBar
            filters={
              <>
                <SearchParamInput
                  aria-label="Search deals"
                  placeholder="Search deals"
                  className="w-full sm:w-64"
                />
                <DealsFilters
                  filters={filters}
                  onFilterChange={changeFilter}
                  sort={sort}
                  onSortChange={setSort}
                />
              </>
            }
            actions={
              hasFilters && (
                <Button variant="link" disabled={false} onClick={clearFilters}>
                  Clear filters
                </Button>
              )
            }
          />
        }
        deals={deals.data}
        pagination={deals.pagination}
        isLoading={deals.isLoading}
        isError={deals.isError}
        isFiltered={hasFilters || search !== ''}
        onRetry={deals.refetch}
        onAdd={(deal) => deals.addToShoppingList(deal.id)}
      />
    </>
  )
}
