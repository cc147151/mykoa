const mongoose = require("mongoose");
const roleSchema = mongoose.Schema({
  roleName: String,
  remark: String,
  permissionList: {
    checkedKeys: [],
    menuCodeArr: [],
    menu: [],
  },
  createTime: {
    type: Date,
    default: Date.now(),
  },
  updateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("role", roleSchema);
