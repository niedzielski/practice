/**
 * Write is always conceptually equal or ahead of read although the indices may
 * wrap. Write and read increment. Empty is when read and write are equal. Full
 * is when write is 1 less than read ---or, like, the capacity is full and read
 * wraps.
 */
export type Queue<T> = {readonly buffer: T[]; read: number; write: number}

/** @arg capacity >= 0 */
export function make<T>(capacity: number): Queue<T> {
  return {buffer: Array(capacity + 1), write: 0, read: 0}
}

/** Push to the back. */
export function push<T>(queue: Queue<T>, ...items: T[]): void {
  if (getCapacity(queue) - getSize(queue) < items.length)
    throw Error('Queue overflow.')
  for (const item of items) {
    queue.buffer[queue.write] = item
    queue.write = (queue.write + 1) % queue.buffer.length
  }
}

/** Pop from the front. */
export function pop<T>(queue: Queue<T>): T {
  const head = queue.buffer[queue.read]
  if (head == null) throw Error('Queue underflow.')
  queue.read = (queue.read + 1) % queue.buffer.length
  return head
}

export function clear<T>(queue: Queue<T>): void {
  queue.read = queue.write
}

export function getSize<T>(queue: Queue<T>): number {
  // Three cases:
  // - write === read: queue is empty
  // - write > read: write - read
  // - write < read: read - write
  // Consider queue of 100 capacity:
  // - Write is 50, read is 50: (101 + 50 - 50) % 101 = 0
  // - Write is 10, read is 0: (101 + 10 - 0) = 10
  // - Write is 0, read is 10: (101 + 0 - 10) = 91
  // - Write is 100, read is 10: (101 + 100 - 10) = 90
  return (queue.buffer.length + queue.write - queue.read) % queue.buffer.length
}

export function getCapacity<T>(queue: Queue<T>): number {
  return queue.buffer.length - 1
}

export function isFull<T>(queue: Queue<T>): boolean {
  // Read and write cursors go from left to write. They do not overlap execept when empty.
  //
  //   [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
  //             ^              ^
  //   ---full---w--available---r--full--
  //
  // Other case where read is before write:
  //
  //   [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
  //             ^              ^
  //   ---avail--r-------full---w-avail--

  // Consider full queue of 100 capacity where:
  // - Write is 100, read is 0: (100 + 1) % 101 === 0
  // - Write is 50, read is 51: (50 + 1) % 101 === 51
  // Consider empty cases where write === read:
  // - Write is 100, read is 100: (100 + 1) % 101 === 100
  // - Write is 50, read is 50: (50 + 1) % 101 === 50
  // Consider nonempty, non-full cases:
  // - Write is 10, read is 0: (10 + 1) % 101 === 0
  // - Write is 0, read is 10: (0 + 1) % 101 === 10
  return (queue.write + 1) % queue.buffer.length === queue.read
}

export function isEmpty<T>(queue: Queue<T>): boolean {
  return queue.write === queue.read
}
