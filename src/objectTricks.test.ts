test('To and from object', () => {
  expect(
    Object.fromEntries([
      ['a', 1],
      ['b', 2]
    ])
  ).toStrictEqual({a: 1, b: 2})
  expect(Object.entries({a: 1, b: 2})).toStrictEqual([
    ['a', 1],
    ['b', 2]
  ])
})

test('Bare object', () => {
  expect({}.toString).toBeDefined()
  expect(Object.create(null).toString).toBe(undefined)
})

test('Frozen', () => {
  expect(Object.isFrozen(Object.freeze({}))).toBe(true)
  expect(() => ((<any>Object.freeze({a: 1})).a = 2)).toThrow()
})

test('Sealed', () => {
  expect(Object.isSealed(Object.seal({}))).toBe(true)
  const obj = Object.seal({a: 1})
  obj.a = 2
  expect(obj).toStrictEqual({a: 2})
  expect(() => ((<any>Object.seal({a: 1})).b = 3)).toThrow()
})

export {}
