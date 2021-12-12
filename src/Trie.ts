export type Node = {prefix: string; word?: boolean; children: Node[]}

export function make(): Node {
  return {prefix: '', children: []}
}

export function add(trie: Node, word: string): void {
  addFrom(nearest(trie, word), word)
}

function nearest(trie: Node, word: string): Node {
  let node = trie
  let prefix = ''
  for (const letter of word) {
    prefix += letter
    const child = node.children.find(node => node.prefix == prefix)
    if (child != null) node = child
    else break
  }
  return node
}

function addFrom(node: Node, word: string): void {
  let {prefix} = node
  const remaining = word.slice(prefix.length)
  for (const letter of remaining) {
    prefix += letter
    const child = {prefix, children: []}
    node.children.push(child)
    node = child
  }
  node.word = true
}

export function complete(trie: Node, word: string, limit: number): string[] {
  let matches = []
  let queue = [nearest(trie, word)]
  for (
    let node = queue.shift();
    node != null && matches.length < limit;
    node = queue.shift()
  ) {
    if (node.word) matches.push(node.prefix)
    queue.push(...node.children)
  }
  return matches
}
