module.exports = function (db, length, callback) {
  var received = 0
    , after = function (err) {
        if (err) throw err
        if (++received == length) callback()
      }

  for (var i = 0; i < length; i++)
    db.get(String(i), after)
}

module.exports.setup = function (db, length, callback) {
  var data = []

  for (var i = 0; i < length; i++)
    data.push({
        type: 'put'
      , key: String(i)
      , value: "It'll be top end no worries stands out like a bushie. It'll be cream no dramas flat out like a rotten. As busy as a slabs bloody built like a stonkered. Get a dog up ya oldies no dramas lets get some bottle-o. Built like a schooner as busy as a big smoke. You little ripper ute my you little ripper dag."
    })

  db.batch(data, callback)
}
