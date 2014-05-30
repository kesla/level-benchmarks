# level-benchmarks

Run benchmarks against levelup-compatible engines

[![NPM](https://nodei.co/npm/level-benchmarks.png?downloads&stars)](https://nodei.co/npm/level-benchmarks/)

[![NPM](https://nodei.co/npm-dl/level-benchmarks.png)](https://nodei.co/npm/level-benchmarks/)

## Kudos

This is based upon the tests in [levelup](https://www.npmjs.org/package/levelup).

## Installation

```
npm install level-benchmarks
```

## Example

### Input

```javascript
var engines = [
        {
            name: 'levelup (leveldown)'
          , factory: function (name, callback) {
              var db = require('level-test')()(name)

              db.once('ready', function () {
                callback(null, db)
              })
            }
        }
      , {
            name: 'levelup (memdown)'
          , factory: function (name, callback) {
              var db = require('level-test')( { mem: true })(name)

              callback(null, db)
            }
        }
    ]
  , lengths = [ 10, 1000, 10000, 100000 ]
  , benchmarks = require('./benchmarks')

benchmarks(engines, lengths)
```

### Output

```
levelup (leveldown) put(int, string) x 10 x 579 ops/sec ±0.88% (62 runs sampled)
levelup (memdown)   put(int, string) x 10 x 648 ops/sec ±0.52% (69 runs sampled)

levelup (leveldown) put(int, string) x 1000 x 51.28 ops/sec ±1.89% (64 runs sampled)
levelup (memdown)   put(int, string) x 1000 x 139 ops/sec ±2.88% (83 runs sampled)

levelup (leveldown) put(int, string) x 10000 x 5.65 ops/sec ±1.77% (32 runs sampled)
levelup (memdown)   put(int, string) x 10000 x 17.34 ops/sec ±0.93% (83 runs sampled)

levelup (leveldown) put(int, string) x 100000 x 0.48 ops/sec ±4.18% (7 runs sampled)
levelup (memdown)   put(int, string) x 100000 x 1.35 ops/sec ±15.59% (12 runs sampled)

levelup (leveldown) get(int):string x 10 x 592 ops/sec ±0.58% (42 runs sampled)
levelup (memdown)   get(int):string x 10 x 657 ops/sec ±0.62% (68 runs sampled)

levelup (leveldown) get(int):string x 1000 x 58.64 ops/sec ±1.34% (72 runs sampled)
levelup (memdown)   get(int):string x 1000 x 150 ops/sec ±0.47% (89 runs sampled)

levelup (leveldown) get(int):string x 10000 x 6.27 ops/sec ±1.69% (35 runs sampled)
levelup (memdown)   get(int):string x 10000 x 18.03 ops/sec ±1.27% (86 runs sampled)

levelup (leveldown) get(int):string x 100000 x 0.55 ops/sec ±1.40% (7 runs sampled)
levelup (memdown)   get(int):string x 100000 x 1.35 ops/sec ±1.49% (11 runs sampled)

levelup (leveldown) batch(int, string) x 10 x 619 ops/sec ±0.60% (55 runs sampled)
levelup (memdown)   batch(int, string) x 10 x 656 ops/sec ±0.48% (70 runs sampled)

levelup (leveldown) batch(int, string) x 1000 x 118 ops/sec ±1.03% (72 runs sampled)
levelup (memdown)   batch(int, string) x 1000 x 166 ops/sec ±1.00% (87 runs sampled)

levelup (leveldown) batch(int, string) x 10000 x 14.19 ops/sec ±2.36% (70 runs sampled)
levelup (memdown)   batch(int, string) x 10000 x 18.00 ops/sec ±0.93% (47 runs sampled)

levelup (leveldown) batch(int, string) x 100000 x 1.35 ops/sec ±4.27% (11 runs sampled)
levelup (memdown)   batch(int, string) x 100000 x 1.41 ops/sec ±42.41% (13 runs sampled)

levelup (leveldown) readStream x 10 x 548 ops/sec ±0.71% (87 runs sampled)
levelup (memdown)   readStream x 10 x 596 ops/sec ±0.50% (55 runs sampled)

levelup (leveldown) readStream x 1000 x 54.06 ops/sec ±1.20% (77 runs sampled)
levelup (memdown)   readStream x 1000 x 106 ops/sec ±0.73% (84 runs sampled)

levelup (leveldown) readStream x 10000 x 6.00 ops/sec ±1.01% (34 runs sampled)
levelup (memdown)   readStream x 10000 x 13.04 ops/sec ±0.51% (65 runs sampled)

levelup (leveldown) readStream x 100000 x 0.63 ops/sec ±0.91% (8 runs sampled)
levelup (memdown)   readStream x 100000 x 1.23 ops/sec ±3.32% (11 runs sampled)
```

## Licence

Copyright (c) 2014 David Björklund

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
