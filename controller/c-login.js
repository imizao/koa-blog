const Mysql = require('../sql/mysql')
const md5 = require('md5')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin

exports.getLogin = async ctx => {
  await checkNotLogin(ctx)
  await ctx.render('login',{
    session: ctx.session,
  })
}

exports.postLogin = async ctx => {
  let {name, password} = ctx.request.body
  await Mysql.findDataByName(name)
    .then(result => {
      let res = result
      if (res.length && name === res[0]['name'] && md5(password) === res[0]['pass']) {
        ctx.session = {
          user: res[0]['name'],
          id: res[0]['id']
        }
        ctx.body = {
          code: 200,
          message: '登录成功'
        }
        console.log('ctx.session.id',ctx.session.id)
        console.log('session',ctx.session)
        console.log('登录成功')
      }else{
        ctx.body = {
          code: 500,
          message: '用户名或密码错误'
        }
        console.log('用户名或密码错误！')
      }
    }).catch(err => {
      console.log(err)
    })
}