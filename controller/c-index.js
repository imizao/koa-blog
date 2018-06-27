const Mysql = require('../sql/mysql')
const moment = require('moment')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin
const md = require('markdown-it')();

exports.getRedirectIndex = async ctx => {
  ctx.redirect('/index')
}

exports.getIndex = async ctx => {
  let res,
    indexLength,
    name = decodeURIComponent(ctx.request.querystring.split('=')[1]);
  await Mysql.findPostByPage(1)
    .then(result => {
        res = result
    })
  await Mysql.findAllPost()
    .then(result => {
        indexLength = result.length
    })
  await ctx.render('index', {
    session: ctx.session,
    article: res,
    indexLength: indexLength,
    indexPageLength: Math.ceil(indexLength / 10),
  })
}

