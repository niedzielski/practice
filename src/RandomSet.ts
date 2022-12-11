export class RandomSet<T> implements Set<T> {
  readonly [Symbol.toStringTag]: string = RandomSet.name
  readonly #indexByVal: Map<T, number> = new Map()
  readonly #valByIndex: T[] = []

  get size(): number {
    return this.#valByIndex.length
  }

  add(val: T): this {
    this.insert(val)
    return this
  }

  clear(): void {
    this.#indexByVal.clear()
    this.#valByIndex.length = 0
  }

  delete(val: T): boolean {
    const index = this.#indexByVal.get(val)
    if (index == null) return false

    this.#indexByVal.delete(val)

    const lastVal = this.#valByIndex.pop()!
    if (lastVal != val) {
      this.#indexByVal.delete(lastVal)

      // Reinsert.
      this.#indexByVal.set(lastVal, index)
      this.#valByIndex[index] = lastVal
    }

    return true
  }

  *entries(): IterableIterator<[T, T]> {
    for (const val of this.#valByIndex.values()) yield [val, val]
  }

  forEach(cb: (val: T, key: T, set: Set<T>) => void, self?: this): void {
    this.#valByIndex.forEach(val => cb(val, val, this), self)
  }

  get(): T | undefined {
    const index = Math.trunc(Math.random() * this.size)
    return this.#valByIndex[index]
  }

  has(val: T): boolean {
    return this.#indexByVal.has(val)
  }

  insert(val: T): boolean {
    if (this.#indexByVal.has(val)) return false
    this.#indexByVal.set(val, this.size)
    this.#valByIndex[this.size] = val
    return true
  }

  keys(): IterableIterator<T> {
    return this.values()
  }

  map<To>(
    cb: (value: T, index: number, array: T[]) => To,
    self?: unknown
  ): To[] {
    return this.#valByIndex.map(cb, self)
  }

  *[Symbol.iterator](): Generator<T> {
    for (const val of this.#valByIndex) yield val
  }

  values(): IterableIterator<T> {
    return this.#valByIndex.values()
  }
}
