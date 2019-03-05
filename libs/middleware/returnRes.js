module.exports = async (ctx, next) => {
    ctx.return = (err_code, data, message) => {
      ctx.status = 200;
      const ctxBody = {
        err_code
      };
  
      if (typeof data === 'string') {
        ctxBody.msg = data;
      } else {
        ctxBody.data = data;
        if (data.root) { 
          Object.assign(ctxBody, data.root);
          delete ctxBody.data.root;
        }
        if (message) {
          ctxBody.msg = message;
        }
      }
      ctx.body = ctxBody;
    };
    await next();
  };