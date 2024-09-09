const { dbQ } = require('../db/query')
const { v4: uuidv4 } = require('uuid')
const { sign, getBaseSqlFromData } = require('../tools')

const express = require('express')
const router = express.Router()
// 查询
router.post('/', async (req, res) => {
  const { account, password } = req.body
  console.log(account, password)
  const sendData = {
    code: 200,
    message: '登录成功',
    data: null,
    error: null,
  }
  try {
    const result = await dbQ('select * from students where account =? and password =?', [
      account,
      password,
    ])
    sendData.data = result
  } catch (err) {
    sendData.code = -1
    sendData.message = '登录失败'
    sendData.error = err.message
  }
  res.send(sendData)
})
// 注册

router.post('/_token/register', async (req, res) => {
  const { account } = req.body
  const sendData = {
    code: 200,
    message: '注册成功',
    data: null,
    error: null,
  }
  try {
    const hasAccount = await dbQ('select * from students where account = ?', [account])
    if (hasAccount.length > 0) {
      // 账号已存在,不能注册
      sendData.code = -1
      sendData.message = '该账号已存在'
      res.send(sendData)
      return
    } else {
      // 账号不存在,可以注册
      const id = uuidv4()
      const header = btoa({ alg: 'HS256', typ: 'JWT' })
      const playload = btoa((id + account).toString())
      const token = sign(`${header}.${playload}`, 'xygodcyx')
      const [insertSql, params] = getBaseSqlFromData(
        { id, ...req.body, token },
        'students',
        'insert'
      )
      await dbQ(insertSql, params)
      try {
        sendData.data = {
          id: id,
          token: token,
        }
        sendData.message = '注册成功'
      } catch (err) {
        sendData.code = -1
        sendData.message = '注册失败'
        sendData.error = err.message
      }
      res.send(sendData)
      return
    }
  } catch (err) {
    sendData.code = -1
    sendData.message = '注册失败'
    sendData.error = err.message
  }
  res.send(sendData)
})

module.exports = router
