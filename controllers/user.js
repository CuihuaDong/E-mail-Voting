const userModel = require("../model/user");
const candidateModel = require("../model/candidate")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { ckexpiration, ckname } = config.get('cookie');
const moment = require('moment');
const sendMail = require('../libs/service');


module.exports = (router) => {
     // 注册
     router.post('/',async (ctx) => {
         
         const { name,email,password } = ctx.request.body;
         const user = await userModel.findOne({email});
         const isCorrectEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
         if(!isCorrectEmail) return ctx.return(403,'邮箱格式错误','faild')         
         if(user) return ctx.return(403,'邮箱已被注册','faild');
         const encodePass = await bcrypt.hash(password,10);
         const code = Math.floor(Math.random()*(9999-1000))+min;
        const user =  await userModel.create({
             name,
             email,
             encodePass,
             code
         });
         await sendMail({
            {
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: "bar@example.com, baz@example.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>"
         })
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
        const {email,votes} = ctx.request.body;
        const user  = await userModel.findOne({email});
        if(!user) return ctx.return(404,'用户不存在','faild');
        const candidate = await candidateModel.findOne({voters:email})
                        .populate({path:'activity', select:'startDate endDate'});
        if(candidate) return ctx.return(208,'不能重复投票','faild');
        const { startDate, endDate } = candidate.activity;
        const today = new Date();
        if(taday>endDate || today<startDate) return ctx.return(209,`不在投票范围内${startDate}-${endDate}`,'faild')
         //await candidateModel.update({_id: ctx.params.id},{ '$push':{ voters:email } }) 
         candidate.totalNumOfVotes = candidate.totalNumOfVotes + votes;
         candidate.voters = candidate.voters.push(email)
         candidate.save();
        ctx.return(200,candidate,'success')
        
    })
}