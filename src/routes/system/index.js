const express = require('express')
const router = express.Router()

router.use('/user', require('./user'))
router.use('/SchoolTeachingManage', require('./SchoolTeachingManage'))
router.use('/StatusExceptionManage', require('./StatusExceptionManage'))
router.use('/campusNews', require('./CampusNews'))

module.exports = router
