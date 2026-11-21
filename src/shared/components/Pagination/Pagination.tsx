import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@/shared/components/Button/Button'
import { IconButton } from '@/shared/components/Button/IconButton'
import { Text } from '@/shared/components/Text/Text'
import { usePageParam } from '@/shared/hooks/usePageParam'
import { cn } from '@/shared/utils/cn'
import { getPageItems } from './getPageItems'
import type { PaginationData } from './types'

interface PaginationProps extends PaginationData {
  className?: string
}

export const Pagination = ({ page, pageSize, totalCount, className }: PaginationProps) => {
  const [, setPage] = usePageParam()
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const firstItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const lastItem = Math.min(page * pageSize, totalCount)

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex flex-col items-center gap-3 sm:flex-row sm:justify-between', className)}
    >
      <Text size="sm" color="muted" className="tabular-nums">
        Showing {firstItem}–{lastItem} of {totalCount}
      </Text>

      <div className="flex items-center gap-1">
        <IconButton
          icon={<HugeiconsIcon icon={ArrowLeft01Icon} />}
          tooltip="Previous page"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        />

        <ol className="hidden items-center gap-1 sm:flex">
          {getPageItems(page, totalPages).map((item) =>
            typeof item === 'number' ? (
              <li key={item}>
                <Button
                  variant={item === page ? 'primary' : 'secondary'}
                  size="icon"
                  disabled={false}
                  aria-label={`Page ${item}`}
                  aria-current={item === page ? 'page' : undefined}
                  className="tabular-nums"
                  onClick={() => setPage(item)}
                >
                  {item}
                </Button>
              </li>
            ) : (
              <li
                key={item}
                aria-hidden
                className="flex size-9 items-center justify-center text-sm text-muted-foreground"
              >
                …
              </li>
            ),
          )}
        </ol>

        <Text render={<span />} size="sm" color="muted" className="px-2 tabular-nums sm:hidden">
          Page {page} of {totalPages}
        </Text>

        <IconButton
          icon={<HugeiconsIcon icon={ArrowRight01Icon} />}
          tooltip="Next page"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        />
      </div>
    </nav>
  )
}
