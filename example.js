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
  console.log(benchmarks.format(result))
})
