const express = require('express')
const router = express.Router()
router.get('/list', (req, res) => {
  res.send({
    userId: 1,
    deptId: 100,
    userName: 'admin',
    nickName: 'admin',
    email: 'admin@163.com',
    phonenumber: '15888888887',
    sex: '0',
    avatar: '1111',
    salt: null,
    status: '0',
  })
})
module.exports = router
