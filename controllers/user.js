const userModel = require("../model/user")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { ckexpiration, ckname } = config.get('cookie');
const moment = require('moment')


module.exports = (router) => {
     // 注册
     router.post('/',async (ctx) => {
         
         const { name,email,password } = ctx.request.body;
         const user = await userModel.findOne({email});
         const isCorrectEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
         if(!isCorrectEmail) return ctx.return(403,'邮箱格式错误','faild')         
         if(user) return ctx.return(403,'邮箱已被注册','faild');
         const encodePass = await bcrypt.hash(password,10);
        const user =  await userModel.create({
             name,
             email,
             encodePass
         });
         ctx.return(200,user,'success')
     } )
     //登陆
     router.post('/sessions', async ctx => {
         const { name, password } = ctx.request.body;
         const user = await userModel.findOne({name,password});
         if(!user) return ctx.return(404,`用户{user.name}不存在`,'faild');
         const isCorrectPass = await bcrypt.bcryptcompareSync(user.password,password)
         if(!isCorrectPass) return ctx.return(401,'密码错误','faild');
         const expireAt = moment().add(ckexpiration,'seconds').toDate();
         const cookie = jwt.sign({name},'abcdef',{ algorithm: 'RS256', expiresIn: `${ckexpiration} seconds` })
         ctx.cookies.set(ckname,cookie, {
             expires: new Date(expireAt),
             signed:false,
             httpOnly:true
         })
         ctx.return(200,'登陆成功','success');
     })
    // 投票
    router.post('/:id',async ctx => {         
        const { activity,email} = ctx.request.body;
        const userinfo = await userModel.findOne({email})         
        ctx.return(200,userinfo,'success')
        
    })
}