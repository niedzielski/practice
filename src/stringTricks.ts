/** @return True if lhs and rhs are anagrams of each other */
export function isAnagram(lhs: string, rhs: string): boolean {
  if (lhs.length != rhs.length) return false

  const count: Record<string, number> = {}
  for (let i = 0; i < lhs.length; i++) {
    const left = lhs[i]!
    const right = rhs[i]!
    count[left] ??= 0
    count[right] ??= 0
    count[left]++
    count[right]--
    if (count[left] == 0) delete count[left]
    if (count[right] == 0) delete count[right]
  }
  return Object.keys(count).length == 0
}

export function isPalindrome(str: string): boolean {
  for (let start = 0, end = str.length - 1; start < end; start++, end--)
    if (str[start] != str[end]) return false
  return true
}

export function isPalindromeRecursive(str: string): boolean {
  if (str.length < 2) return true
  if (str[0] != str[str.length - 1]) return false
  return isPalindrome(str.slice(1, -1)) // end is exclusive
}
