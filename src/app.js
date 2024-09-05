const e = require('express')
const express = require('express')
const { dbQ } = require('./db/query')
const app = express()

const port = 3000

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})
app.use(express.static('public'))
app.use(express.json())

app.all('*', async (req, res, next) => {
  console.log('token验证开始')
  if (req.path.indexOf('/_token') > -1) {
    // 需要验证token
    const token = req.headers.authorization
    const sql = 'SELECT `id` FROM `students` WHERE `token` = ?'
    const params = [token]
    try {
      const result = await dbQ(sql, params)
      if (result.length > 0) {
        console.log('token验证成功')
        console.log('token验证结束')
        next()
      } else {
        console.log('token验证失败')
        console.log('token验证结束')
        res.status(401).send({
          code: 401,
          message: 'token验证失败',
          data: null,
          error: null,
        })
      }
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: '服务器内部错误',
        data: null,
        error: err.message,
      })
    }
  } else {
    console.log('不需要token验证')
    console.log('token验证结束')
    next()
  }
})

app.use('/login', require('./routes/login'))
app.get('/getInfo', (req, res) => {
  res.send({
    msg: '操作成功',
    code: 200,
    permissions: ['*:*:*'],
    roles: ['admin'],
    user: {
      searchValue: null,
      createBy: 'admin',
      createTime: '2022-03-29 10:22:20',
      updateBy: null,
      updateTime: null,
      remark: '管理员',
      params: {},
      userId: 1,
      deptId: 100,
      userName: 'admin',
      nickName: 'admin',
      email: 'admin@163.com',
      phonenumber: '15888888887',
      sex: '0',
      avatar: '/a.jpg',
      salt: null,
      status: '0',
      delFlag: '0',
      loginIp: '10.199.15.120',
      loginDate: '2022-06-08T09:36:26.000+08:00',
      dept: {
        searchValue: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        params: {},
        deptId: 100,
        parentId: 0,
        ancestors: null,
        deptName: '教务处',
        orderNum: '0',
        leader: 'admin',
        phone: null,
        email: null,
        status: '0',
        delFlag: null,
        parentName: null,
        children: [],
      },
      roles: [],
      roleIds: null,
      postIds: null,
      roleId: null,
      consumeBalance: 410,
      admin: true,
    },
  })
})
app.post('/logout', (req, res) => {
  res.send({ code: 200, message: '获取成功', data: { a: 1 } })
})
app.get('/captchaImage', (req, res) => {
  res.send({ code: 200, message: '获取成功', data: { a: 1 } })
})
app.get('/getRouters', (req, res) => {
  res.send({
    code: 200,
    message: '获取成功',
    data: [
      {
        path: '/index',
        component: 'Layout',
        meta: { title: '管理', icon: 'http://localhost:3000/a.jpg' },
        children: [
          {
            path: 'campusNews',
            meta: { title: '新闻管理' },
            component: 'system/campusNews',
          },
          {
            path: 'SchoolTeachingManage',
            meta: { title: '任课管理' },
            component: 'system/SchoolTeachingManage',
          },
          {
            path: 'StatusExceptionManage',
            meta: { title: '状态异常管理' },
            component: 'system/StatusExceptionManage',
          },
        ],
      },

      {
        path: '/InnerLink',
        component: 'InnerLink',
      },
    ],
  })
})

app.get('/system/user/list', (req, res) => {
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
app.get('/system/SchoolTeachingManage/list', (req, res) => {
  res.send({
    total: 22,
    rows: [
      {
        searchValue: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        params: {},
        id: 1,
        teacherId: '1',
        userName: 'admin',
        subjectName: '马克思主义',
        subjectId: 3,
        studyStage: '本科',
        grade: '大二',
        classId: '01 班',
        year: '2021',
      },
      {
        searchValue: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        params: {},
        id: 2,
        teacherId: '2',
        userName: 'admin',
        subjectName: '马克思主义',
        subjectId: 3,
        studyStage: '本科',
        grade: '大二',
        classId: '01 班',
        year: '2021',
      },
    ],
    code: 200,
    msg: '查询成功',
  })
})
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
