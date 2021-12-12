import * as Queue from './DList'

type Link = {data: string; prev?: Link; next?: Link}

it('push, pop, push, push, pop, pop, pop', () => {
  const queue = Queue.make<Link>()
  Queue.push(queue, {data: 'a'})
  expect(Queue.pop(queue)).toEqual({data: 'a'})
  Queue.push(queue, {data: 'b'}, {data: 'c'})
  expect(Queue.pop(queue)).toEqual({data: 'b'})
  expect(Queue.pop(queue)).toEqual({data: 'c'})
  expect(() => Queue.pop(queue)).toThrow()
})

it('push, push, push, pop, pop, pop', () => {
  const queue = Queue.make<Link>()
  const items: Link[] = [{data: 'a'}, {data: 'b'}, {data: 'c'}]
  Queue.push(queue, ...items)
  expect(Queue.pop(queue)).toEqual({data: 'a'})
  expect(Queue.pop(queue)).toEqual({data: 'b'})
  expect(Queue.pop(queue)).toEqual({data: 'c'})
})

describe('isEmpty', () =>
  test.each([
    ['empty', [], true],
    ['singular', [{}], false],
    ['multi', [{}, {}], false]
  ])('Case %# %s: %p', (_, items, empty) => {
    const queue = Queue.make<Link>()
    Queue.push(queue, ...items)
    expect(Queue.isEmpty(queue)).toBe(empty)
  }))
