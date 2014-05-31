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

benchmarks(engines, lengths, { maxTime: 1 })