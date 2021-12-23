import {RandomSet} from './RandomSet'

// https://leetcode.com/problems/insert-delete-getrandom-o1/
test('Ex 1', () => {
  const set = new RandomSet()
  expect(set.insert(1)).toBe(true)
  expect(set.remove(2)).toBe(false)
  expect(set.insert(2)).toBe(true)
  expect(set.getRandom()).toBeGreaterThan(0)
  expect(set.remove(1)).toBe(true)
  expect(set.insert(2)).toBe(false)
  expect(set.getRandom()).toBe(2)
})

test('Iterator', () => {
  const set = new RandomSet()
  expect(set.insert(1)).toBe(true)
  expect(set.insert(2)).toBe(true)
  expect(set.insert(3)).toBe(true)

  const vals = []
  for (const val of set) vals.push(val)
  expect(vals).toStrictEqual([1, 2, 3])

  vals.length = 0
  for (const val of set) vals.push(val)
  expect(vals).toStrictEqual([1, 2, 3])

  expect(set.remove(3)).toBe(true)
  expect(set.insert(4)).toBe(true)
  expect(set.insert(5)).toBe(true)
  expect(set.insert(6)).toBe(true)

  vals.length = 0
  for (const val of set) vals.push(val)
  expect(vals).toStrictEqual([1, 2, 4, 5, 6])
})
