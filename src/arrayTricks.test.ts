import './arrayTricks'

test('Prefer flatMap to reduce-concat', () => {
  const arr = [1, 2, 3]
  const expected = [1, 1, 2, 4, 3, 9]
  expect(
    arr.reduce<number[]>((sum, val) => sum.concat([val, val * val]), [])
  ).toStrictEqual(expected)
  expect(arr.flatMap(val => [val, val * val], [])).toStrictEqual(expected)
})

test('Flatten', () =>
  expect(
    [1, 2, 3, [4, [5, [6, 7, [8, 9]]]]].flat(Number.POSITIVE_INFINITY)
  ).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]))

test('Construct an array with initial size', () => {
  expect(Array(3).length).toBe(3)
  expect(Array(3).fill(1)).toStrictEqual([1, 1, 1])
})

test('Move items', () => {
  expect([1, 2, 3].copyWithin(-1, 0)).toStrictEqual([1, 2, 1])
  expect(new Uint8Array([1, 2, 3]).copyWithin(-1, 0)).toStrictEqual(
    new Uint8Array([1, 2, 1])
  )
})

test('Copy subarray', () => {
  expect([1, 2, 3, 4, 5].slice(1, 4)).toStrictEqual([2, 3, 4])
})

test('Remove subarray', () => {
  const arr = [1, 2, 3, 4, 5]
  expect(arr.splice(1, 3)).toStrictEqual([2, 3, 4])
  expect(arr).toStrictEqual([1, 5])
})

test('Insert subarray', () => {
  const arr = [1, 2, 3, 4, 5]
  expect(arr.splice(1, 0, 6, 7, 8)).toStrictEqual([])
  expect(arr).toStrictEqual([1, 6, 7, 8, 2, 3, 4, 5])
})

test('Looping over key-val', () => {
  for (const [i, val] of [1, 2, 3].entries())
    expect([i, val]).toStrictEqual([i, i + 1])
  ;[1, 2, 3].forEach((val, i) => expect([i, val]).toStrictEqual([i, i + 1]))
})

test('Find and test', () => {
  expect([1, 2, 3].includes(2)).toStrictEqual(true)
  expect([1, 2, 3].find(val => val == 2) == 2).toStrictEqual(true)
  expect([1, 2, 3].includes(2)).toStrictEqual(true)
  expect([1, 2, 3].indexOf(2) == 1).toStrictEqual(true)
  expect([1, 2, 3].findIndex(val => val == 2) == 1).toStrictEqual(true)
  expect([1, 2, 3].some(val => val == 2)).toStrictEqual(true)
  expect([1, 2, 3].every(val => val != 0)).toStrictEqual(true)
})
