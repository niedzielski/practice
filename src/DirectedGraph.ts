export class DirectedGraph<T> {
  #edges: Map<T, Set<T>> = new Map()

  addEdge(from: T, ...to: T[]): void {
    this.#edges.set(from, new Set(to))
  }

  plot(from: T, to: T): T[] {
    const paths = new Map<T, T>()
    const open = [from]

    for (let node = open.pop(); node != null; node = open.pop()) {
      if (node == to) break

      for (const edge of this.#edges.get(node) ?? []) {
        if (!paths.has(edge)) {
          paths.set(edge, node)
          open.push(edge)
        }
      }
    }

    const path = []
    for (
      let node = paths.has(to) ? to : undefined;
      node != null;
      node = paths.get(node)
    ) {
      path.unshift(node)
      if (node == from) break
    }

    return path
  }
}