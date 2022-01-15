const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

const koajwt = require("koa-jwt");

const router = require("koa-router")();
const test = require("./routes/test");
const users = require("./routes/users");
const roles = require("./routes/roles");
const menus = require("./routes/menu");
require("./config/db");
// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// 要放在use koajwt之前
app.use(async (ctx, next) => {
  await next().catch((err) => {
    console.log(ctx.header);
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "token过期",
      };
    } else {
      throw err;
    }
  });
});

app.use(
  koajwt({ secret: "sjy" }).unless({
    path: [/^\/api\/users\/login/, /^\/api\/test\/json/],
  })
);
// logger

router.prefix("/api");
router.use(users.routes(), users.allowedMethods());
router.use(test.routes(), test.allowedMethods());
router.use(roles.routes(), roles.allowedMethods());
router.use(menus.routes(), menus.allowedMethods());
// router.use(menus.routes(), menus.allowedMethods())

app.use(router.routes(), router.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  //   console.error('server error', err, ctx)
});

module.exports = app;
