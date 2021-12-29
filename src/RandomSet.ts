export class RandomSet<Value> {
  #indices: Map<Value, number> = new Map()
  #values: Value[] = []

  get size(): number {
    return this.#values.length
  }

  *[Symbol.iterator](): Generator<Value> {
    for (const val of this.#values) yield val
  }

  entries(): IterableIterator<[number, Value]> {
    return this.#values.entries()
  }

  insert(val: Value): boolean {
    if (this.#indices.has(val)) return false

    this.#indices.set(val, this.size)
    this.#values[this.size] = val

    return true
  }

  remove(val: Value): boolean {
    const index = this.#indices.get(val)
    if (index == null) return false

    this.#indices.delete(val)

    const lastKey = this.#values.pop()!
    if (lastKey != val) {
      // Reinsert.
      this.#indices.delete(lastKey)
      this.#indices.set(lastKey, index)
      this.#values[index] = lastKey
    }

    return true
  }

  getRandom(): Value | undefined {
    const index = Math.trunc(Math.random() * this.size)
    return this.#values[index]
  }

  map<To>(
    callback: (value: Value, index: number, array: Value[]) => To,
    self?: unknown
  ): To[] {
    return this.#values.map(callback, self)
  }

  clear(): void {
    this.#indices.clear()
    this.#values.length = 0
  }
}
