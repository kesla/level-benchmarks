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
