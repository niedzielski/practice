import {isPalindrome, isPalindromeRecursive} from './isPalindrome'

test.each([
  ['empty', '', true],
  ['singular', 'a', true],
  [undefined, 'aa', true],
  [undefined, 'aba', true],
  [undefined, 'bob', true],
  [undefined, 'tenet', true],
  [undefined, 'racecar', true],
  [undefined, 'amanaplanacanalpanama', true],
  [undefined, 'ab', false],
  [undefined, 'abb', false],
  [undefined, 'abcdef', false]
])('Case %# %s: %p', (_, str, expected) => {
  expect(isPalindrome(str)).toBe(expected)
  expect(isPalindromeRecursive(str)).toBe(expected)
})
