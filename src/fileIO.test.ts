import {readFile} from './fileIO'

test('read', async () =>
  expect(await readFile(`${__dirname}/fileIO.test.text`)).toBe('abc\ndef'))
