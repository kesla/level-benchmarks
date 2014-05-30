module.exports = function (db, length, callback) {
  var stream = db.createReadStream()
  stream.resume()
  stream.on("end", callback)
}

module.exports.setup = function (db, length, callback) {
  var doWrites = function() {
    if(--length === 0) return callback()
    db.put("aa" + length, "bb" + length, doWrites)
  }
  doWrites()
}
