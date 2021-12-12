export function binFind(
  nums: readonly number[],
  num: number
): number | undefined {
  let min = 0 // inclusive
  let max = nums.length // exclusive
  while (min < max) {
    const mid = min + Math.trunc((max - min) / 2)
    if (nums[mid] == num) return mid
    if (nums[mid]! < num) min = mid + 1
    else max = mid
  }
}

/**
 * @arg min Inclusive minimum.
 * @arg max Exclusive maximum.
 * @return Index if present.
 */
export function binFindRecursive<T>(
  items: readonly Readonly<T>[],
  item: Readonly<T>,
  compare: (lhs: Readonly<T>, rhs: Readonly<T>) => number,
  min: number = 0,
  max: number = items.length
): number | undefined {
  if (min >= max) return

  const mid = Math.trunc((max + min) / 2)
  const comparison = compare(item, items[mid]!)
  if (comparison == 0) return mid

  // If item is less than middle, item can only be in the left. Search the left.
  // middle has been checked and so is correct for exclusive max.
  if (comparison < 0) return binFindRecursive(items, item, compare, min, mid)

  // If item is greater than middle, item can only be in the right. Search the
  // right. min is inclusive so add one to skip middle which has been checked.
  return binFindRecursive(items, item, compare, mid + 1, max)
}
