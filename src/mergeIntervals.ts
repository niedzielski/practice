export type Interval = [open: number, close: number]

export function mergeIntervals(intervals: Interval[]): Interval[] {
  intervals.sort((left, right) => left[0] - right[0])

  let w = 0
  for (let r = w + 1; r < intervals.length; r++) {
    if (intervals[r]![0] > intervals[w]![1]) {
      w++
      intervals[w] = intervals[r]!
    } else intervals[w]![1] = Math.max(intervals[w]![1], intervals[r]![1])
  }
  intervals.length = w + 1
  return intervals
}
