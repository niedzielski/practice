export class RandomSet {
  // This could be Map if you want to store objects and look-up by reference.
  private _keyToIndex: Record<number, number> = Object.create(null)
  private _keys: number[] = []

  insert(val: number): boolean {
    if (this._keyToIndex[val] != null) return false

    this._keyToIndex[val] = this._keys.length
    this._keys[this._keys.length] = val

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
    const index = Math.trunc(Math.random() * this._keys.length)
    return this._keys[index]
  }

  *[Symbol.iterator](): Generator<number> {
    for (const key in this._keyToIndex) yield Number.parseFloat(key) // This parse wouldn't be needed if Map was used.
  }
}
