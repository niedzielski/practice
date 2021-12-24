export function qsort<T>(
  items: T[],
  compare: (lhs: Readonly<T>, rhs: Readonly<T>) => number,
  lo: number = 0, // inclusive
  hi: number = items.length - 1 // inclusive
): T[] {
  if (lo >= hi) return items
  const p = partition(items, compare, lo, hi)
  qsort(items, compare, lo, p - 1)
  qsort(items, compare, p + 1, hi)
  return items
}

export function partition<T>(
  items: T[],
  compare: (lhs: Readonly<T>, rhs: Readonly<T>) => number,
  lo: number,
  hi: number
): number {
  let i = lo
  for (let j = lo; j <= hi; j++) {
    if (compare(items[j]!, items[hi]!) < 0) {
      swap(items, i, j)
      i++
    }
  }
  swap(items, i, hi)
  return i
}

function swap<T>(items: T[], lhs: number, rhs: number): void {
  ;[items[rhs], items[lhs]] = [items[lhs]!, items[rhs]!]
}
