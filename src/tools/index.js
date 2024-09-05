const crypto = require('crypto')

function sign(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('hex')
}

function getBaseSqlFromData(data, table, type) {
  let sql = ''
  let res = []
  let keys = Object.keys(data)
  let len = keys.length
  switch (type) {
    case 'select':
      sql = `SELECT * FROM ${table}`
      keys.forEach((k, i) => {
        if (data[k] !== null && data[k] !== undefined) {
          res.push(data[k])
        }
      })
      return [sql, res]
    case 'insert':
      console.log('insert')
      sql = `INSERT INTO ${table} `
      sql += '('
      keys.forEach((k, i) => {
        if (data[k] !== null && data[k] !== undefined) {
          sql += '`' + k + '`' + (i < len - 1 ? ',' : '')
          res.push(data[k])
        }
      })
      sql += ')'
      sql += ' VALUES '
      sql += '('
      keys.forEach((k, i) => {
        if (data[k] !== null && data[k] !== undefined) {
          sql += '"' + data[k] + '"' + (i < len - 1 ? ',' : '')
        }
      })
      sql += ')'
      console.log(sql)
      return [sql, res]
    case 'update':
      sql = `UPDATE ${table} SET `
      keys.forEach((k, i) => {
        if (data[k] !== null && data[k] !== undefined) {
          sql += '`' + k + '`' + '="' + data[k] + '"' + (i < len - 1 ? ',' : '')
          res.push(data[k])
        }
      })
      return [sql, res]
    case 'delete':
      sql = `DELETE FROM ${table}`
      keys.forEach((k, i) => {
        if (data[k] !== null && data[k] !== undefined) {
          res.push(data[k])
        }
      })
      return [sql, res]
    default:
      return [sql, res]
  }
}

module.exports.sign = sign
module.exports.getBaseSqlFromData = getBaseSqlFromData
