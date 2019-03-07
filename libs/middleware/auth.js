const config = require('config');
const { ckname } = config.get('cookie');
const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require("jsonwebtoken"));

async function LoginAccessRequired(ctx, next) {
  const cookie = ctx.cookies && ctx.cookies.get(ckname);
  if (!cookie) {
    return ctx.return(-1, {}, '用户未登录');
  }

  const value = await jwt.verifyAsync(cookie, '').catch(() => false);
  if (!value) {
    return ctx.return(-1, {}, '用户未登录');
  }
  await next();
}


module.exports = { LoginAccessRequired };