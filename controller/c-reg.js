const userModel = require('../sql/mysql.js');
const md5 = require('md5')
const checkNotLogin = require('../middlewares/check.js').checkNotLogin
const checkLogin = require('../middlewares/check.js').checkLogin
const moment = require('moment');
const fs = require('fs')

exports.getSignup = async ctx => {
    await checkNotLogin(ctx)
    await ctx.render('reg', {
        session: ctx.session,
    })
}
exports.postSignup = async ctx => {
    let { name, password, repeatpass, avatar } = ctx.request.body
    await userModel.findDataByName(name)
        .then(async (result) => {
            console.log(result)
            if (result.length) {
                try {
                    throw Error('用户已经存在')
                } catch (error) {
                    //处理err
                    console.log(error)
                }
                // 返回前端，用户存在
                ctx.body = {
                    code: 500,
                    message: '用户存在'
                };;

            } else if (password !== repeatpass || password === '') {
                // 返回前端，密码不一致
                ctx.body = {
                    code: 500,
                    message: '两次输入的密码不一致'
                };
            } else {
                let base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
                let dataBuffer = new Buffer(base64Data, 'base64');
                let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now()
                let upload = await new Promise((reslove, reject) => {
                    fs.writeFile('./public/img/' + getName + '.png', dataBuffer, err => {
                        if (err) {
                            throw err;
                            reject(false)
                        };
                        reslove(true)
                        console.log('头像上传成功')
                    });
                })
                console.log('upload', upload)
                if (upload) {
                    await userModel.insertData([name, md5(password), getName + '.png', moment().format('YYYY-MM-DD HH:mm:ss')])
                        .then(res => {
                            console.log('注册成功res', res)
                            // 返回前端，注册成功
                            ctx.body = {
                                code: 200,
                                message: '注册成功'
                            };
                        })
                } else {
                    console.log('头像上传失败')
                    // 返回前端，头像上传失败
                    ctx.body = {
                        code: 500,
                        message: '头像上传失败'
                    }
                }
            }
        })
}