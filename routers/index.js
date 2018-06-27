const router = require('koa-router')();
const controller = require('../controller/c-index')

router.get('/', controller.getRedirectIndex)
router.get('/index', controller.getIndex)
//router.post('/index',controller.postIndex)

module.exports = router