# upx

[![NPM Version](https://img.shields.io/npm/v/upx.svg)](https://www.npmjs.com/package/upx)
[![Dependency Status](https://david-dm.org/roccomuso/upx.png)](https://david-dm.org/roccomuso/upx)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Node cross-platform wrapper for [UPX](https://github.com/upx/upx)

## Install

    $ npm install --save-dev https://github.com/kostya-main/upx

## Usage

```javascript
import * as UPX from 'upx';
const upx = new UPX.default(file, {best : true} // see options below)

upx.output('Compressed.exe')
.start().then(function(stats){
  /* stats:
  { cmd: 'compress',
    name: 'Compressed.exe',
    fileSize: { before: '1859072', after: '408064' },
    ratio: '21.95%',
    format: 'win32/pe',
    affected: 1 }
  */
}).catch(function (err) {
  // ...
})
```

### Methods

**`upx(<path>, {options})`** : path is the absolute path to the file to compress/decompress.

**`.output(<output>)`** : path to the output file.

**`.start()`** : Start the compress/decompress process.

### Options

The options below can be true or false.

| Option | Description |
|--------|-------------|
| `faster` | compress faster |
| `better` | compress better |
| `best` | compress best (can be slow for big files) |
| `decompress` | decompress |
| `list` | list compressed files |
| `force` | force compression of suspicious files |
| `lzma` | try LZMA [slower but tighter than NRV] |
| `brute` | try all available compression methods & filters (slow) |
| `ultraBrute` | try even more compression variants (very slow) |
| `overlayCopy` | copy any extra data attached to the file (default) |
| `overlayStrip` | strip any extra data attached to the file (dangerous) |
| `overlaySkip` | don't compress a file with an overlay |
| `8086` | make compressed sys work on any 8086 (for dos) |
| `noReloc` | put no relocations in to the exe header (for dos) |
| `8bit` | uses 8 bit size compression (default: 32 bit) |
| `8mibRam` | 8 megabyte memory limit (default 2MiB) |

# Author

Rocco Musolino ([@roccomuso](https://twitter.com/roccomuso))

# License

MIT
