import {deepCloneJSON} from './clone'
import * as SList from './SList'

describe('find', () =>
  test.each([
    ['empty', undefined, (): boolean => false, undefined, 0],
    ['single', {val: 1, next: undefined}, (): boolean => false, undefined, 1],
    [
      'multi',
      {val: 1, next: {val: 2, next: {val: 3, next: undefined}}},
      (): boolean => false,
      undefined,
      3
    ],
    [
      'first',
      {val: 1, next: {val: 2, next: undefined}},
      () => true,
      {val: 1, next: {val: 2, next: undefined}},
      1
    ],
    [
      'last',
      {val: 1, next: {val: 2, next: undefined}},
      (() => {
        let flip = true
        return () => {
          flip = !flip
          return flip
        }
      })(),
      {val: 2, next: undefined},
      2
    ]
  ])('Case %# %s: %p', (_, list, it, found, iterations) => {
    const spy = jest.fn(it)
    expect(SList.find(list, spy)).toStrictEqual(found)
    expect(spy).toHaveBeenCalledTimes(iterations)
  }))

describe('removeFront', () =>
  test.each([
    ['empty', undefined, undefined],
    ['singular', {val: 'a', next: undefined}, undefined],
    [
      'multi',
      {val: 'a', next: {val: 'b', next: {val: 'c', next: undefined}}},
      {val: 'b', next: {val: 'c', next: undefined}}
    ]
  ])('Case %# %s: %p', (_, list, result) =>
    expect(SList.removeFront(list)).toStrictEqual(result)
  ))

describe('prepend', () =>
  test.each([
    ['empty', undefined, 'a', {val: 'a', next: undefined}],
    [
      'nonempty',
      {val: 'a', next: undefined},
      'b',
      {val: 'b', next: {val: 'a', next: undefined}}
    ]
  ])('Case %# %s: %p', (_, list, val, expected) =>
    expect(SList.prepend(list, val)).toStrictEqual(expected)
  ))

describe('append', () =>
  test.each([
    ['empty', undefined, 'a', {val: 'a', next: undefined}],
    [
      'singular',
      {val: 'a', next: undefined},
      'b',
      {val: 'a', next: {val: 'b', next: undefined}}
    ],
    [
      'multi',
      {val: 'a', next: {val: 'b', next: undefined}},
      'c',
      {val: 'a', next: {val: 'b', next: {val: 'c', next: undefined}}}
    ]
  ])('Case %# %s: %p', (_, list, node, expected) => {
    expect(SList.append(deepCloneJSON(list), node)).toEqual(expected)
    expect(SList.appendRecursive(deepCloneJSON(list), node)).toEqual(expected)
  }))

describe('size', () =>
  test.each([
    ['empty', undefined, 0],
    [
      'nonempty',
      {val: 'a', next: {val: 'b', next: {val: 'c', next: undefined}}},
      3
    ]
  ])('Case %# %s: %p', (_, list, expected) => {
    expect(SList.size(list)).toStrictEqual(expected)
    expect(SList.sizeRecursive(list)).toStrictEqual(expected)
  }))

describe('reverse', () =>
  test.each([
    ['empty', undefined, undefined],
    ['singular', {val: 'a', next: undefined}, {val: 'a', next: undefined}],
    [
      'multi',
      {val: 'a', next: {val: 'b', next: {val: 'c', next: undefined}}},
      {val: 'c', next: {val: 'b', next: {val: 'a', next: undefined}}}
    ]
  ])('Case %# %s: %p', (_, list, expected) => {
    expect(SList.reverse(deepCloneJSON(list))).toEqual(expected)
    expect(SList.reverseRecursive(deepCloneJSON(list))).toEqual(expected)
  }))

describe('isCycle', () =>
  test.each([
    ['empty', undefined, false],
    ['singular acyclic', {val: 'a', next: undefined}, false],
    [
      'singular cyclic',
      (() => {
        const node: SList.Link<string> = {val: 'a', next: undefined}
        node.next = node
        return node
      })(),
      true
    ],
    ['two acyclic', {val: 'a', next: {val: 'b', next: undefined}}, false],
    [
      'two cyclic',
      (() => {
        const node: SList.Link<string> = {
          val: 'a',
          next: {val: 'b', next: undefined}
        }
        node.next!.next = node
        return node
      })(),
      true
    ],
    [
      'three acyclic',
      {val: 'a', next: {val: 'b', next: {val: 'c', next: undefined}}},
      false
    ],
    [
      'three cyclic',
      (() => {
        const node: SList.Link<string> = {
          val: 'a',
          next: {val: 'b', next: {val: 'c', next: undefined}}
        }
        node.next!.next!.next = node
        return node
      })(),
      true
    ],
    [
      'eight acyclic',
      {
        val: 'a',
        next: {
          val: 'b',
          next: {
            val: 'c',
            next: {
              val: 'd',
              next: {
                val: 'e',
                next: {
                  val: 'f',
                  next: {val: 'g', next: {val: 'h', next: undefined}}
                }
              }
            }
          }
        }
      },
      false
    ],
    [
      'eight cyclic',
      (() => {
        const node: SList.Link<string> = {
          val: 'a',
          next: {
            val: 'b',
            next: {
              val: 'c',
              next: {
                val: 'd',
                next: {
                  val: 'e',
                  next: {
                    val: 'f',
                    next: {val: 'g', next: {val: 'h', next: undefined}}
                  }
                }
              }
            }
          }
        }
        let next = node
        while (next.next != null) next = next.next
        next.next = node
        return node
      })(),
      true
    ]
  ])('Case %# %s: %p', (_, list, expected) =>
    expect(SList.isCyclic(list)).toStrictEqual(expected)
  ))

describe('reorder', () =>
  test.each([
    ['empty', undefined, undefined],
    [
      'ex 1',
      {val: 1, next: {val: 2, next: {val: 3, next: {val: 4}}}},
      {val: 1, next: {val: 4, next: {val: 2, next: {val: 3}}}}
    ],
    [
      'ex 2',
      {val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: {val: 5}}}}},
      {val: 1, next: {val: 5, next: {val: 2, next: {val: 4, next: {val: 3}}}}}
    ]
  ])('Case %# %s: %p', (_, list, expected) => {
    SList.reorder(list)
    expect(list).toEqual(expected)
  }))
