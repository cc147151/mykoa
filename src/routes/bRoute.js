let path = require("path");
let b = require(path.join(__dirname, "..", "api/b.js"));
const Router = require("@koa/router");
const router = new Router();
router.post("/b", b);
module.exports=router