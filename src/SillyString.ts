export type SillyString = string & {[brand]: void}
declare const brand: unique symbol

export namespace SillyString {
  export function encode(strs: readonly string[]): SillyString {
    if (strs.length == 0) return <SillyString>''
    const lens = strs.map(str => str.length).join(',')
    return <SillyString>(lens + ';' + strs.join(''))
  }

  export function decode(silly: SillyString): string[] {
    if (silly.length == 0) return []
    const delim = silly.indexOf(';')
    if (delim < 0) throw Error('Missing delimiter.')
    const lens = silly
      .substring(0, delim)
      .split(',')
      .map(len => {
        const int = Number.parseInt(len, 10)
        if (!Number.isInteger(int))
          throw Error(`Length "${len}" is not integral.`)
        return int
      })
    const packed = silly.substring(delim + 1)
    const strs = []
    let start = 0
    for (const len of lens) {
      const str = packed.substring(start, start + len)
      strs.push(str)
      start += len
    }
    return strs
  }
}
