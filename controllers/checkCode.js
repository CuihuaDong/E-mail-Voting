const  userModel = require('../model/user');

module.exports = router => {
     router.get('/', async ctx => {
         const { name, code } = ctx.query;
         const user = userModel.findOne({name});
         if(!user || (user.date - Date.now())<0 || user.code !== code ) return ctx.return(204,'激活失败');
         user.isValid = true;
         user.save();
         ctx.return(200,'激活成功');

     })
}