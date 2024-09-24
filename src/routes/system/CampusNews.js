const express = require('express')
const { dbQ } = require('../../db/query')
const router = express.Router()
router.get('/list', async (req, res) => {
  const { pageNum, pageSize, searchValue } = req.query
  const total = await dbQ('select * from CampusNews ',[])
  const result = await dbQ('select * from CampusNews LIMIT ? , ?', [
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
  const result = await dbQ('select * from CampusNews where id=?', [id])
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
  // newsHeadline 新闻标题 String
  // founder 发布人 string
  // Id 新闻 ID Int
  // newsDetail 新闻内容 string
  // state 发布状态（1 发布中、2 暂停发布） Int
  // coverPhoto 新闻图片 string
  let { newsHeadline, founder, newsDetail, state, coverPhoto } = req.body
  const sql =
    'insert into CampusNews (newsHeadline,founder,newsDetail,state,coverPhoto) values (?,?,?,?,?)'
  const params = [newsHeadline, founder, newsDetail, state, coverPhoto]
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
  // newsHeadline 新闻标题 String
  // founder 发布人 string
  // Id 新闻 ID Int
  // newsDetail 新闻内容 string
  // state 发布状态（1 发布中、2 暂停发布） Int
  // coverPhoto 新闻图片 string
  let { id, newsHeadline, founder, newsDetail, state, coverPhoto} = req.body
  console.log('put', req.body)
  const sql =
    'update CampusNews set newsHeadline=?,founder=?,newsDetail=?,state=?,coverPhoto=? where id=?'
  const params = [newsHeadline, founder, newsDetail, state, coverPhoto, id]
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
  // newsHeadline 新闻标题 String
  // founder 发布人 string
  // Id 新闻 ID Int
  // newsDetail 新闻内容 string
  // state 发布状态（1 发布中、2 暂停发布） Int
  // coverPhoto 新闻图片 string
  let { id } = req.params
  let ids = id.split(',')
  const sql = 'delete from CampusNews where id in (' + ids.join(',') + ')'
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
