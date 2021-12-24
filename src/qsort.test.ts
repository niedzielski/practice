import {qsort} from './qsort'

it('empty', () => {
  const sorted: number[] = []
  expect(qsort([...sorted], (left, right) => left - right)).toStrictEqual(
    sorted.sort()
  )
})

it('singular', () => {
  const sorted: number[] = [1]
  expect(qsort([...sorted], (left, right) => left - right)).toStrictEqual(
    sorted.sort()
  )
})

it('two', () => {
  const sorted: number[] = [1, 2]
  expect(qsort([...sorted], (left, right) => left - right)).toStrictEqual(
    sorted.sort()
  )
})

it('sorted numbers', () => {
  const sorted = [0, 1, 2, 3, 4, 5]
  expect(qsort([...sorted], (left, right) => left - right)).toStrictEqual(
    sorted.sort()
  )
})

it('unsorted numbers', () => {
  const sorted = [3, 4, 2, 0, 1, 5]
  expect(qsort([...sorted], (left, right) => left - right)).toStrictEqual(
    sorted.sort()
  )
})

it('reversed numbers', () => {
  const sorted = [6, 5, 4, 3, 2, 1, 0]
  expect(qsort([...sorted], (left, right) => left - right)).toStrictEqual(
    sorted.sort()
  )
})
