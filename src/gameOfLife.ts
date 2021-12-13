export enum Cell {
  Dead = 0,
  Living = 1
}
export type Board = Cell[][]

export function gameOfLife(board: Board): void {
  let top = []
  let mid: Cell[] = []
  for (let y = 0; y < board.length; y++) {
    top = mid
    mid = [...board[y]!]
    for (let x = 0; x < board[y]!.length; x++) {
      const living = sumMaybeLiving(
        top[x - 1],
        top[x],
        top[x + 1],
        mid[x - 1],
        mid[x + 1],
        board[y + 1]?.[x - 1],
        board[y + 1]?.[x],
        board[y + 1]?.[x + 1]
      )
      if (mid[x] == Cell.Living && living < 2) board[y]![x] = Cell.Dead
      else if (mid[x] == Cell.Living && living >= 2 && living <= 3)
        board[y]![x] = Cell.Living
      else if (mid[x] == Cell.Living && living > 3) board[y]![x] = Cell.Dead
      else if (mid[x] == Cell.Dead && living == 3) board[y]![x] = Cell.Living
    }
  }
}

function sumMaybeLiving(...cells: readonly (Cell | undefined)[]): number {
  return cells.reduce(
    (sum: number, cell) => sum + (cell == Cell.Living ? 1 : 0),
    0
  )
}
