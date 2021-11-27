// Use toEqual() instead of toStrictEqual() to strip omitted and undefined
// fields. to-do: limit to JSON.
export function deepCloneJSON<T>(val: T): T {
  if (val == null) return val
  return JSON.parse(JSON.stringify(val))
}
