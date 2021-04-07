// 1.安装koa,编写demo
// 2.koa-router 编写get、post...
// 3. 获取请求的参数：
// a:get请求:ctx.request.query
// b:post 请求需要借助koa-body中间件(app.use(koaBody())) ctx.request.body
// 4. @koa/cors不生效。。。。。
// 5. 使用koa-combine-routers组合@koa/router多个实例
// 6.koa-helmet中间件提供一个安全
// 7.使用koa-static访问静态资源图片
// 8.使用nodemon配置热服务，在package.json里配置启动服务
const path = require('path')
const Koa = require("koa");
const cors = require("@koa/cors");
const serve = require('koa-static');
// 组合@koa/router得多个实例
const router = require("./src/routes");
const koaBody = require("koa-body");
const app = new Koa();
// cors不生效。。。。。。。。。。。。。。
app.use(cors());
// koa-body要放在router之前
app.use(koaBody());
app.use(router());
app.use(serve(path.join(__dirname,'./assets/img')));
app.listen(3001);

// 单个得路由
// const Router = require("@koa/router");

// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
//     await next();
//    });
// const router = new Router({
//   prefix: "/mine",
// });
// app.use(async (ctx) => {
//   let res = await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("哇哈哈");
//     }, 2000);
//   });
//   ctx.body = res;
// });
// koa-router
// router.get("/getOne", async (ctx, next) => {
//   console.log(ctx);
//   console.log(ctx.request.query); // 获取get请求的参数
//   let res = await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(ctx.request.query);
//     }, 2000);
//   });
//   ctx.body = res;
// });
// router.post("/postOne", async (ctx, next) => {
//     console.log(ctx.request.body);
//   let res = await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(ctx.request.body);
//     }, 2000);
//   });
//   ctx.body = res;

// });
// app.use(router.routes()).use(router.allowedMethods());
