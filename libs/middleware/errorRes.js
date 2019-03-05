const _ = require('lodash');

module.exports = async function resHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err == null) {
      err = new Error('Null or undefined error');
    }
    // some errors will have .status
    // however this is not a guarantee
    // 兼容标准的错误抛出方式 `ctx.throw(400, 'name required', { err_code: -5 });`
    ctx.status = err.status || 200;
    // ctx.type = 'application/json';
    ctx.body = _.extend({
      err_code: -3,
      msg: err.message
    }, _.omit(err, ['message', 'statusCode', 'expose']));
    ctx.app.emit('error', err, this);
  }
};