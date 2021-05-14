
let koa = require('koa');
let fs = require('fs');
let path = require('path');
let serve = require('koa-static');
let bodyParser = require('koa-bodyparser');

let router = require('./router.js');
const db = require('./models/index.js');

const port = 3000;


// server
let app = new koa();
app
  .use(serve(path.join(__dirname, 'public')))
  .use(bodyParser())
  .use(router.routes());


(async function bootstrap () {
  await db.sequelize.sync();
  //console.log('db is connected');
  app.listen(3000);
})();

