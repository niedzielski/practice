import * as DirectedAdjacencyMatrix from './DirectedAdjacencyMatrix'

it('graph', () => {
  // e-d   k-l-m
  //   ^  /
  //    \v       z-y-w
  //     a-q-r
  //    / \ /
  //   v   v
  //   j-->s-t-u

  const nodes = ['a', 'd', 'e', 'j', 'k', 'l', 'm', 'q', 'r', 's', 't', 'u']
  const graph = DirectedAdjacencyMatrix.make<string>(nodes)
  DirectedAdjacencyMatrix.connect(
    graph,
    ['e', 'd'],
    ['d', 'e'],
    ['k', 'l'],
    ['l', 'k'],
    ['l', 'm'],
    ['m', 'l'],
    ['a', 'd'],
    ['k', 'a'],
    ['a', 'q'],
    ['q', 'a'],
    ['q', 'r'],
    ['r', 'q'],
    ['a', 'j'],
    ['j', 's'],
    ['a', 's'],
    ['r', 's'],
    ['s', 't'],
    ['t', 's'],
    ['t', 'u'],
    ['u', 't'],
    ['z', 'y'],
    ['y', 'z'],
    ['y', 'w'],
    ['w', 'y']
  )

  expect(
    DirectedAdjacencyMatrix.plot(
      graph,
      nodes.find(val => val == 'l'),
      nodes.find(val => val == 't')
    )
  ).toStrictEqual(['l', 'k', 'a', 's', 't'])

  expect(
    DirectedAdjacencyMatrix.plot(
      graph,
      nodes.find(val => val == 'l'),
      nodes.find(val => val == 'w')
    )
  ).toStrictEqual([])

  expect(
    DirectedAdjacencyMatrix.plot(
      graph,
      nodes.find(val => val == 'u'),
      nodes.find(val => val == 'j')
    )
  ).toStrictEqual([])

  expect(
    DirectedAdjacencyMatrix.plot(
      graph,
      nodes.find(val => val == 'u'),
      nodes.find(val => val == 's')
    )
  ).toStrictEqual(['u', 't', 's'])

  expect(
    DirectedAdjacencyMatrix.plot(
      graph,
      nodes.find(val => val == 'u'),
      nodes.find(val => val == 'u')
    )
  ).toStrictEqual([])
})
