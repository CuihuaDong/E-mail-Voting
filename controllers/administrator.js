const candidateModel = require('../model/candidate')

module.exports = async (router) => {
    router.post('/',async ctx => {
        const { name }  = ctx.request.body;
        const result =  await candidateModel.findOne({name});
        if(result) return ctx.return(208,'候选人已存在');
        await candidateModel.create(ctx.request.body);
        
        ctx.return(200,{},'success');
       
    })

    router.put('/:id', async ctx => {
        const candidate = await candidateModel.findById(ctx.params.id)
                          .populate({path:'activity',select:'startDate endDate'});
        if(!candidate) return ctx.return(404,'')
    })
}