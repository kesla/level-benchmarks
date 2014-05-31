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
  , lengths = [ 10 ]
  , benchmarks = require('./benchmarks')

benchmarks(engines, lengths, { maxTime: 1 }, function (err, result) {
  Object.keys(result).forEach(function (testName) {
    var lengths = result[testName]

    Object.keys(lengths).forEach(function (length) {
      var engines = lengths[length]

      Object.keys(engines).forEach(function (engine) {
        var benchmark = engines[engine]

        console.log(benchmark.target.toString())
      })
      console.log()
    })
  })
})
```

### Output

```
levelup (leveldown) put(int, string) x 10 x 616 ops/sec ±2.98% (20 runs sampled)
levelup (memdown)   put(int, string) x 10 x 743 ops/sec ±1.97% (20 runs sampled)

levelup (leveldown) get(int):string x 10 x 611 ops/sec ±1.23% (20 runs sampled)
levelup (memdown)   get(int):string x 10 x 706 ops/sec ±1.12% (20 runs sampled)

levelup (leveldown) batch(int, string) x 10 x 659 ops/sec ±1.69% (17 runs sampled)
levelup (memdown)   batch(int, string) x 10 x 659 ops/sec ±1.35% (10 runs sampled)

levelup (leveldown) readStream x 10 x 569 ops/sec ±1.68% (21 runs sampled)
levelup (memdown)   readStream x 10 x 607 ops/sec ±1.84% (16 runs sampled)
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
