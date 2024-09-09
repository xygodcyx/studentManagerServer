const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('hello world'))

router.get('/getInfo', (req, res) => {
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

router.post('/logout', (req, res) => {
  res.send({ code: 200, message: '获取成功', data: { a: 1 } })
})

router.get('/captchaImage', (req, res) => {
  res.send({ code: 200, message: '获取成功', data: { a: 1 } })
})

router.get('/getRouters', (req, res) => {
  res.send({
    code: 200,
    message: '获取成功',
    data: [
      {
        path: '/index',
        meta: { title: '任课管理' },
        component: 'Layout',
        children: [
          {
            path: 'SchoolTeachingManage',
            meta: { title: '任课管理' },
            component: 'system/SchoolTeachingManage',
          },
        ],
      },
      {
        path: '/index',
        meta: { title: '新闻管理' },
        component: 'Layout',
        children: [
          {
            path: 'campusNews',
            meta: { title: '新闻管理' },
            component: 'system/campusNews',
          },
        ],
      },
      {
        path: '/index',
        meta: { title: '状态异常管理' },
        component: 'Layout',
        children: [
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

module.exports = router
