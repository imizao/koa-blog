const router = require('koa-router')();
const controller = require('../controller/c-reg')

// 注册页面
router.get('/reg', controller.getSignup)
// post 注册
router.post('/reg', controller.postSignup)

module.exports = router