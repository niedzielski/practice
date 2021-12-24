import {mergeIntervals} from './mergeIntervals'

// https://leetcode.com/problems/merge-intervals
it('merge', () => {
  expect(
    mergeIntervals([
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18]
    ])
  ).toStrictEqual([
    [1, 6],
    [8, 10],
    [15, 18]
  ])
  expect(
    mergeIntervals([
      [1, 4],
      [4, 5]
    ])
  ).toStrictEqual([[1, 5]])
})
