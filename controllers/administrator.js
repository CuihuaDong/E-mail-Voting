const candidateModel = require('../model/candidate')

module.exports = async (router) => {
    router.post('/',async ctx => {
        const { name }  = ctx.request.body;
        const result =  await candidateModel.findOne({name})
        .populate({path:'activity', select:'startDate endDate'});
        const { startDate, endDate } = candidate.activity;
        const today = new Date();
        if(taday<endDate&&today>startDate) return ctx.return(209,`投票已开始无法进行编辑${startDate}-${endDate}`,'faild');
        if(result) return ctx.return(208,'候选人已存在');
        await candidateModel.create(ctx.request.body);
        
        ctx.return(200,{},'success');
       
    })

    router.put('/:id', async ctx => {
        const candidate = await candidateModel.findById(ctx.params.id)
                          .populate({path:'activity',select:'startDate endDate'})
                          .lean();
         if(!candidate) return ctx.return(404,'参选人不存在');
             
         const { startDate, endDate } = candidate.activity;
         const today = new Date();
         if(taday<endDate&&today>startDate) return ctx.return(209,`投票已开始无法进行编辑${startDate}-${endDate}`,'faild');         
         Object.assign(candidate, ctx.request.body);
         await candidate.save();
        
        ctx.return(200,'操作成功')
    })
}