import {DirectedGraph} from './DirectedGraph'

it('Choose your own adventure', () => {
  //                  a
  //     /\           ^
  //    v  \          |
  // b->c->d-->e>f>g->h-->i
  //  \_<_/    |   |      |
  //           j-<-k      l-->m<---n
  //                          |
  //                          v
  //                          o
  const graph = new DirectedGraph<string>()
  graph.addEdge('b', 'c')
  graph.addEdge('c', 'd')
  graph.addEdge('d', 'b', 'c', 'e')
  graph.addEdge('e', 'f')
  graph.addEdge('f', 'g')
  graph.addEdge('g', 'h', 'k')
  graph.addEdge('h', 'a', 'i')
  graph.addEdge('i', 'l')
  graph.addEdge('j', 'e')
  graph.addEdge('k', 'j')
  graph.addEdge('l', 'm')
  graph.addEdge('m', 'o')
  graph.addEdge('n', 'm')

  expect(graph.plot('d', 'j')).toStrictEqual(['d', 'e', 'f', 'g', 'k', 'j'])
  expect(graph.plot('b', 'o')).toStrictEqual([
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'l',
    'm',
    'o'
  ])
  expect(graph.plot('a', 'o')).toStrictEqual([])
  expect(graph.plot('n', 'o')).toStrictEqual(['n', 'm', 'o'])
  expect(graph.plot('d', 'c')).toStrictEqual(['d', 'c'])
})
