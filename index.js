import * as fs from 'fs'
import * as upxBin from './lib/upxBin.js'
import * as opts2Args from './lib/opts2Args.js'


class Upx {
    constructor (file, opts) {
      fileExists(file)
      this.file = file
      this.opts = opts || {}
    }
  
    output (outPath) {
      this._output = outPath
      return this
    }
  
    start () {
      let self = this
      return new Promise(function (resolve, reject) {
        upxBin.default.call(self, opts2Args.default(self.opts), function (err, stats) {
          if (err) return reject(err)
          resolve(stats)
        })
      })
    }
}
  
export default function (file, opts) {
    return new Upx(file, opts)
}
  
function fileExists (file) {
    try {
      fs.statSync(file)
    } catch (e) {
      throw Error('Make sure the file exists: ' + file + ' ERROR ' + e)
    }
}