import {gameOfLife} from './gameOfLife'

// https://leetcode.com/problems/game-of-life
test('LC ex 1', () => {
  const board = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ]
  gameOfLife(board)
  expect(board).toStrictEqual([
    [0, 0, 0],
    [1, 0, 1],
    [0, 1, 1],
    [0, 1, 0]
  ])
})

test('LC ex 2', () => {
  const board = [
    [1, 1],
    [1, 0]
  ]
  gameOfLife(board)
  expect(board).toStrictEqual([
    [1, 1],
    [1, 1]
  ])
})
