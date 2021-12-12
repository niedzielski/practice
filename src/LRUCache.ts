export class LRUCache {
  private _cache = new Map<number, number>()

  constructor(private _capacity: number) {}

  get capacity(): number {
    return this._capacity
  }

  get size(): number {
    return this._cache.size
  }

  get(key: number): number {
    if (!this._cache.has(key)) return -1
    const val = this._cache.get(key)!
    this._cache.delete(key)
    this._cache.set(key, val)
    return val
  }

  put(key: number, value: number): void {
    if (!this._cache.has(key) && this._cache.size == this._capacity) {
      const oldestKey = this._cache.keys().next().value
      this._cache.delete(oldestKey)
    }
    this._cache.delete(key)
    this._cache.set(key, value)
  }
}
