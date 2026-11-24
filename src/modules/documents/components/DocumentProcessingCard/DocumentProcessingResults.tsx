import { Text } from '@/shared/components/Text/Text'
import type { ProcessingCheck } from '../../types'
import { DocumentProcessingCheck } from './DocumentProcessingCheck'

interface DocumentProcessingResultsProps {
  fileName: string
  checks: ProcessingCheck[]
}

const getSummary = (checks: ProcessingCheck[]) => {
  const warnings = checks.filter((check) => check.status === 'warning').length
  const done = checks.length - warnings

  if (warnings === 0) return `${done} done · Everything looks good`
  if (warnings === 1) return `${done} done · 1 thing to check`

  return `${done} done · ${warnings} things to check`
}

export const DocumentProcessingResults = ({ fileName, checks }: DocumentProcessingResultsProps) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div role="status" className="flex min-w-0 flex-col gap-0.5">
        <Text weight="medium" color="strong" className="truncate" title={fileName}>
          {fileName}
        </Text>
        <Text size="sm" color="muted">
          {getSummary(checks)}
        </Text>
      </div>
      <ul
        aria-label="Checks"
        tabIndex={0}
        className="flex min-h-0 flex-col gap-3 overflow-y-auto rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        {checks.map((check) => (
          <DocumentProcessingCheck key={check.id} check={check} />
        ))}
      </ul>
    </div>
  )
}
