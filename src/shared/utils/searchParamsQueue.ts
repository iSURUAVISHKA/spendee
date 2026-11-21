import type { useSearchParams } from 'react-router'

type SetSearchParams = ReturnType<typeof useSearchParams>[1]

type ParamsUpdate = (params: URLSearchParams) => void

let pendingUpdates: ParamsUpdate[] = []
let replaceEntry = true

export const queueSearchParamsUpdate = (
  setSearchParams: SetSearchParams,
  update: ParamsUpdate,
  replace = false,
) => {
  pendingUpdates.push(update)
  replaceEntry = replaceEntry && replace

  if (pendingUpdates.length > 1) return

  queueMicrotask(() => {
    const updates = pendingUpdates
    const shouldReplace = replaceEntry

    pendingUpdates = []
    replaceEntry = true

    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current)
        updates.forEach((apply) => apply(next))
        return next
      },
      { replace: shouldReplace },
    )
  })
}
