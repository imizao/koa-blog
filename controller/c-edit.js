const Mysql = require('../sql/mysql')
const moment = require('moment')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin
const md = require('markdown-it')();

exports.getEdit = async ctx => {
  await ctx.render('edit',{
    session: ctx.session
  })
  console.log(ctx.session);
}

exports.postEdit = async ctx => {
  let {title,content} = ctx.request.body,
    id = ctx.session.id,
    name = ctx.session.user,
    time = moment().format('YYYY-MM-DD HH:mm:ss'),
    avatar,
    newContent = content.replace(/[<">']/g, (target) => {
      return {
        '<': '&lt;',
        '"': '&quot;',
        '>': '&gt;',
        "'": '&#39;'
      }[target]
    }),
    newTitle = title.replace(/[<">']/g, (target) => {
      return {
        '<': '&lt;',
        '"': '&quot;',
        '>': '&gt;',
        "'": '&#39;'
      }[target]
    });
  
  await Mysql.findUserData(ctx.session.user)
    .then(res => {
      avatar = res[0]['avatar']
     console.log(res);
    })
  await Mysql.insertPost([name, newTitle, md.render(content), content, id, time, avatar])
    .then(() => {
      ctx.body = {
        code: 200,
        message: '发表文章成功'
      }
    }).catch(() => {
      ctx.body = {
        code: 500,
        massage: '发表文章失败'
      }
    })
}