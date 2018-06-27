const router = require('koa-router')();
const controller = require('../controller/c-edit')

router.get('/edit', controller.getEdit)
router.post('/edit', controller.postEdit)

module.exports = router