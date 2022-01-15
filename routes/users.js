const router = require("koa-router")();
const User = require("../models/userSchema");
const Counter = require("../models/counterSchema");
const jwt = require("jsonwebtoken");
const util = require("../utils/util");
router.prefix("/users");
router.post("/login", async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body;
    console.log(userName, userPwd);
    const res = await User.findOne(
      {
        userName,
        userPwd,
      },
      "userId userName"
    );
    if (res) {
      const data = res._doc;

      const token = jwt.sign(
        {
          data,
        },
        "sjy",
        { expiresIn: "1h" }
      );
      data.token = token;
      // 解密
      // jwt.verify(token,'sjy',(err,data1)=>{
      //     console.log(err)
      //     console.log(data1,'ss')
      //
      // })
      ctx.body = util.success({ data });
    } else {
      ctx.body = util.fail({ msg: "账号或密码不正确" });
    }
  } catch (error) {
    ctx.body = util.fail({ data: error });
  }
});
// 用户列表
router.get("/list", async (ctx) => {
  const { userId, userName, state } = ctx.request.query;
  const { page, skipIndex } = util.pager(ctx.request.query);
  let params = {};
  if (userId) params.userId = userId;
  if (userName) params.userName = userName;
  if (state && state != "0") params.state = state;
  try {
    // 根据条件查询所有用户列表

    const query = User.find(params, { _id: 0, userPwd: 0 });
    const list = await query.skip(skipIndex).limit(page.pageSize);
    const total = await User.countDocuments(params);

    ctx.body = util.success({
      data: {
        page: {
          ...page,
          total,
        },
        list,
      },
    });
  } catch (error) {
    ctx.body = util.fail({ msg: `查询异常:${error.stack}` });
  }
});
// 用户新增/编辑
router.post("/operate", async (ctx) => {
  const {
    userId,
    userName,
    userEmail,
    mobile,
    job,
    state,
    roleList,
    deptId,
    action,
  } = ctx.request.body;
  if (action == "add") {
    if (!userName || !userEmail) {
      ctx.body = util.fail({ msg: "参数错误" });
      return;
    }
    const res = await User.findOne(
      { $or: [{ userName }, { userEmail }] },
      "_id userName userEmail"
    );
    if (res) {
      ctx.body = util.fail({
        msg: `系统监测到有重复的用户，信息如下：${res.userName} - ${res.userEmail}`,
      });
    } else {
      const doc = await Counter.findOneAndUpdate(
        { _id: "userId" },
        { $inc: { sequence_value: 1 } },
        { new: true }
      );
      try {
        const user = new User({
          userId: doc.sequence_value,
          userName,
          userPwd: "123",
          userEmail,
          role: 1, //默认普通用户
          roleList,
          job,
          state,
          deptId,
          mobile,
        });
        user.save();
        ctx.body = util.success("", "用户创建成功");
      } catch (error) {
        ctx.body = util.fail(error.stack, "用户创建失败");
      }
    }
  } else {
    if (!deptId) {
      ctx.body = util.fail({ msg: "部门不能为空", code: 4001 });
      return;
    }
    try {
      const res = await User.findOneAndUpdate(
        { userId },
        { mobile, job, state, roleList, deptId }
      );
      console.log(res);
      ctx.body = util.success({ msg: "更新成功" });
    } catch (error) {
      ctx.body = util.fail({ msg: error });
    }
  }
});
// 用户删除/批量删除
router.post("/delete", async (ctx) => {
  // 待删除的用户Id数组
  const { userIds } = ctx.request.body;
  // User.updateMany({ $or: [{ userId: 10001 }, { userId: 10002 }] })
  const res = await User.updateMany(
    { userId: userIds },
    { $set: { state: 2 } }
  );
  if (res) {
    ctx.body = util.success({ msg: `共删除成功${res.nModified}条` });
    return;
  }
  ctx.body = util.fail("删除失败");
});
router.get("/profile", (ctx) => {
  ctx.body = {
    code: 200,
    data: {
      role: [
        {
          id: "1",
          title: "超级管理员",
        },
      ],
      _id: "612710a0ec87aa543c9c341d",
      id: "0",
      username: "super-admin",
      title: "超级管理员",
      avatar:
        "https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png",
      permission: {
        menus: [
          "userManage",
          "roleList",
          "permissionList",
          "articleRanking",
          "articleCreate",
        ],
        points: [
          "distributeRole",
          "importUser",
          "removeUser",
          "distributePermission",
        ],
      },
    },
  };
});
module.exports = router;
