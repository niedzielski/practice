import * as Queue from './RingQueue'

// All nodes must be references or primitives.
export type Graph<T> = {edges: Map<T, Map<T, boolean>>}

export function make<T>(nodes: T[]): Graph<T> {
  const edges = new Map<T, Map<T, boolean>>()
  const connections = new Array<boolean>(nodes.length)
  for (let i = 0; i < connections.length; ++i) connections[i] = false
  for (const node of nodes) edges.set(node, new Map<T, boolean>())
  return {edges}
}

export function connect<T>(
  graph: Graph<T>,
  ...connections: [from: T, to: T][]
): void {
  for (const [from, to] of connections) graph.edges.get(from)?.set(to, true)
}

export function plot<T>(graph: Graph<T>, from: T, to: T): T[] {
  const open = Queue.make<T>(graph.edges.size)
  const paths = new Map<T, T>()

  Queue.push(open, from) // In a directed graph, you may not be able to walk backwards or it may differ

  while (!Queue.isEmpty(open)) {
    const current = Queue.pop(open)
    if (current == to) break

    graph.edges.get(current)?.forEach((connected, adjacent) => {
      if (connected && !paths.has(adjacent)) {
        paths.set(adjacent, current)
        Queue.push(open, adjacent)
      }
    })
  }

  const path = []
  for (
    let head: T | undefined = paths.has(to) ? to : undefined;
    head != null;
    head = paths.get(head)
  ) {
    path.push(head)
    if (head == from) break
  }

  return path.reverse()
}
