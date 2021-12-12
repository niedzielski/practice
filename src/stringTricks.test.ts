import {isAnagram, isPalindrome, isPalindromeRecursive} from './stringTricks'

// https://leetcode.com/problems/valid-anagram
test.each([
  ['ex 1', 'anagram', 'nagaram', true],
  ['ex 2', 'rat', 'car', false],
  ['different lengths', 'a', 'ab', false]
])('%s', (_, lhs, rhs, expected) => expect(isAnagram(lhs, rhs)).toBe(expected))

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

test('Iterate over string', () => {
  const stack = []
  for (const char of 'abc') stack.push(char)
  expect(stack).toStrictEqual(['a', 'b', 'c'])
})

test('Repeating a string', () => {
  expect('a'.repeat(3)).toStrictEqual('aaa')
})
