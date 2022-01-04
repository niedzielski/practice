import * as BST from './BST'
import {deepCloneJSON} from './clone'

describe('insert', () => {
  test.each<
    [msg: string, tree: NumNode | undefined, node: NumNode, expected: NumNode]
  >([
    ['empty', undefined, {val: 1}, {val: 1}],
    ['singular', {val: 2}, {val: 1}, {val: 2, left: {val: 1}}],
    [
      'linked list',
      {val: 2, right: {val: 3, right: {val: 4}}},
      {val: 5},
      {val: 2, right: {val: 3, right: {val: 4, right: {val: 5}}}}
    ],
    [
      //     20
      //    /  \
      //   17   25
      //  /  \
      // 12  18
      'tree',
      {val: 20, left: {val: 17, left: {val: 12}}, right: {val: 25}},
      {val: 18},
      {
        val: 20,
        left: {val: 17, left: {val: 12}, right: {val: 18}},
        right: {val: 25}
      }
    ]
  ])('Case %# %s: %p', (_, tree, node, expected) => {
    expect(
      BST.insert(deepCloneJSON(tree), deepCloneJSON(node), compareNumNodesAsc)
    ).toEqual(expected)
    expect(
      BST.insertIterative(
        deepCloneJSON(tree),
        deepCloneJSON(node),
        compareNumNodesAsc
      )
    ).toEqual(expected)
  })
})

describe('remove', () => {
  test.each<
    [
      msg: string,
      tree: NumNode | undefined,
      node: NumNode,
      expected: NumNode | undefined
    ]
  >([
    ['empty', undefined, {val: 1}, undefined],
    ['singular', {val: 1}, {val: 1}, undefined],
    ['leaf', {val: 2, left: {val: 1}}, {val: 1}, {val: 2}],
    [
      //             20
      //            /  \
      //           17  25
      //          /  \
      //         12  18
      //        /  \
      //       11  13
      //             \
      //             15
      //            /
      //           14
      // transform to
      //             20
      //            /  \
      //           15  25
      //          /  \
      //         12  18
      //        /  \
      //       11  13
      //             \
      //             14
      //
      'children',
      {
        val: 20,
        left: {
          val: 17,
          left: {
            val: 12,
            left: {val: 11},
            right: {val: 13, right: {val: 15, left: {val: 14}}}
          },
          right: {val: 18}
        },
        right: {val: 25}
      },
      {val: 17},
      {
        val: 20,
        left: {
          val: 15,
          left: {val: 12, left: {val: 11}, right: {val: 13, right: {val: 14}}},
          right: {val: 18}
        },
        right: {val: 25}
      }
    ]
  ])('Case %# %s: %p', (_, tree, node, expected) => {
    expect(BST.remove(tree, node, compareNumNodesAsc)).toEqual(expected)
  })
})

describe('getSize', () => {
  test.each<[msg: string, tree: NumNode | undefined, size: number]>([
    ['empty', undefined, 0],
    ['singular', {val: 1}, 1],
    ['multi', {val: 1, right: {val: 2, right: {val: 3}}}, 3]
  ])('Case %# %s: %p', (_, tree, expected) =>
    expect(BST.getSize(tree)).toEqual(expected)
  )
})

describe('getHeight', () =>
  test.each([
    ['empty', undefined, -1],
    ['single', {}, 0],
    ['different levels', {left: {}}, 1]
  ])('Case %# %s: %p', (_, tree, expected) =>
    expect(BST.getHeight<BST.Node<{}>>(tree)).toEqual(expected)
  ))

