import fs from 'fs-extra'
import Promise from 'bluebird'
import { parse as acornParse } from 'acorn'
import acornUmd from 'acorn-umd'

Promise.promisifyAll(fs)

const acornParseOptions = {sourceType: 'module', ecmaVersion: 7, allowHashBang: true}
const acornUmdOptions = {es6: true, amd: true, cjs: true}

async function getDeps (file) {
  let content = await fs.readFileAsync(file, 'utf8')
  console.log(content)
  let ast = acornParse(content, acornParseOptions)
  let deps = acornUmd(ast, acornUmdOptions)
  return deps.map(dep => dep.source.value)
}

getDeps('./typescript.ts')
  .then(console.log)
  .catch(console.error.bind(console))
/*
{ [SyntaxError: The keyword 'public' is reserved (4:16)] pos: 55, loc: Position { line: 4, column: 16 }, raisedAt: 61 }
*/

getDeps('./parse.js')
  .then(console.log)
  .catch(console.error.bind(console))
/*
{ [SyntaxError: Unexpected token (11:6)]
  pos: 312,
  loc: Position { line: 11, column: 6 },
  raisedAt: 320 }

*/
