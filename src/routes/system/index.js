const express = require('express')
const router = express.Router()

router.use('/user', require('./user'))
router.use('/SchoolTeachingManage', require('./SchoolTeachingManage'))
router.use('/StatusExceptionManage', require('./StatusExceptionManage'))
router.use('/campusNews', require('./campusNews'))
router.use('/visitToday', require('./visitToday'))

module.exports = router