describe('rotateLeft', () => {
  test.each<[msg: string, tree: NumNode, expected: NumNode]>([
    ['singular', {val: 1}, {val: 1}],
    // 1
    //  \
    //   3
    //    \
    //     6
    //    / \
    //   4   8
    //      / \
    //     7   9
    // transform to
    //   3
    //  / \
    // 1   6
    //    / \
    //   4   8
    //      / \
    //     7   9
    [
      'nonempty 1',
      {
        val: 1,
        right: {
          val: 3,
          right: {
            val: 6,
            left: {val: 4},
            right: {val: 8, left: {val: 7}, right: {val: 9}}
          }
        }
      },
      {
        val: 3,
        left: {val: 1},
        right: {
          val: 6,
          left: {val: 4},
          right: {val: 8, left: {val: 7}, right: {val: 9}}
        }
      }
    ],
    //   3
    //  / \
    // 1   6
    //    / \
    //   4   8
    //      / \
    //     7   9
    // transform to
    //      6
    //    /   \
    //   3     8
    //  / \   / \
    // 1   4 7   9
    [
      'nonempty 2',
      {
        val: 3,
        left: {val: 1},
        right: {
          val: 6,
          left: {val: 4},
          right: {val: 8, left: {val: 7}, right: {val: 9}}
        }
      },
      {
        val: 6,
        left: {val: 3, left: {val: 1}, right: {val: 4}},
        right: {val: 8, left: {val: 7}, right: {val: 9}}
      }
    ]
  ])('Case %# %s: %p', (_, tree, expected) =>
    expect(BST.rotateLeft(tree)).toEqual(expected)
  )
})

describe('rotateRight', () => {
  test.each<[msg: string, tree: NumNode, expected: NumNode]>([
    ['singular', {val: 1}, {val: 1}],
    //      6
    //    /   \
    //   3     8
    //  / \   / \
    // 1   4 7   9
    // transform to
    //   3
    //  / \
    // 1   6
    //    / \
    //   4   8
    //      / \
    //     7   9
    [
      'nonempty 2',
      {
        val: 6,
        left: {val: 3, left: {val: 1}, right: {val: 4}},
        right: {val: 8, left: {val: 7}, right: {val: 9}}
      },
      {
        val: 3,
        left: {val: 1},
        right: {
          val: 6,
          left: {val: 4},
          right: {val: 8, left: {val: 7}, right: {val: 9}}
        }
      }
    ],
    //   3
    //  / \
    // 1   6
    //    / \
    //   4   8
    //      / \
    //     7   9
    // transform to
    // 1
    //  \
    //   3
    //    \
    //     6
    //    / \
    //   4   8
    //      / \
    //     7   9
    [
      'nonempty 1',
      {
        val: 3,
        left: {val: 1},
        right: {
          val: 6,
          left: {val: 4},
          right: {val: 8, left: {val: 7}, right: {val: 9}}
        }
      },
      {
        val: 1,
        right: {
          val: 3,
          right: {
            val: 6,
            left: {val: 4},
            right: {val: 8, left: {val: 7}, right: {val: 9}}
          }
        }
      }
    ]
  ])('Case %# %s: %p', (_, tree, expected) =>
    expect(BST.rotateRight(tree)).toEqual(expected)
  )
})

describe('insertBalanced', () => {
  test.each<
    [msg: string, tree: NumNode | undefined, node: NumNode, expected: NumNode]
  >([
    ['empty', undefined, {val: 1}, {val: 1}],
    //    5
    //   / \
    //  2   9 <-- rotate rhs
    //     / \
    //    8  12
    //   /
    // [7]
    // transform to
    //    5 <-- rotate lhs
    //   / \
    //  2   8
    //     / \
    //    7   9
    //         \
    //         12
    // then
    //     8
    //    / \
    //   5   9
    //  / \   \
    // 2   7  12
    [
      'rotate rhs-lhs',
      {
        val: 5,
        left: {val: 2},
        right: {
          val: 9,
          left: {val: 8},
          right: {val: 12}
        }
      },
      {val: 7},
      {
        val: 8,
        left: {val: 5, left: {val: 2}, right: {val: 7}},
        right: {val: 9, right: {val: 12}}
      }
    ],
    //     9
    //    / \
    //-> 5  12
    //  / \
    // 2   8
    //    /
    //  [7]
    //
    // transform to
    //       9 <--
    //      / \
    //     8  12
    //    /
    //   5
    //  / \
    // 2   7
    // then
    //     8
    //    / \
    //   5   9
    //  / \   \
    // 2   7  12
    [
      'rotate lhs-rhs',
      {
        val: 9,
        left: {val: 5, left: {val: 2}, right: {val: 8}},
        right: {val: 12}
      },
      {val: 7},
      {
        val: 8,
        left: {val: 5, left: {val: 2}, right: {val: 7}},
        right: {val: 9, right: {val: 12}}
      }
    ]
  ])('Case %# %s: %p', (_, tree, node, expected) => {
    expect(BST.insertBalanced(tree, node, compareNumNodesAsc)).toEqual(expected)
  })
})

