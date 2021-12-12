import * as Queue from './ringq'

test('pushAll', () => {
  const queue = Queue.make(3)
  Queue.push(queue, 1, 2, 3)
  expect(Queue.pop(queue)).toBe(1)
  expect(Queue.pop(queue)).toBe(2)
  expect(Queue.pop(queue)).toBe(3)
})

test('push / pop', () => {
  const queue = Queue.make(2)
  Queue.push(queue, 1)
  Queue.push(queue, 2)
  expect(Queue.pop(queue)).toBe(1)
  expect(Queue.pop(queue)).toBe(2)
  Queue.push(queue, 3)
  Queue.push(queue, 4)
  expect(Queue.pop(queue)).toBe(3)
  expect(Queue.pop(queue)).toBe(4)
  Queue.push(queue, 5)
  expect(Queue.pop(queue)).toBe(5)
  Queue.push(queue, 6)
  Queue.push(queue, 7)
  expect(Queue.pop(queue)).toBe(6)
  expect(Queue.pop(queue)).toBe(7)
})

test('push: overflow', () => {
  const queue = Queue.make(1)
  Queue.push(queue, 1)
  expect(() => Queue.push(queue, 2)).toThrowError()
})

test('pop: underflow', () => {
  const queue = Queue.make(1)
  expect(() => Queue.pop(queue)).toThrowError()
})

describe('clear', () =>
  test.each([
    ['empty', []],
    ['nonempty', [0]],
    ['full', [0, 1, 2]]
  ])('Case %# %s: %p', (_, items) => {
    const queue = Queue.make<number>(3)
    Queue.push(queue, ...items)
    Queue.clear(queue)
    expect(Queue.getSize(queue)).toBe(0)
  }))

describe('getSize', () =>
  test.each([
    ['empty', [], 0],
    ['nonempty', [0], 1],
    ['full', [0, 1, 2], 3]
  ])('Case %# %s: %p', (_, items, size) => {
    const queue = Queue.make<number>(3)
    Queue.push(queue, ...items)
    expect(Queue.getSize(queue)).toBe(size)
  }))

describe('getCapacity', () =>
  test.each([
    ['zero', 0],
    ['singular', 1],
    ['multi', 2]
  ])('Case %# %s: %p', (_, capacity) => {
    const queue = Queue.make<number>(capacity)
    expect(Queue.getCapacity(queue)).toBe(capacity)
  }))

describe('isFull', () =>
  test.each([
    ['empty', [], false],
    ['nonempty', [1], false],
    ['full', [0, 1, 2], true]
  ])('Case %# %s: %p', (_, items, expected) => {
    const queue = Queue.make<number>(3)
    Queue.push(queue, ...items)
    expect(Queue.isFull(queue)).toBe(expected)
  }))

describe('isEmpty', () =>
  test.each([
    ['empty', [], true],
    ['nonempty', [1], false],
    ['full', [0, 1, 2], false]
  ])('Case %# %s: %p', (_, items, expected) => {
    const queue = Queue.make<number>(3)
    Queue.push(queue, ...items)
    expect(Queue.isEmpty(queue)).toBe(expected)
  }))
