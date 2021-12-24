export class RandomSet {
  // This could be Map if you want to store objects and look-up by reference.
  private _keyToIndex: Record<number, number> = Object.create(null)
  private _keys: number[] = []

  get size(): number {
    return this._keys.length
  }

  *[Symbol.iterator](): Generator<number> {
    for (const key of this._keys) yield key
  }

  insert(val: number): boolean {
    if (this._keyToIndex[val] != null) return false

    this._keyToIndex[val] = this.size
    this._keys[this.size] = val

    return true
  }

  remove(val: number): boolean {
    const index = this._keyToIndex[val]
    if (index == null) return false

    delete this._keyToIndex[val]

    const lastKey = this._keys.pop()!
    if (lastKey != val) {
      // Reinsert.
      this._keyToIndex[lastKey] = index
      this._keys[index] = lastKey
    }

    return true
  }

  getRandom(): number | undefined {
    const index = Math.trunc(Math.random() * this.size)
    return this._keys[index]
  }

  map<T>(
    callback: (value: number, index: number, array: number[]) => T,
    self?: unknown
  ): T[] {
    return this._keys.map(callback, self)
  }
}
