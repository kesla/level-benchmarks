var series = require('run-series')

  , Benchmark = require('benchmark')

  , tests = {
        'put(int, string)'  : require('./tests/put-int-string.js')
      // , 'get(int):string'   : require('./tests/get-int.js')
      // , 'batch(int, string)': require('./tests/batch-int-string.js')
      // , 'readStream'        : require('./tests/read-stream.js')
    }

  , runTest = function (db, name, test, length, callback) {
      test.setup(db, length, function () {
        new Benchmark(name, {
            defer: true
          , fn: function (deffered) {
              test(db, length, deffered.resolve.bind(deffered))
            }
        })
        .on('complete', function (event) {
          console.log(event.target.toString())
          callback()
        })
        .run({ async: true })
      })
    }

  , benchmarks = function (engines, lengths) {
      var tasks = []

      Object.keys(tests).forEach(function (key) {
        var test = tests[key]

        lengths.forEach(function (length) {
          engines.forEach(function (engine) {
            var name = engine.name + ' ' + key + ' x ' + length

            tasks.push(function (done) {
              engine.factory(name, function (err, db) {
                runTest(db, name, test, length, done)
              })
            })
          })
        })
      })

      series(tasks)
    }

module.exports = benchmarks