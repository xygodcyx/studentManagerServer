const express = require('express')
const { dbQ } = require('../../db/query')
const router = express.Router()
router.get('/list', async (req, res) => {
  const { pageNum, pageSize } = req.query
  console.log(pageNum, pageSize)
  const total = await dbQ('select * from statusExceptionManage ',[])
  const result = await dbQ('select * from statusExceptionManage LIMIT ? , ?', [
    (pageNum - 1) * pageSize,
    +pageSize * 1,
  ])

  try {
    res.send({
      total: total.length,
      rows: result,
      code: 200,
      msg: '查询成功',
    })
  } catch (err) {
    res.sendStatus(500)
  }
})
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const result = await dbQ('select * from statusExceptionManage where id=?', [id])
  try {
    res.send({
      data: result[0],
      code: 200,
      msg: '查询成功',
    })
  } catch (err) {
    res.sendStatus(500)
  }
})
router.post('/', async (req, res) => {
  // applyTime 申请时间 True String
  // statusNumber 学籍号 True String
  // studentName 学生姓名 True String
  // state
  // 状态（1.待审核、2.审核中、
  // 3.未通过、4.已通过、5.已
  // 驳回）
  // True Int
  // exceptionTypeId 异常类型编号 True String
  let { applyTime, statusNumber, studentName, exceptionTypeId, state } = req.body
  const sql =
    'insert into statusExceptionManage (applyTime,statusNumber,studentName,exceptionTypeId,state) values (?,?,?,?,?)'
  const params = [applyTime, statusNumber, studentName, exceptionTypeId, state]
  try {
    const result = await dbQ(sql, params)
    res.send({
      msg: '操作成功',
      code: 200,
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.put('/', async (req, res) => {
  // applyTime 申请时间 True String
  // statusNumber 学籍号 True String
  // studentName 学生姓名 True String
  // state
  // 状态（1.待审核、2.审核中、
  // 3.未通过、4.已通过、5.已
  // 驳回）
  // True Int
  // exceptionTypeId 异常类型编号 True String
  let { id, applyTime, statusNumber, studentName, state, exceptionTypeId } = req.body
  console.log('put', req.body)
  const sql =
    'update statusExceptionManage set applyTime=?,statusNumber=?,studentName=?,state=?,exceptionTypeId=? where id=?'
  const params = [applyTime, statusNumber, studentName, state, exceptionTypeId, id]
  try {
    const result = await dbQ(sql, params)
    res.send({
      msg: '操作成功',
      code: 200,
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
router.delete('/:id', async (req, res) => {
  let { id } = req.params
  let ids = id.split(',')
  const sql = 'delete from statusExceptionManage where id in (' + ids.join(',') + ')'
  const params = [id]
  try {
    const result = await dbQ(sql, params)
    res.send({
      msg: '操作成功',
      code: 200,
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
module.exports = router
