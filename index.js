// 1.安装koa,编写demo
// 2.koa-router 编写get、post...
// 3. 获取请求的参数：
    // a:get请求:ctx.request.query
    // b:post 请求需要借助koa-body中间件(app.use(koaBody())) ctx.request.body
// 4. @koa/cors不生效。。。。。
const Koa = require("koa");
const cors = require('@koa/cors')
const Router = require("@koa/router");
const koaBody =require('koa-body')
const app = new Koa();
// cors不生效。。。。。。。。。。。。。。
app.use(cors());
// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
//     await next();
//    });
const router = new Router({
  prefix: "/mine",
});
// app.use(async (ctx) => {
//   let res = await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("哇哈哈");
//     }, 2000);
//   });
//   ctx.body = res;
// });
router.get("/getOne", async (ctx, next) => {
  console.log(ctx);
  console.log(ctx.request.query); // 获取get请求的参数
  let res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(ctx.request.query);
    }, 2000);
  });
  ctx.body = res;
});
router.post("/postOne", async (ctx, next) => {
    console.log(ctx.request.body);
  let res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(ctx.request.body);
    }, 2000);
  });
  ctx.body = res;
  
});
app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods());
app.listen(3001);
