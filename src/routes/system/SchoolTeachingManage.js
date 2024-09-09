const express = require('express')
const { dbQ } = require('../../db/query')
const router = express.Router()
router.get('/list', async (req, res) => {
  const { pageNum, pageSize, searchValue } = req.query
  const result = await dbQ('select * from schoolteachingmanage')
  try {
    res.send({
      total: result.length,
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
  const result = await dbQ('select * from schoolteachingmanage where id=?', [id])
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
  // grade 年级 True String
  // studyStage 学段 True String
  // classId 班级 True String
  // SubjectId 课程编号 True String
  // teacherId 教师姓名 True String
  // year 学年 True String
  let { grade, studyStage, classId, subjectName, userName, year } = req.body
  const sql =
    'insert into schoolteachingmanage (grade,studyStage,classId,subjectName,userName,year) values (?,?,?,?,?,?)'
  const params = [grade, studyStage, classId, subjectName, userName, year]
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
  // grade 年级 True String
  // studyStage 学段 True String
  // classId 班级 True String
  // SubjectId 课程编号 True String
  // teacherId 教师姓名 True String
  // year 学年 True String
  let { id, grade, studyStage, classId, subjectName, userName, year } = req.body
  console.log('put', req.body)
  const sql =
    'update schoolteachingmanage set grade=?,studyStage=?,classId=?,subjectName=?,userName=?,year=? where id=?'
  const params = [grade, studyStage, classId, subjectName, userName, year, id]
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
  // grade 年级 True String
  // studyStage 学段 True String
  // classId 班级 True String
  // SubjectId 课程编号 True String
  // teacherId 教师姓名 True String
  // year 学年 True String
  let { id } = req.params
  let ids = id.split(',')
  const sql = 'delete from schoolteachingmanage where id in (' + ids.join(',') + ')'
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
