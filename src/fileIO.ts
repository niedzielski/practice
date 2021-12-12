import fs from 'fs/promises'

/** @arg filename Absolute path. */
export async function readFile(filename: string): Promise<string> {
  return await fs.readFile(filename, 'utf-8')
}
