import * as Trie from './Trie'

it('Empty completion', () => {
  const trie = Trie.make()
  expect(Trie.complete(trie, 'foo', 10)).toStrictEqual([])
})

it('Complete small words', () => {
  const trie = Trie.make()

  Trie.add(trie, 'a')
  expect(Trie.complete(trie, 'a', 10)).toStrictEqual(['a'])

  Trie.add(trie, 'oh')
  expect(Trie.complete(trie, 'o', 10)).toStrictEqual(['oh'])

  Trie.add(trie, 'it')
  expect(Trie.complete(trie, 'i', 10)).toStrictEqual(['it'])

  Trie.add(trie, 'ok')
  expect(Trie.complete(trie, 'o', 10)).toStrictEqual(['oh', 'ok'])
})

it('New', () => {
  const trie = Trie.make()
  Trie.add(trie, 'New Jersey')
  Trie.add(trie, 'Pennsylvania')
  Trie.add(trie, 'New Mexico')
  Trie.add(trie, 'Ohio')
  Trie.add(trie, 'Washington')
  expect(Trie.complete(trie, 'New', 10)).toStrictEqual([
    'New Jersey',
    'New Mexico'
  ])
  expect(Trie.complete(trie, 'New', 1)).toStrictEqual(['New Jersey'])
})
