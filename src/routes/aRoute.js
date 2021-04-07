let path = require("path");
let a = require(path.join(__dirname, "..", "api/a.js"));
const Router = require("@koa/router");
const router = new Router();
router.get("/a", a);
module.exports=router
