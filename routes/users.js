const router = require('koa-router')()
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const util = require('../utils/util')
router.prefix('/users')
router.post('/login',async(ctx)=>{
    try {
        const {userName, userPwd} = ctx.request.body
        console.log(userName,userPwd)
        const res = await User.findOne({
            userName,
            userPwd
        },"userId userName")
        if(res){
            const data = res._doc;

            const token = jwt.sign({
              data
            }, 'sjy', { expiresIn: '1h' })
            data.token = token;
            // 解密
            // jwt.verify(token,'sjy',(err,data1)=>{
            //     console.log(err)
            //     console.log(data1,'ss')
            //     
            // })
            ctx.body = util.success({data})
        } else {
            ctx.body= util.fail({data:{msg:'账号或密码不正确'}})
        }
    } catch (error) {
        ctx.body=util.fail({data:error})
    }
})

// 用户列表
router.get('/list', async (ctx) => {
    const { userId, userName, state } = ctx.request.query;
    const { page, skipIndex } = util.pager(ctx.request.query)
    let params = {}
    if (userId) params.userId = userId;
    if (userName) params.userName = userName;
    if (state && state != '0') params.state = state;
    try {
      // 根据条件查询所有用户列表
      
      const query = User.find(params, { _id: 0, userPwd: 0 })
      const list = await query.skip(skipIndex).limit(page.pageSize)
      const total = await User.countDocuments(params);
  
      ctx.body = util.success({
        data:{
            page: {
                ...page,
                total
              },
            list
        }
      })
    } catch (error) {
      ctx.body = util.fail({msg:`查询异常:${error.stack}`})
    }
  })
module.exports = router
