const combineRouters = require("koa-combine-routers");
const a = require("./aRoute");
const b = require("./bRoute");
module.exports = combineRouters(a, b);
