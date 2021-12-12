export enum Cell {
  Dead = 0,
  Alive = 1
}
export type Board = Cell[][]

export function gameOfLife(board: Board): void {
  let top = []
  let mid: Cell[] = []
  for (let y = 0; y < board.length; y++) {
    top = mid
    mid = [...board[y]!]
    for (let x = 0; x < board[y]!.length; x++) {
      const living = sumMaybeNums(
        top[x - 1],
        top[x],
        top[x + 1],
        mid[x - 1],
        mid[x + 1],
        board[y + 1]?.[x - 1],
        board[y + 1]?.[x],
        board[y + 1]?.[x + 1]
      )
      if (mid[x] == 1 && living < 2) board[y]![x] = 0
      else if (mid[x] == 1 && living >= 2 && living <= 3) board[y]![x] = 1
      else if (mid[x] == 1 && living > 3) board[y]![x] = 0
      else if (mid[x] == 0 && living == 3) board[y]![x] = 1
    }
  }
}

function sumMaybeNums(...nums: readonly (number | undefined)[]): number {
  return nums.reduce((sum: number, num) => sum + (num ?? 0), 0)
}
