import {bin_find, bin_find_recursive} from './bin-find'

it.each([
  ['empty', [], 1, undefined],
  ['one found', [1], 1, 0],
  ['one not found', [1], 2, undefined],
  ['two found', [1, 2], 2, 1],
  ['two not found', [1, 3], 2, undefined],
  ['three found', [1, 2, 3], 2, 1],
  ['three not found', [1, 2, 3], 0, undefined],
  ['four found', [1, 2, 3, 4], 1, 0],
  ['four not found', [1, 2, 3, 5], 4, undefined],
  ['five found', [1, 2, 3, 4, 5], 3, 2],
  ['five found 2', [1, 2, 3, 4, 5], 5, 4],
  ['five not found', [1, 2, 3, 4, 5], 6, undefined]
])('%s', (_, nums, num, expected) => {
  expect(bin_find(nums, num)).toBe(expected)
  expect(bin_find_recursive<number>(nums, num, (lhs, rhs) => lhs - rhs)).toBe(
    expected
  )
})
