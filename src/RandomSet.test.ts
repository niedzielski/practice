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
