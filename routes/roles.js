const router = require("koa-router")();
const Role = require("../models/roleSchema");
// const User = require("../models/userSchema");

const util = require("../utils/util");
router.get("/roles/allList", async (ctx) => {
  try {
    const list = await Role.find({}, "_id roleName");
    ctx.body = util.success({
      data: {
        list,
      },
    });
  } catch (error) {
    ctx.body = util.fail({ msg: `查询异常:${error.stack}` });
  }
});
router.get("/roles/list", async (ctx) => {
  const { page, skipIndex } = util.pager(ctx.request.query);
  try {
    const query = Role.find({});
    const list = await query.skip(skipIndex).limit(page.pageSize);
    const total = await Role.countDocuments({});
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
// 菜单编辑、删除、新增功能
router.post("/roles/operate", async (ctx) => {
  const { _id, action, ...params } = ctx.request.body;
  let res, info;
  try {
    if (action == "add") {
      params.createTime = Date.now();
      res = await Role.create(params);
      info = "创建成功";
    } else if (action == "edit") {
      params.updateTime = new Date();
      res = await Role.findByIdAndUpdate(_id, params);
      info = "编辑成功";
    } else {
      res = await Role.findByIdAndRemove(_id);
      info = "删除成功";
    }
    ctx.body = util.success({ msg: info });
  } catch (error) {
    ctx.body = util.fail({ msg: error });
  }
});
router.post("/roles/permission", async (ctx) => {
  const { _id, permissionList } = ctx.request.body;
  const updateTime = Date.now();
  const res = await Role.findByIdAndUpdate(_id, { permissionList, updateTime });
  ctx.body = util.success({ msg: "分配成功" });
});
router.get("/dept/list", (ctx) => {
  ctx.body = {
    code: 200,
    data: [
      {
        parentId: [null],
        updateTime: "2021-01-31T08:53:37.418Z",
        createTime: "2021-01-31T08:53:37.418Z",
        _id: "60167059c9027b7d2c520a61",
        deptName: "橘子皮",
        userId: "1000002",
        userName: "admin",
        userEmail: "admin@imooc.com",
        __v: 0,
        children: [
          {
            parentId: ["60167059c9027b7d2c520a61"],
            updateTime: "2021-01-31T09:03:23.337Z",
            createTime: "2021-01-31T09:03:23.337Z",
            _id: "6016728fc6a4417f2d27506e",
            deptName: "研发部门",
            userId: "1000003",
            userName: "jack",
            userEmail: "jack@imooc.com",
            __v: 0,
            children: [
              {
                parentId: [
                  "60167059c9027b7d2c520a61",
                  "6016728fc6a4417f2d27506e",
                ],
                updateTime: "2021-02-01T13:05:06.188Z",
                createTime: "2021-01-31T09:19:09.081Z",
                _id: "60167621531124822b79e124",
                deptName: "JAVA小组-1",
                userId: "1000010",
                userName: "Tim",
                userEmail: "Tim@imooc.com",
                __v: 0,
              },
            ],
          },
          {
            parentId: ["60167059c9027b7d2c520a61"],
            updateTime: "2021-02-21T12:44:16.249Z",
            createTime: "2021-01-31T09:03:23.337Z",
            _id: "60167345c6a4417f2d27506f",
            deptName: "前端部门",
            userId: "1000004",
            userName: "tom",
            userEmail: "tom@imooc.com",
            __v: 0,
          },
          {
            parentId: ["60167059c9027b7d2c520a61"],
            updateTime: "2021-01-31T09:03:23.337Z",
            createTime: "2021-01-31T09:03:23.337Z",
            _id: "6016734ec6a4417f2d275070",
            deptName: "测试部门",
            userId: "1000005",
            userName: "Lucy",
            userEmail: "Lucy@imooc.com",
            __v: 0,
          },
          {
            parentId: ["60167059c9027b7d2c520a61"],
            updateTime: "2021-01-31T09:03:23.337Z",
            createTime: "2021-01-31T09:03:23.337Z",
            _id: "6016735ac6a4417f2d275071",
            deptName: "UED部门",
            userId: "1000006",
            userName: "Jim",
            userEmail: "Jim@imooc.com",
            __v: 0,
          },
          {
            parentId: ["60167059c9027b7d2c520a61"],
            updateTime: "2021-01-31T09:03:23.337Z",
            createTime: "2021-01-31T09:03:23.337Z",
            _id: "60167375c6a4417f2d275072",
            deptName: "大数据部门",
            userId: "1000007",
            userName: "MaLi",
            userEmail: "MaLi@imooc.com",
            __v: 0,
          },
          {
            parentId: ["60167059c9027b7d2c520a61"],
            updateTime: "2021-02-01T14:06:49.922Z",
            createTime: "2021-02-01T14:06:49.922Z",
            _id: "60180ce5b1eaed6c45fbebe5",
            deptName: "市场部门",
            userId: "1000011",
            userName: "Baidu",
            userEmail: "Baidu@imooc.com",
            __v: 0,
          },
          {
            parentId: ["60167059c9027b7d2c520a61"],
            updateTime: "2021-02-01T14:06:49.922Z",
            createTime: "2021-02-01T14:06:49.922Z",
            _id: "6018119bb1eaed6c45fbebe6",
            deptName: "运营部门",
            userId: "1000012",
            userName: "TengXun",
            userEmail: "TengXun@imooc.com",
            __v: 0,
          },
          {
            parentId: ["60167059c9027b7d2c520a61"],
            updateTime: "2021-02-01T14:06:49.922Z",
            createTime: "2021-02-01T14:06:49.922Z",
            _id: "601811dfb1eaed6c45fbebe7",
            deptName: "运维部门",
            userId: "1000014",
            userName: "Apple",
            userEmail: "Apple@imooc.com",
            __v: 0,
          },
          {
            parentId: ["60167059c9027b7d2c520a61"],
            updateTime: "2021-02-18T16:29:35.671Z",
            createTime: "2021-02-18T16:29:35.671Z",
            _id: "602f0e679aac702f1dc8b0f3",
            deptName: "人事部",
            userId: "1000011",
            userName: "Baidu",
            userEmail: "Baidu@imooc.com",
            __v: 0,
          },
          {
            parentId: ["60167059c9027b7d2c520a61"],
            updateTime: "2021-02-18T16:29:35.671Z",
            createTime: "2021-02-18T16:29:35.671Z",
            _id: "602f0e779aac702f1dc8b0f4",
            deptName: "财务部",
            userId: "1000013",
            userName: "Ali",
            userEmail: "Ali@imooc.com",
            __v: 0,
          },
        ],
      },
    ],
  };
});
module.exports = router;
