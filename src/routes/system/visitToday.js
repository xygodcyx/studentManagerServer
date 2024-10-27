const express = require('express')
const { dbQ } = require('../../db/query')
const router = express.Router()
router.get('/list', async (req, res) => {
  const { pageNum, pageSize, searchValue } = req.query
  const total = await dbQ('select * from visitToday ', [])
  const result = await dbQ('select * from visitToday LIMIT ? , ?', [
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
  const result = await dbQ('select * from visitToday where id=?', [id])
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
  // `id` INT(10) NOT NULL AUTO_INCREMENT,
  // `visitorName` VARCHAR(50) NULL DEFAULT 'visitorName' COLLATE 'utf8_general_ci',
  // `phoneNumber` VARCHAR(50) NULL DEFAULT 'phoneNumber' COLLATE 'utf8_general_ci',
  // `intervieweeName` VARCHAR(50) NULL DEFAULT 'intervieweeName' COLLATE 'utf8_general_ci',
  // `intervieweePhoneNumber` VARCHAR(50) NULL DEFAULT 'intervieweePhoneNumber' COLLATE 'utf8_general_ci',
  // `appointmentName` VARCHAR(50) NULL DEFAULT 'appointment time\n' COLLATE 'utf8_general_ci',
  // `state` INT(10) NULL DEFAULT '1' COMMENT '当前状态 1待审核 2已失效',
  // `ysstate` INT(10) NULL DEFAULT '1' COMMENT '今日是否访问 1未访问 2已访问',
  // `visitorPhone` VARCHAR(50) NULL DEFAULT 'visitorPhone' COLLATE 'utf8_general_ci',
  // `visitorIdNumber` VARCHAR(50) NULL DEFAULT 'visitorIdNumber' COLLATE 'utf8_general_ci',
  // `schoolTime` VARCHAR(50) NULL DEFAULT 'schoolTime' COLLATE 'utf8_general_ci',
  // `peer` VARCHAR(50) NULL DEFAULT 'peer' COLLATE 'utf8_general_ci',
  // `vehicleInformation` VARCHAR(50) NULL DEFAULT 'vehicleInformation' COMMENT '车辆信息' COLLATE 'utf8_general_ci',
  // `visitorPhotos` VARCHAR(50) NULL DEFAULT 'visitorPhotos' COLLATE 'utf8_general_ci',
  // `goschoolTime` VARCHAR(50) NULL DEFAULT 'goschoolTime' COLLATE 'utf8_general_ci',

  let {
    visitorName,
    phoneNumber,
    intervieweeName,
    intervieweePhoneNumber,
    appointmentName,
    state,
    ysstate,
    visitorPhone,
    visitorIdNumber,
    schoolTime,
    peer,
    vehicleInformation,
    visitorPhotos,
    goschoolTime,
  } = req.body
  const sql =
    'insert into visitToday (visitorName,phoneNumber,intervieweeName,intervieweePhoneNumber,appointmentName,state,ysstate,visitorPhone,visitorIdNumber,schoolTime,peer,vehicleInformation,visitorPhotos,goschoolTime) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
  const params = [
    visitorName,
    phoneNumber,
    intervieweeName,
    intervieweePhoneNumber,
    appointmentName,
    state,
    ysstate,
    visitorPhone,
    visitorIdNumber,
    schoolTime,
    peer,
    vehicleInformation,
    visitorPhotos,
    goschoolTime,
  ]
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
  let {
    id,
    visitorName,
    phoneNumber,
    intervieweeName,
    intervieweePhoneNumber,
    appointmentName,
    state,
    ysstate,
    visitorPhone,
    visitorIdNumber,
    schoolTime,
    peer,
    vehicleInformation,
    visitorPhotos,
    goschoolTime,
  } = req.body
  console.log('put', req.body)
  const sql =
    'update visitToday set visitorName=?,phoneNumber=?,intervieweeName=?,intervieweePhoneNumber=?,appointmentName=?,state=?,ysstate=?,visitorPhone=?,visitorIdNumber=?,schoolTime=?,peer=?,vehicleInformation=?,visitorPhotos=?,goschoolTime=? where id=?'
  const params = [
    visitorName,
    phoneNumber,
    intervieweeName,
    intervieweePhoneNumber,
    appointmentName,
    state,
    ysstate,
    visitorPhone,
    visitorIdNumber,
    schoolTime,
    peer,
    vehicleInformation,
    visitorPhotos,
    goschoolTime,
    id,
  ]
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
  const sql = 'delete from visitToday where id in (' + ids.join(',') + ')'
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
