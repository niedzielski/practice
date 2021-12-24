export class UndirectedGraph {
  #edges: Map<number, Set<number>> = new Map()

  constructor(nodes: number, edges: [from: number, to: number][]) {
    for (let node = 0; node < nodes; node++) this.#edges.set(node, new Set())
    for (const edge of edges) {
      this.#edges.get(edge[0])!.add(edge[1])
      this.#edges.get(edge[1])!.add(edge[0])
    }
  }

  isTree(): boolean {
    // Check for loops from every node.
    for (let node = 0; node < this.#edges.size; node++)
      if (!this.isTreeFrom(node)) return false
    return true
  }

  isTreeFrom(node: number): boolean {
    const open = [node]
    const visited: Map<number, number | undefined> = new Map([
      [node, undefined]
    ])
    for (let node = open.pop(); node != null; node = open.pop()) {
      const backlink = visited.get(node)
      for (const edge of this.#edges.get(node) ?? []) {
        if (visited.has(edge) && backlink != edge) return false
        if (visited.has(edge)) continue
        visited.set(edge, node)
        open.push(edge)
      }
    }

    // Check for islands.
    if (visited.size != this.#edges.size) return false

    return true
  }
}
