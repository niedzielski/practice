export class RandomSet<Value> implements Set<Value> {
  readonly [Symbol.toStringTag]: string = RandomSet.name
  readonly #indexByVal: Map<Value, number> = new Map()
  readonly #valByIndex: Value[] = []

  get size(): number {
    return this.#valByIndex.length
  }

  add(val: Value): this {
    this.insert(val)
    return this
  }

  clear(): void {
    this.#indexByVal.clear()
    this.#valByIndex.length = 0
  }

  delete(val: Value): boolean {
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

  *entries(): IterableIterator<[Value, Value]> {
    for (const val of this.#valByIndex.values()) yield [val, val]
  }

  forEach(
    cb: (val: Value, key: Value, set: Set<Value>) => void,
    thisArg?: this
  ): void {
    this.#valByIndex.forEach(val => cb(val, val, this), thisArg)
  }

  get(): Value | undefined {
    const index = Math.trunc(Math.random() * this.size)
    return this.#valByIndex[index]
  }

  has(val: Value): boolean {
    return this.#indexByVal.has(val)
  }

  insert(val: Value): boolean {
    if (this.#indexByVal.has(val)) return false
    this.#indexByVal.set(val, this.size)
    this.#valByIndex[this.size] = val
    return true
  }

  keys(): IterableIterator<Value> {
    return this.values()
  }

  map<To>(
    callback: (value: Value, index: number, array: Value[]) => To,
    self?: unknown
  ): To[] {
    return this.#valByIndex.map(callback, self)
  }

  *[Symbol.iterator](): Generator<Value> {
    for (const val of this.#valByIndex) yield val
  }

  values(): IterableIterator<Value> {
    return this.#valByIndex.values()
  }
}
