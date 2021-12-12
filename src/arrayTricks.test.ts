import './arrayTricks'

test('Prefer flatMap to reduce-concat', () => {
  const arr = [1, 2, 3]
  const expected = [1, 1, 2, 4, 3, 9]
  expect(
    arr.reduce<number[]>((sum, val) => sum.concat([val, val * val]), [])
  ).toStrictEqual(expected)
  expect(arr.flatMap(val => [val, val * val], [])).toStrictEqual(expected)
})

test('Construct an array with initial size', () => {
  expect(Array(3).length).toBe(3)
  expect(Array(3).fill(1)).toStrictEqual([1, 1, 1])
})
