export type Node = {next?: Node}

/** @return Return true to halt. */
export type It = (node: Node) => boolean | void

export function find(list: Node | undefined, it: It): Node | undefined {
  for (; list; list = list.next) if (it(list)) return list
  return
}

/** @return New head. */
export function removeFront(list: Node | undefined): Node | undefined {
  if (!list) return
  const next = list.next
  list.next = undefined
  return next
}

/** @return New head (node). */
export function prepend(list: Node | undefined, node: Node): Node {
  node.next = list
  return node
}

/** @return New head. */
export function append(list: Node | undefined, node: Node): Node {
  if (!list) return node
  let tail = list
  for (; tail.next; tail = tail.next);
  tail.next = node
  return list
}

export function appendRecursive(list: Node | undefined, node: Node): Node {
  if (!list) return node
  list.next = appendRecursive(list.next, node)
  return list
}

export function size(list: Node | undefined): number {
  let size = 0
  for (; list; list = list.next) ++size
  return size
}

export function sizeRecursive(list: Node | undefined): number {
  if (!list) return 0
  return 1 + sizeRecursive(list.next)
}

export function reverse(list: Node | undefined): Node | undefined {
  let head = undefined
  for (let cursor = list; cursor; ) {
    const next = cursor.next
    cursor.next = head
    head = cursor
    cursor = next
  }
  return head
}

export function reverseRecursive(list: Node | undefined): Node | undefined {
  if (list?.next == null) return list
  const next = list.next
  list.next = undefined
  const head = reverseRecursive(next)
  next.next = list
  return head
}

export function isCyclic(list: Node | undefined): boolean {
  for (let runner = list?.next; runner != null; runner = runner.next?.next) {
    if (list == runner) return true
    list = list!.next
  }
  return false
}
