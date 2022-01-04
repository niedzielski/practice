// Left < Node < Right
export type Node<T extends Node<T>> = {
  left?: T | undefined
  right?: T | undefined
}

export type Compare<T extends Node<T>> = (
  lhs: Readonly<T>,
  rhs: Readonly<T>
) => number

export function lowestCommonAncestor<T extends Node<T>>(
  root: T | undefined,
  p: T | undefined,
  q: T | undefined
): T | undefined {
  const parent = new Map<T | undefined, T | undefined>([[root, undefined]])
  const open = [root]
  while (open.length > 0) {
    const node = open.pop()
    if (node == null) continue
    parent.set(node.left, node)
    parent.set(node.right, node)
    if (parent.has(p) && parent.has(q)) break
    open.push(node.left, node.right)
  }

  const parentsOfP = new Set<T | undefined>()
  for (let node = p; node != null; node = parent.get(node)) parentsOfP.add(node)

  for (let node = q; node != null; node = parent.get(node))
    if (parentsOfP.has(node)) return node
  return root
}

// Find the node that has p and q as children recursively.
export function lowestCommonAncestorRecursive<T extends Node<T>>(
  root: T | undefined,
  p: T | undefined,
  q: T | undefined
): T | undefined {
  // If root is null, nothing to be done. Return null. If root is one of the
  // targets, we also can't do anything. We have to return the target. If one
  // target is the child of the other target, this is still correct.
  if (root == null || root == p || root == q) return root

  // Search the children. O(n) worst case.
  const left = lowestCommonAncestorRecursive(root.left, p, q)
  const right = lowestCommonAncestorRecursive(root.right, p, q)

  // If no target is in the left, it must be in the right or it doesn't exist.
  if (left == null) return right

  // If no target is in the right, it must in the left or it doesn't exist.
  if (right == null) return left

  // Targets are in children subtrees which are both nonnull. Return the common
  // ancestor, root.
  return root
}

export function insertBalanced<T extends Node<T>>(
  tree: T | undefined,
  node: T,
  compare: Compare<T>
): T {
  if (tree == null) return node

  if (compare(node, tree) < 0)
    tree.left = insertBalanced(tree.left, node, compare)
  else tree.right = insertBalanced(tree.right, node, compare)

  const balance = getHeight(tree.left) - getHeight(tree.right)

  if (tree.right != null && balance < -1) {
    // tree.right is taller than tree.left. Rotate left.
    const balance = getHeight(tree.right.left) - getHeight(tree.right.right)

    if (balance > 0) tree.right = rotateRight(tree.right)
    return rotateLeft(tree)
  }

  if (tree.left != null && balance > 1) {
    // tree.left is taller than tree.right. Rotate right.
    const balance = getHeight(tree.left.left) - getHeight(tree.left.right)

    if (balance < 0) tree.left = rotateLeft(tree.left)
    return rotateRight(tree)
  }

  return tree
}

export function traverseScanline<T extends Node<T>>(
  tree: T | undefined,
  compare: Compare<T>
): T[][] {
  const cols: Record<number, Readonly<{node: T; y: number}>[]> = {}
  let minX = Number.MAX_SAFE_INTEGER
  let maxX = Number.MIN_SAFE_INTEGER
  const open = [{node: tree, x: 0, y: 0}]
  while (open.length > 0) {
    const {node, x, y} = open.pop()!
    if (node == null) continue
    cols[x] ??= []
    cols[x]!.push({node, y})
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    open.push(
      {node: node.left, x: x - 1, y: y + 1},
      {node: node.right, x: x + 1, y: y + 1}
    )
  }

  const path = []
  for (let x = minX; x <= maxX; x++) {
    cols[x]!.sort((lhs, rhs) =>
      lhs.y == rhs.y ? compare(lhs.node, rhs.node) : lhs.y - rhs.y
    )
    path.push(cols[x]!.map(({node}) => node))
  }
  return path
}

export function traverseBreadth<T extends Node<T>>(tree: T | undefined): T[][] {
  const cols: Record<number, T[]> = {}
  let minX = Number.MAX_SAFE_INTEGER
  let maxX = Number.MIN_SAFE_INTEGER
  const open = [{node: tree, x: 0, y: 0}]
  while (open.length > 0) {
    const {node, x, y} = open.shift()!
    if (node == null) continue
    cols[x] ??= []
    cols[x]!.push(node)
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    open.push(
      {node: node.left, x: x - 1, y: y + 1},
      {node: node.right, x: x + 1, y: y + 1}
    )
  }

  const path = []
  for (let x = minX; x <= maxX; x++) path.push(cols[x]!)
  return path
}

export function insert<T extends Node<T>>(
  tree: T | undefined,
  node: T,
  compare: Compare<T>
): T {
  if (tree == null) return node
  if (compare(node, tree) < 0) tree.left = insert(tree.left, node, compare)
  else tree.right = insert(tree.right, node, compare)
  return tree
}

/** @return Tree. */
export function insertIterative<T extends Node<T>>(
  tree: T | undefined,
  node: T,
  compare: Compare<T>
): T {
  if (tree == null) return node

  for (let cursor = tree; ; ) {
    if (compare(node, cursor) < 0) {
      if (cursor.left == null) {
        cursor.left = node
        break
      } else cursor = cursor.left
    } else {
      if (cursor.right == null) {
        cursor.right = node
        break
      } else cursor = cursor.right
    }
  }

  return tree
}

/** @return Tree. */
export function remove<T extends Node<T>>(
  tree: T | undefined,
  node: T,
  compare: Compare<T>
): T | undefined {
  if (tree == null) return
  const comparison = compare(node, tree)
  if (comparison < 0) tree.left = remove(tree.left, node, compare)
  else if (comparison > 0) tree.right = remove(tree.right, node, compare)
  else {
    const {left, right} = tree
    if (left == null) return right
    if (right == null) return left

    let rightmostLeftChild = left
    while (rightmostLeftChild.right)
      rightmostLeftChild = rightmostLeftChild.right

    tree = {...rightmostLeftChild}
    tree.left = remove(left, rightmostLeftChild, compare)
    tree.right = right
  }
  return tree
}

export function getSize<T extends Node<T>>(
  tree: Readonly<T> | undefined
): number {
  if (tree == null) return 0
  return 1 + getSize(tree.left) + getSize(tree.right)
}

export function getHeight<T extends Node<T>>(
  tree: Readonly<T> | undefined
): number {
  if (tree == null) return -1
  return 1 + Math.max(getHeight(tree.left), getHeight(tree.right))
}

export function rotateLeft<T extends Node<T>>(tree: T): T {
  if (tree.right == null) return tree
  const newTree = tree.right // only care about tree and tree.left, tree.right is free
  const tmp = newTree.left // save newTree.left
  newTree.left = tree // saved tree
  tree.right = tmp // tree.right because newTree.left
  return newTree
}

export function rotateRight<T extends Node<T>>(tree: T): T {
  if (tree.left == null) return tree
  const newTree = tree.left // only care about tree and tree.left, tree.right is free
  const tmp = newTree.right // save newTree.left
  newTree.right = tree // saved tree
  tree.left = tmp // tree.right because newTree.left
  return newTree
}

export function find<T extends Node<T>>(
  tree: T | undefined,
  val: T,
  compare: Compare<T>
): T | undefined {
  if (tree == null) return
  const comparison = compare(val, tree)
  if (comparison == 0) return tree
  if (comparison < 0) return find(tree.left, val, compare)
  return find(tree.right, val, compare)
}
