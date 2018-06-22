const Mysql = require('../sql/mysql')
const moment = require('moment')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin
const md = require('markdown-it')();

exports.getRedirectIndex = async ctx => {
  ctx.redirect('/index')
}

exports.getIndex = async ctx => {
  await ctx.render('index',{
    session: ctx.session
  })
  console.log(ctx.session);
}