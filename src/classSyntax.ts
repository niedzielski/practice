export class Ex {
  private _memberA: number
  constructor(private _memberB: number, private _memberC: number = 3) {
    this._memberA = 1
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
}
