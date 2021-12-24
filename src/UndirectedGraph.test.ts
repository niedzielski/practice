import {UndirectedGraph} from './UndirectedGraph'

test('1', () => {
  const graph = new UndirectedGraph(3, [
    [0, 1],
    [0, 2],
    [1, 2]
  ])
  // 0-1
  // |/
  // 2
  expect(graph.isTree()).toBe(false)
})

test('2', () => {
  const graph = new UndirectedGraph(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 3],
    [0, 4]
  ])
  // 1-0-4
  // | |
  // 2-3
  expect(graph.isTree()).toBe(false)
})

test('3', () => {
  const graph = new UndirectedGraph(5, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4]
  ])
  // 0-1-4
  // |\
  // 2 3
  expect(graph.isTree()).toBe(true)
})

test('4', () => {
  const graph = new UndirectedGraph(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [1, 3],
    [1, 4]
  ])
  // 0-1-2
  //   |\|
  //   4 3
  expect(graph.isTree()).toBe(false)
})
