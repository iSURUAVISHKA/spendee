export const toValueArray = <Value extends string>(value: Value[] | Value | null) => {
  if (value === null) return []

  return Array.isArray(value) ? value : [value]
}
