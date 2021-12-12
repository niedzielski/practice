import * as AStar from './AStar'

it('alphabet', () => {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const heuristic = () => 1
  const adjacent = (
    graph: Readonly<AStar.Graph<string>>,
    to: Readonly<string>
  ) => {
    const index = graph.nodes.indexOf(to)
    return [
      ...(graph.nodes[index - 1] ?? []),
      ...(graph.nodes[index + 1] ?? [])
    ]
  }
  const graph = AStar.make(alphabet, heuristic, adjacent)
  expect(AStar.plot(graph, 'a', 'c')).toStrictEqual({
    cost: 2,
    path: ['a', 'b', 'c']
  })
  expect(AStar.plot(graph, 'c', 'a')).toStrictEqual({
    cost: 2,
    path: ['c', 'b', 'a']
  })
  expect(AStar.plot(graph, 'a', 'a')).toStrictEqual({cost: 0, path: []})
  expect(AStar.plot(graph, 'a', 'h')).toStrictEqual({
    cost: 7,
    path: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  })
  expect(AStar.plot(graph, 'h', 'a')).toStrictEqual({
    cost: 7,
    path: ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']
  })
  expect(AStar.plot(graph, 'a', 'i')).toStrictEqual({
    cost: Number.POSITIVE_INFINITY,
    path: []
  })
})

it('number ring', () => {
  //     start
  //     v
  // 2   4 5
  // 0     6
  // 12 10 8
  const ring = [0, 2, 4, 5, 6, 8, 10, 12]
  // Evens are traversable, odds are not.
  const heuristic = (from: number, to: number) =>
    from % 2 || to % 2 ? Number.POSITIVE_INFINITY : 1

  const adjacent = (graph: AStar.Graph<number>, to: number) => {
    const index = graph.nodes.indexOf(to)
    return [
      graph.nodes[(index + graph.nodes.length - 1) % graph.nodes.length]!,
      graph.nodes[(index + 1) % graph.nodes.length]!
    ]
  }
  const graph = AStar.make(ring, heuristic, adjacent)
  expect(AStar.plot(graph, 4, 6)).toStrictEqual({
    cost: 6,
    path: [4, 2, 0, 12, 10, 8, 6]
  })
})

it('Spooky dungeon', () => {
  // 9    ╭──╮
  // 8    │┌─│─
  // 7    ││ x
  // 6    │└───
  // 5    ╰─╮
  // 4 ┌───┐│
  // 3 │   ││
  // 2 └─ ─┘│
  // 1   o──╯
  // 0
  // 0123456789

  type XY = {x: number; y: number}
  type Tile = {blocked?: true} & XY
  const w = 10
  const h = 10
  const dungeon = Array(w * h)
  for (let y = 0; y < h; ++y)
    for (let x = 0; x < w; ++x) dungeon[x + y * w] = {x, y}
  dungeon[6 + 8 * w].blocked = true
  dungeon[7 + 8 * w].blocked = true
  dungeon[9 + 8 * w].blocked = true
  dungeon[6 + 7 * w].blocked = true
  dungeon[6 + 6 * w].blocked = true
  dungeon[7 + 6 * w].blocked = true
  dungeon[8 + 6 * w].blocked = true
  dungeon[9 + 6 * w].blocked = true

  dungeon[2 + 4 * w].blocked = true
  dungeon[3 + 4 * w].blocked = true
  dungeon[4 + 4 * w].blocked = true
  dungeon[5 + 4 * w].blocked = true
  dungeon[6 + 4 * w].blocked = true
  dungeon[2 + 3 * w].blocked = true
  dungeon[6 + 3 * w].blocked = true
  dungeon[2 + 2 * w].blocked = true
  dungeon[3 + 2 * w].blocked = true
  dungeon[5 + 2 * w].blocked = true
  dungeon[6 + 2 * w].blocked = true

  const heuristic = (from: Tile, to: Tile) =>
    Math.abs(to.x - from.x) +
    Math.abs(to.y - from.y) +
    (from.blocked || to.blocked ? Number.POSITIVE_INFINITY : 0)

  const adjacent = (graph: AStar.Graph<Tile>, to: Tile) => {
    const nodes = []
    for (let y = to.y - 1; y <= to.y + 1; ++y)
      for (let x = to.x - 1; x <= to.x + 1; ++x) {
        if (x >= 0 && y >= 0 && x < w && y < h && !(x == to.x && y == to.y))
          nodes.push(graph.nodes[x + y * w]!)
      }
    return nodes
  }
  const graph = AStar.make(dungeon, heuristic, adjacent)
  expect(
    AStar.plot(graph, dungeon[4 + 1 * w], dungeon[8 + 7 * w])
  ).toStrictEqual({
    cost: 18,
    path: [
      {x: 4, y: 1},
      {x: 5, y: 1},
      {x: 6, y: 1},
      {x: 7, y: 2},
      {x: 7, y: 3},
      {x: 7, y: 4},
      {x: 6, y: 5},
      {x: 5, y: 6},
      {x: 5, y: 7},
      {x: 5, y: 8},
      {x: 6, y: 9},
      {x: 7, y: 9},
      {x: 8, y: 8},
      {x: 8, y: 7}
    ]
  })
})