describe('lowest common ancestor', () => {
  test.each([
    ['empty', [undefined], 1, 2, undefined],
    //           5
    //          / \
    //         /   \
    //        /     \
    //       /       \
    //      1         7
    //     / \       / \
    //    /   \     /   \
    //   0     3   6     8
    //  / \   / \
    // x   x 2   4
    ['ex 1', [5, 1, 7, 0, 3, 6, 8, undefined, undefined, 2, 4], 1, 7, 5],
    //           5
    //          / \
    //         /   \
    //        /     \
    //       /       \
    //      1         7
    //     / \       / \
    //    /   \     /   \
    //   0     3   6     8
    //  / \   / \
    // x   x 2   4
    ['ex 2', [5, 1, 7, 0, 3, 6, 8, undefined, undefined, 2, 4], 1, 4, 1],
    //   1
    //  /
    // 0
    ['ex 3', [1, 0], 1, 0, 1]
  ])('Case %# %s: %p %p %p', (_, vals, pVal, qVal, expected) => {
    const tree = parseBreadth(vals)
    const p = BST.find(tree, {val: pVal}, compareNumNodesAsc)
    const q = BST.find(tree, {val: qVal}, compareNumNodesAsc)
    expect(BST.lowestCommonAncestor(tree, p, q)?.val).toBe(expected)
    expect(BST.lowestCommonAncestorRecursive(tree, p, q)?.val).toBe(expected)
  })
})

describe('traverse scanline', () => {
  test.each([
    ['empty', [undefined], []],
    // https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree
    [
      'ex 1',
      [3, 9, 20, undefined, undefined, 15, 7],
      [[9], [3, 15], [20], [7]]
    ],
    ['ex 2', [1, 2, 3, 4, 5, 6, 7], [[4], [2], [1, 5, 6], [3], [7]]],
    ['ex 3', [1, 2, 3, 4, 6, 5, 7], [[4], [2], [1, 5, 6], [3], [7]]]
  ])('Case %# %s: %p %p %p', (_, vals, expected) => {
    const tree = parseBreadth(vals)
    expect(
      BST.traverseScanline(tree, compareNumNodesAsc).map(col =>
        col.map(({val}) => val)
      )
    ).toStrictEqual(expected)
  })
})

describe('traverse breadth', () => {
  test.each([
    ['empty', [undefined], []],
    // https://leetcode.com/problems/binary-tree-vertical-order-traversal
    [
      'ex 1',
      [3, 9, 20, undefined, undefined, 15, 7],
      [[9], [3, 15], [20], [7]]
    ],
    ['ex 2', [3, 9, 8, 4, 0, 1, 7], [[4], [9], [3, 0, 1], [8], [7]]],
    [
      'ex 3',
      [3, 9, 8, 4, 0, 1, 7, undefined, undefined, undefined, 2, 5],
      [[4], [9, 5], [3, 0, 1], [8, 2], [7]]
    ]
  ])('Case %# %s: %p %p %p', (_, vals, expected) => {
    const tree = parseBreadth(vals)
    expect(
      BST.traverseBreadth(tree).map(col => col.map(({val}) => val))
    ).toStrictEqual(expected)
  })
})

const compareNumNodesAsc = (lhs: Readonly<NumNode>, rhs: Readonly<NumNode>) =>
  lhs.val - rhs.val

type NumNode = {
  val: number
  left?: NumNode | undefined
  right?: NumNode | undefined
}
function parseBreadth(vals: (number | undefined)[]): NumNode | undefined {
  const nodes: (NumNode | undefined)[] = []
  for (let i = 0; i < vals.length; i++) {
    const parent = nodes[Math.trunc((i - 1) / 2)]
    const val = vals[i]
    const node = val == null ? undefined : {val}
    nodes.push(node)
    if (parent != null) {
      if ((i & 1) == 1) parent.left = node
      else parent.right = node
    }
  }
  return nodes[0]
}
