// Left < Node < Right
export type Node<T extends Node<T>> = {left?: T; right?: T}

export type Compare<T extends Node<T>> = (
  lhs: Readonly<T>,
  rhs: Readonly<T>
) => number

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

  if (tree.right && balance < -1) {
    // tree.right is taller than tree.left. Rotate left.
    const balance = getHeight(tree.right.left) - getHeight(tree.right.right)

    if (balance > 0) tree.right = rotateRight(tree.right)
    return rotateLeft(tree)
  }

  if (tree.left && balance > 1) {
    // tree.left is taller than tree.right. Rotate right.
    const balance = getHeight(tree.left.left) - getHeight(tree.left.right)

    if (balance < 0) tree.left = rotateLeft(tree.left)
    return rotateRight(tree)
  }

  return tree
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
