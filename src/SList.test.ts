import {deepCloneJSON} from './clone'
import * as SList from './SList'

describe('find', () =>
  test.each(<
    [
      msg: string,
      list: SList.Node | undefined,
      it: SList.It,
      found: SList.Node | undefined,
      iterations: number
    ][]
  >[
    ['empty', undefined, () => {}, undefined, 0],
    ['single', {next: undefined}, () => {}, undefined, 1],
    ['multi', {next: {next: {next: undefined}}}, () => {}, undefined, 3],
    [
      'first',
      {next: {next: undefined}},
      () => true,
      {next: {next: undefined}},
      1
    ],
    [
      'last',
      {next: {next: undefined}},
      (() => {
        let flip = true
        return () => {
          flip = !flip
          return flip
        }
      })(),
      {next: undefined},
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
    ['singular', {next: undefined}, undefined],
    [
      'multi',
      {data: 'a', next: {data: 'b', next: {data: 'c', next: undefined}}},
      {data: 'b', next: {data: 'c', next: undefined}}
    ]
  ])('Case %# %s: %p', (_, list, result) =>
    expect(SList.removeFront(list)).toStrictEqual(result)
  ))

describe('prepend', () =>
  test.each([
    ['empty', undefined, {next: undefined}, {next: undefined}],
    [
      'nonempty',
      {next: undefined},
      {next: undefined},
      {next: {next: undefined}}
    ]
  ])('Case %# %s: %p', (_, list, node, expected) =>
    expect(SList.prepend(list, node)).toStrictEqual(expected)
  ))

describe('append', () =>
  test.each([
    [
      'empty',
      undefined,
      {data: 'a', next: undefined},
      {data: 'a', next: undefined}
    ],
    [
      'singular',
      {data: 'a', next: undefined},
      {data: 'b', next: undefined},
      {data: 'a', next: {data: 'b', next: undefined}}
    ],
    [
      'multi',
      {data: 'a', next: {data: 'b', next: undefined}},
      {data: 'c', next: undefined},
      {data: 'a', next: {data: 'b', next: {data: 'c', next: undefined}}}
    ]
  ])('Case %# %s: %p', (_, list, node, expected) => {
    expect(SList.append(deepCloneJSON(list), node)).toEqual(expected)
    expect(SList.appendRecursive(deepCloneJSON(list), node)).toEqual(expected)
  }))

describe('size', () =>
  test.each([
    ['empty', undefined, 0],
    ['nonempty', {next: {next: {next: undefined}}}, 3]
  ])('Case %# %s: %p', (_, list, expected) => {
    expect(SList.size(list)).toStrictEqual(expected)
    expect(SList.sizeRecursive(list)).toStrictEqual(expected)
  }))

describe('reverse', () =>
  test.each([
    ['empty', undefined, undefined],
    ['singular', {data: 'a', next: undefined}, {data: 'a', next: undefined}],
    [
      'multi',
      {data: 'a', next: {data: 'b', next: {data: 'c', next: undefined}}},
      {data: 'c', next: {data: 'b', next: {data: 'a', next: undefined}}}
    ]
  ])('Case %# %s: %p', (_, list, expected) => {
    expect(SList.reverse(deepCloneJSON(list))).toEqual(expected)
    expect(SList.reverseRecursive(deepCloneJSON(list))).toEqual(expected)
  }))

describe('isCycle', () =>
  test.each([
    ['empty', undefined, false],
    ['singular acyclic', {next: undefined}, false],
    [
      'singular cyclic',
      (() => {
        const node: SList.Node = {next: undefined}
        node.next = node
        return node
      })(),
      true
    ],
    ['two acyclic', {next: {next: undefined}}, false],
    [
      'two cyclic',
      (() => {
        const node: SList.Node = {next: {next: undefined}}
        node.next!.next = node
        return node
      })(),
      true
    ],
    ['three acyclic', {next: {next: {next: undefined}}}, false],
    [
      'three cyclic',
      (() => {
        const node: SList.Node = {next: {next: {next: undefined}}}
        node.next!.next!.next = node
        return node
      })(),
      true
    ],
    [
      'eight acyclic',
      {next: {next: {next: {next: {next: {next: {next: {next: undefined}}}}}}}},
      false
    ],
    [
      'eight cyclic',
      (() => {
        const node: SList.Node = {
          next: {
            next: {next: {next: {next: {next: {next: {next: undefined}}}}}}
          }
        }
        let next = node
        while (next.next) next = next.next
        next.next = node
        return node
      })(),
      true
    ]
  ])('Case %# %s: %p', (_, list, expected) =>
    expect(SList.isCyclic(list)).toStrictEqual(expected)
  ))
