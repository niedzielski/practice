export type Link<T> = {val: T; next?: Link<T>}

/** @return True to halt. */
export type It<T> = (link: Link<T>) => boolean

export function find<T>(
  list: Link<T> | undefined,
  it: It<T>
): Link<T> | undefined {
  for (; list; list = list.next) if (it(list)) return list
}

/** @return New head. */
export function removeFront<T>(list: Link<T> | undefined): Link<T> | undefined {
  if (list == null) return
  const next = list.next
  list.next = undefined
  return next
}

/** @return New head (link). */
export function prepend<T>(list: Link<T> | undefined, link: Link<T>): Link<T> {
  link.next = list
  return link
}

/** @return New head. */
export function append<T>(list: Link<T> | undefined, link: Link<T>): Link<T> {
  if (list == null) return link
  let tail = list
  while (tail.next != null) tail = tail.next
  tail.next = link
  return list
}

export function appendRecursive<T>(
  list: Link<T> | undefined,
  link: Link<T>
): Link<T> {
  if (list == null) return link
  list.next = appendRecursive(list.next, link)
  return list
}

export function size<T>(list: Link<T> | undefined): number {
  let size = 0
  for (; list != null; list = list.next) ++size
  return size
}

export function sizeRecursive<T>(list: Link<T> | undefined): number {
  if (list == null) return 0
  return 1 + sizeRecursive(list.next)
}

export function reverse<T>(list: Link<T> | undefined): Link<T> | undefined {
  let head = undefined
  for (let cursor = list; cursor != null; ) {
    const next = cursor.next
    cursor.next = head
    head = cursor
    cursor = next
  }
  return head
}

export function reverseRecursive<T>(
  list: Link<T> | undefined
): Link<T> | undefined {
  if (list?.next == null) return list
  const next = list.next
  list.next = undefined
  const head = reverseRecursive(next)
  next.next = list
  return head
}

export function isCyclic<T>(list: Link<T> | undefined): boolean {
  for (let runner = list?.next; runner != null; runner = runner.next?.next) {
    if (list == runner) return true
    list = list!.next
  }
  return false
}

/**
 * When list is L0 → L1 → … → Ln - 1 → Ln, reorder to
 * L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …. See
 * https://leetcode.com/problems/reorder-list.
 */
export function reorder<T>(list: Link<T> | undefined): void {
  let link = list
  for (let runner = list; runner != null; runner = runner.next?.next)
    link = link!.next

  let tail = undefined
  while (link != null) {
    const {next} = link
    link.next = tail
    tail = link
    link = next
  }

  link = list
  while (tail != null) {
    const {next} = link!
    link!.next = tail
    tail = tail.next
    link!.next.next = next
    link = next
  }
  if (link != null) link.next = undefined
}

export function toArray<T>(list: Link<T> | undefined): T[] {
  const arr = []
  for (let link = list; link != null; ) {
    arr.push(link.val)
    link = link.next
  }
  return arr
}
