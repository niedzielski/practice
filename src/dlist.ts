export type List<T extends Link<T>> = {head?: T; tail?: T}
export type Link<T extends Link<T>> = {prev?: T; next?: T}

export function make<T extends Link<T>>(): List<T> {
  return {}
}

export function push<T extends Link<T>>(
  list: List<T>,
  ...links: readonly T[]
): void {
  links.forEach(link => pushOne(list, link))
}

export function pop<T extends Link<T>>(list: List<T>): T {
  if (list.head == null) throw Error('List underflow.')

  const link = list.head

  list.head = list.head.prev
  if (list.head != null) list.head.next = undefined

  link.prev = undefined

  if (list.tail === link) list.tail = list.head

  return link
}

export function isEmpty<T extends Link<T>>(list: Readonly<List<T>>): boolean {
  return list.head == null
}

function pushOne<T extends Link<T>>(list: List<T>, link: T): void {
  link.next = list.tail

  if (list.tail != null) list.tail.prev = link
  list.tail = link

  list.head ??= link
}
