export class Ex {
  static staticMember: number = 6
  private _memberA: number
  #esMember: number
  constructor(private _memberB: number, private _memberC: number = 3) {
    this._memberA = 1
    this.#esMember = 5
  }

  get memberA(): number {
    return this._memberA
  }

  get memberB(): number {
    return this._memberB
  }

  get memberC(): number {
    return this._memberC
  }

  set memberC(val: number) {
    this._memberC = val
  }

  get esMember(): number {
    return this.#esMember
  }
}
