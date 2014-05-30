module.exports = function (db, length, callback) {
  db.createReadStream().on("end", cb)
}

module.exports.setup = function (db, length, callback) {
  var doWrites = function() {
    if(--length === 0) return cb()
    db.put("aa" + count, "bb" + count, doWrites)
  }
  doWrites()
}
