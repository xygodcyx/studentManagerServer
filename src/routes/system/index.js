const express = require('express')
const router = express.Router()

router.use('/user', require('./user'))
router.use('/SchoolTeachingManage', require('./SchoolTeachingManage'))

module.exports = router
