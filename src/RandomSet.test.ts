import {RandomSet} from './RandomSet'

// https://leetcode.com/problems/insert-delete-getrandom-o1/
test('Ex 1', () => {
  const set = new RandomSet<number>()
  expect(set.insert(1)).toBe(true)
  expect(set.size).toBe(1)
  expect(set.remove(2)).toBe(false)
  expect(set.size).toBe(1)
  expect(set.insert(2)).toBe(true)
  expect(set.size).toBe(2)
  expect(set.getRandom()).toBeGreaterThan(0)
  expect(set.remove(1)).toBe(true)
  expect(set.size).toBe(1)
  expect(set.insert(2)).toBe(false)
  expect(set.size).toBe(1)
  expect(set.getRandom()).toBe(2)
})

test('Iterator', () => {
  const set = new RandomSet<number>()
  expect(set.insert(1)).toBe(true)
  expect(set.insert(2)).toBe(true)
  expect(set.insert(3)).toBe(true)
  expect(set.size).toBe(3)

  const vals = []
  for (const val of set) vals.push(val)
  expect(vals).toStrictEqual([1, 2, 3])

  vals.length = 0
  for (const val of set) vals.push(val)
  expect(vals).toStrictEqual([1, 2, 3])

  expect(set.remove(3)).toBe(true)
  expect(set.size).toBe(2)
  expect(set.insert(4)).toBe(true)
  expect(set.insert(5)).toBe(true)
  expect(set.insert(6)).toBe(true)
  expect(set.size).toBe(5)

  vals.length = 0
  for (const val of set) vals.push(val)
  expect(vals).toStrictEqual([1, 2, 4, 5, 6])

  expect(set.map(val => -val)).toStrictEqual([-1, -2, -4, -5, -6])
})

test('Entries', () => {
  const set = new RandomSet<string>()
  expect(set.insert('a')).toBe(true)
  expect(set.insert('b')).toBe(true)
  expect(set.insert('c')).toBe(true)
  expect(set.insert('d')).toBe(true)
  expect(set.insert('e')).toBe(true)
  expect(set.insert('f')).toBe(true)
  expect(set.size).toBe(6)

  const entries = []
  for (const entry of set.entries()) entries.push(entry)
  expect(entries).toStrictEqual([
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
    [4, 'e'],
    [5, 'f']
  ])

  expect(set.remove('a')).toBe(true)
  expect(set.size).toBe(5)
  expect(set.remove('d')).toBe(true)
  expect(set.size).toBe(4)
  expect(set.insert('g')).toBe(true)
  expect(set.insert('h')).toBe(true)
  expect(set.insert('h')).toBe(false)
  expect(set.insert('c')).toBe(false)
  expect(set.insert('a')).toBe(true)
  expect(set.remove('b')).toBe(true)
  expect(set.size).toBe(6)

  entries.length = 0
  for (const entry of set.entries()) entries.push(entry)
  expect(entries).toStrictEqual([
    [0, 'f'],
    [1, 'a'],
    [2, 'c'],
    [3, 'e'],
    [4, 'g'],
    [5, 'h']
  ])
})

test('Map', () => {
  const set = new RandomSet<number>()
  expect(set.insert(1)).toBe(true)
  expect(set.insert(2)).toBe(true)
  expect(set.insert(3)).toBe(true)
  expect(set.size).toBe(3)
  expect(set.map(val => -val)).toStrictEqual([-1, -2, -3])
})
