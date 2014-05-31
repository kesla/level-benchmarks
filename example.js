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
