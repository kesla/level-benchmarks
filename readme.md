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
          , factory: require('level')
        }
      , {
            name: 'levelup (memdown)'
          , factory: require('level-mem')
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
levelup (leveldown) put(int, string) x 10 x 587 ops/sec ±1.63% (17 runs sampled)
levelup (memdown)   put(int, string) x 10 x 659 ops/sec ±1.70% (16 runs sampled)

levelup (leveldown) get(int):string x 10 x 594 ops/sec ±1.51% (17 runs sampled)
levelup (memdown)   get(int):string x 10 x 663 ops/sec ±0.92% (16 runs sampled)

levelup (leveldown) batch(int, string) x 10 x 649 ops/sec ±2.14% (16 runs sampled)
levelup (memdown)   batch(int, string) x 10 x 659 ops/sec ±1.04% (20 runs sampled)

levelup (leveldown) readStream x 10 x 548 ops/sec ±1.92% (21 runs sampled)
levelup (memdown)   readStream x 10 x 588 ops/sec ±1.78% (20 runs sampled)
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
