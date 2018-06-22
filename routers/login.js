const router = require('koa-router')();
const controller = require('../controller/c-login');

router.get('/login',controller.getLogin)
router.post('/login',controller.postLogin)

module.exports = router