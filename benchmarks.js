var path = require('path')
  , tmpdir = require('os').tmpdir()

  , extend = require('xtend')
  , rimraf = require('rimraf')
  , series = require('run-series-object')

  , Benchmark = require('benchmark')
  , count = 0

  , tests = {
        'put(int, string)'  : require('./tests/put-int-string.js')
      , 'get(int):string'   : require('./tests/get-int.js')
      , 'batch(int, string)': require('./tests/batch-int-string.js')
      , 'readStream'        : require('./tests/read-stream.js')
    }

  , runTest = function (db, name, test, length, opts, callback) {
      opts = extend(
          opts
        , {
              defer: true
            , fn: function (deffered) {
                test(db, length, deffered.resolve.bind(deffered))
              }
          }
      )

      test.setup(db, length, function () {
        new Benchmark(name, opts)
          .on('complete', function (event) {
            callback(null, event)
          })
          .run({ async: true })
      })
    }

  , format = function (result) {
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
    }

  , benchmarks = function (engines, lengths, opts, callback) {
      opts = opts || {}

      var tasks = {}
        , printableEngineName = function (engineName) {
            var len = engines.reduce(
                function (m, c) {
                  return Math.max(c.name.length, m)
                }
              , 0
            )
            while (engineName.length < len) engineName += ' '
            return engineName
          }

      Object.keys(tests).forEach(function (key) {
        var test = tests[key]

        tasks[key] = {}

        lengths.forEach(function (length) {

          tasks[key][length] = {}

          engines.forEach(function (engine) {
            var name = printableEngineName(engine.name) + ' ' + key + ' x ' + length

            tasks[key][length][engine.name] = function (done) {
              var dir = path.join(tmpdir, 'level-benchmarks-' + (count++))

              rimraf(dir, function () {
                engine.factory(dir, function (err, db) {
                  runTest(db, name, test, length, opts, done)
                })
              })
            }
          })
        })
      })

      series(tasks, callback)
    }

module.exports = benchmarks
module.exports.format = format