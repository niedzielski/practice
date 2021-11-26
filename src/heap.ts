// The heap is an array of nodes where:
// - Children are always greater than or equal to the parent.
// - Children are stored leftmost in the tree. (The tree is balanced and
//   complete but not necessarily perfectly.) This is so that nodes are laid out
//   predictably.
//   - The head is the first node (zeroth index).
//   - The parent of any node is ~~((index + 1) / 2) - 1. -1 indicates no
//     parent.
//   - The children of any node, when present, are adjacent at
//     (index + 1) * 2 - 1 and (index + 1) * 2.
// Ex:
//                ___________21___________
//               /                        \
//         _____45_____               ____43____
//        /            \             /          \
//     __46__        __51__       __56__      __50__
//    /      \      /      \     /      \    /      \
//   60      70    62      52   57      58  53      54
//  /  \    /
// 61  63  88
// [21, 45, 43, 46, 51, 56, 50, 60, 70, 62, 52, 57, 58, 53, 54, 61, 63, 88]
//  0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17
// Example hierarchy:
// - The parent of 88 is at index = ~~((17 + 1) / 2) - 1 = ~~(18 / 2) - 1 = 8
// - The parent of 70 is at index = ~~(( 8 + 1) / 2) - 1 = ~~( 9 / 2) - 1 = 3
// - The parent of 46 is at index = ~~(( 3 + 1) / 2) - 1 = ~~( 4 / 2) - 1 = 1
// - The parent of 45 is at index = ~~(( 1 + 1) / 2) - 1 = ~~( 2 / 2) - 1 = 0
// - The parent of 21 is at index = ~~(( 0 + 1) / 2) - 1 = ~~( 1 / 2) - 1 = -1

export type Heap<T> = {nodes: T[]; compare: Compare<T>}

/**
 * @return Negative when lhs < rhs, zero when lhs == rhs, and positive when
 *         lhs > rhs.
 */
export type Compare<T> = (lhs: Readonly<T>, rhs: Readonly<T>) => number

export function make<T>(compare: Compare<T>): Heap<T> {
  return {nodes: [], compare}
}

export function remove<T>({nodes, compare}: Heap<T>): T {
  // The top is the minimum.
  const min = nodes[0]

  if (min == null) throw Error('Heap underflow.')

  // Move the last node to the top unless it is the last.
  const end = nodes.pop()!
  if (nodes.length > 0) nodes[0] = end

  // Bubble down from the very top.
  for (let i = 0; i < nodes.length; ) {
    const leftIndex = 2 * i + 1 // (i + 1) * 2 - 1 // = 2 * i + 2 -1 = 2i + 1
    const rightIndex = leftIndex + 1 // (i + 1) * 2

    if (
      leftIndex < nodes.length &&
      compare(nodes[leftIndex]!, nodes[i]!) < 0 &&
      (rightIndex >= nodes.length ||
        compare(nodes[leftIndex]!, nodes[rightIndex]!) <= 0)
    ) {
      swap(nodes, i, leftIndex)
      i = leftIndex
    } else if (
      rightIndex < nodes.length &&
      compare(nodes[rightIndex]!, nodes[i]!) < 0
    ) {
      swap(nodes, i, rightIndex)
      i = rightIndex
    } else break
  }

  return min
}

export function insert<T>(heap: Heap<T>, ...nodes: readonly T[]): void {
  nodes.forEach(node => insertOne(heap, node))
}

export function getSize<T>(heap: Readonly<Heap<T>>): number {
  return heap.nodes.length
}

export function isEmpty<T>(heap: Readonly<Heap<T>>): boolean {
  return heap.nodes.length == 0
}

function insertOne<T>({nodes, compare}: Heap<T>, node: T): void {
  // Add to the end (bottom left of the tree).
  nodes[nodes.length] = node

  // Bubble up from the very bottom while a parent exists (index > 0) and less
  // than parent.
  for (
    let i = nodes.length - 1;
    i > 0 && compare(nodes[i]!, nodes[parentIndex(i)]!) < 0;
    i = parentIndex(i)
  )
    swap(nodes, i, parentIndex(i))
}

/**
 * @return The index of the parent of the node at index. -1 indicates no parent.
 */
function parentIndex(index: number): number {
  return Math.trunc((index - 1) / 2)
}

function swap<T>(nodes: T[], lhs: number, rhs: number): void {
  ;[nodes[lhs], nodes[rhs]] = [nodes[rhs]!, nodes[lhs]!]
}
