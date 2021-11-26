import * as Heap from './heap'

/** Nodes must be references or primitives. */
export type Graph<T> = {
  nodes: T[]
  heuristic: Heuristic<T>
  adjacent: Adjacent<T>
}
/** Always returns actual or greater cost, never less than actual. */
export type Heuristic<T> = (from: Readonly<T>, to: Readonly<T>) => number
export type Adjacent<T> = (
  graph: Readonly<Graph<T>>,
  to: Readonly<T>
) => readonly Readonly<T>[]
type Step<T> = {cost: number; node: Readonly<T>}

export function make<T>(
  nodes: T[],
  heuristic: Heuristic<T>,
  adjacent: Adjacent<T>
): Graph<T> {
  return {nodes, heuristic, adjacent}
}

export function plot<T>(
  graph: Readonly<Graph<T>>,
  from: Readonly<T>,
  to: Readonly<T>
): {cost: number; path: T[]} {
  const open = Heap.make<Step<T>>((lhs, rhs) => lhs.cost - rhs.cost)
  const paths = new Map<T, Step<T>>()

  Heap.insert(open, {cost: 0, node: from})

  while (!Heap.isEmpty(open)) {
    const {node} = Heap.remove(open) // Get the current step.
    if (node == to) break // If we're at the end, break.
    // Walk to each adjacent node.
    for (const adjacent of graph.adjacent(graph, node)) {
      const cost =
        (paths.get(node)?.cost ?? 0) + graph.heuristic(adjacent, node)
      // If unvisited or the current route is lesser.
      if (cost < (paths.get(adjacent)?.cost ?? Number.POSITIVE_INFINITY)) {
        paths.set(adjacent, {cost, node})
        Heap.insert(open, {cost, node: adjacent})
      }
    }
  }

  const path = []
  for (
    let head: T | undefined = paths.has(to) ? to : undefined;
    head != null;
    head = paths.get(head)?.node
  ) {
    path.unshift(head)
    if (head == from) break
  }

  return {
    cost: paths.get(to)?.cost ?? (from == to ? 0 : Number.POSITIVE_INFINITY),
    path
  }
}
