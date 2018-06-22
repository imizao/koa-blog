const router = require('koa-router')();
const controller = require('../controller/c-index')

router.get('/', controller.getRedirectIndex)
router.get('/index', controller.getIndex)

module.exports = router