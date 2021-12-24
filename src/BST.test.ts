import * as BST from './BST'
import {deepCloneJSON} from './clone'

describe('insert', () => {
  type Node = {val: number; left?: Node; right?: Node}
  test.each<[msg: string, tree: Node | undefined, node: Node, expected: Node]>([
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
    const compare = (lhs: Readonly<Node>, rhs: Readonly<Node>) =>
      lhs.val - rhs.val
    expect(
      BST.insert(deepCloneJSON(tree), deepCloneJSON(node), compare)
    ).toEqual(expected)
    expect(
      BST.insertIterative(deepCloneJSON(tree), deepCloneJSON(node), compare)
    ).toEqual(expected)
  })
})

describe('remove', () => {
  type Node = {val: number; left?: Node; right?: Node}
  test.each<
    [
      msg: string,
      tree: Node | undefined,
      node: Node,
      expected: Node | undefined
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
    const compare = (lhs: Node, rhs: Node) => lhs.val - rhs.val
    expect(BST.remove(tree, node, compare)).toEqual(expected)
  })
})

describe('getSize', () => {
  type Node = {left?: Node; right?: Node; val: number}
  test.each<[msg: string, tree: Node | undefined, size: number]>([
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
  type Node = {val: number; left?: Node; right?: Node}
  test.each<[msg: string, tree: Node, expected: Node]>([
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
  type Node = {val: number; left?: Node; right?: Node}
  test.each<[msg: string, tree: Node, expected: Node]>([
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
  type Node = {val: number; left?: Node; right?: Node}
  test.each<[msg: string, tree: Node | undefined, node: Node, expected: Node]>([
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
    const compare = (lhs: Readonly<Node>, rhs: Readonly<Node>) =>
      lhs.val - rhs.val
    expect(BST.insertBalanced(tree, node, compare)).toEqual(expected)
  })
})

describe('lowest common ancestor', () => {
  type Node = {val: number; left?: Node; right?: Node}
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
    const compare = (lhs: Readonly<Node>, rhs: Readonly<Node>) =>
      lhs.val - rhs.val
    const tree = parseBreadth(vals)
    const p = BST.find(tree, {val: pVal}, compare)
    const q = BST.find(tree, {val: qVal}, compare)
    expect(BST.lowestCommonAncestor(tree, p, q)?.val).toEqual(expected)
    expect(BST.lowestCommonAncestorRecursive(tree, p, q)?.val).toEqual(expected)
  })

  function parseBreadth(vals: (number | undefined)[]): Node | undefined {
    const nodes: Node[] = []
    for (let i = 0; i < vals.length; i++) {
      const parent = nodes[Math.trunc((i - 1) / 2)]
      const node = {val: vals[i]!}
      nodes.push(node)
      if (parent != null) {
        if ((i & 1) == 1) parent.left = node
        else parent.right = node
      }
    }
    return nodes[0]
  }
})
