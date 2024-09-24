const e = require('express')
const express = require('express')
const { dbQ } = require('./db/query')
const app = express()

const port = 80

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use(express.static('public'))
app.use(express.json())

app.use('/login', require('./routes/login'))
app.use('/system', require('./routes/system/index'))
app.use('/', require('./routes/base'))

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
