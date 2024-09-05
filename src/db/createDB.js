const mysql = require('mysql')

let _connection = null

function getConnection() {
  if (!_connection) {
    _connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'xxyxxxyx666',
      database: 'student',
    })
  }
  return _connection
}

module.exports.connection = getConnection()
