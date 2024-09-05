const { connection } = require('./createDB')

function connectHandler(resolve, reject) {
  return function (err, result) {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  }
}
function dbQ(sql, params) {
  return new Promise((resolve, reject) => {
    if (!params) {
      connection.query(sql, connectHandler(resolve, reject))
    } else {
      connection.query(sql, params, connectHandler(resolve, reject))
    }
  })
}

module.exports.dbQ = dbQ
