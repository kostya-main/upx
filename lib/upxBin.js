import * as path from 'path';
import { exec } from 'child_process';
import * as formatOutput  from './formatOutput.js';

const BASE_PATH = path.join(import.meta.dirname, '../bin')
const arch = process.arch.match(/armv/) ? 'arm' : 'amd64'
const os = process.platform
const binPath = os === 'win32' ? `upx.exe` : `upx-linux-${arch}`
// macOs fallback on native installation:
const binAbsolute = os === 'darwin' ? 'upx' : path.join(BASE_PATH, binPath)

export default function (args, cb) {
  let output = this._output ? '-o ' + this._output : ''
  let cmd = `${binAbsolute} ${this.file} ${args} ${output}`
  exec(cmd, function (error, stdout) {
    if (error) {
      if (os === 'darwin') error = 'make sure to install upx native dependency with: brew install upx'
      return cb(error)
    }
    cb(null, formatOutput.default(getOperation(args), stdout))
  })
}

function getOperation (args) {
  // detect operation from args
  if (args.indexOf('-d') > -1) return 'decompress'
  if (args.indexOf('-l') > -1) return 'list'
  else return 'compress'
}