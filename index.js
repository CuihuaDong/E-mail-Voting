const koa= require("koa");
const Router = require('koa-router');
const http = require('http');
const errorRes = require('./libs/middleware/errorRes');
const returnRes = require('./libs/middleware/returnRes');
const bodyParser = require('koa-bodyparser');
const adapt = require('koa-adapter-bluebird'); 

const app = new koa()

app.use(errorRes);
app.use(returnRes);
app.use(adapt(bodyParser()));

const routes = require('require-all')({dirname: `${__dirname}/controllers`});
Object.keys(routes).forEach( value => {
    const route = routes[value];
    const  router = new Router({prefix: `/${value}`});
    route(router);
    app.use(router.routes());
})

const server = http.createServer(app.callback());

if(!module.parent) {
    server.listen(3000);
    server.on('listening', () => {
        console.log('Server listening on http://localhost:%d', server.address().port);
    });
}