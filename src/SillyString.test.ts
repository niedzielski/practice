import {SillyString} from './SillyString'

test.each([
  ['empty', []],
  ['singular', ['abc']],
  [undefined, ['abc', 'def', '', 'foobar', '', '', '']]
])('%s %#', (_, strs) =>
  expect(SillyString.decode(SillyString.encode(strs))).toStrictEqual(strs)
)
