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
