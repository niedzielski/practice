import {Ex} from './classSyntax'

test('Create and use', () => {
  const ex = new Ex(2)
  expect(ex.memberA).toBe(1)
  expect(ex.memberB).toBe(2)
  expect(ex.memberC).toBe(3)
  ex.memberC = 4
  expect(ex.memberC).toBe(4)
  expect(ex.esMember).toBe(5)
  expect(Ex.staticMember).toBe(6)
})
