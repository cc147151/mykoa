const router = require('koa-router')()
const User = require('../models/userSchema')
router.get('/test', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
router.get('/test/children', async (ctx, next) => {
    console.log(ctx.query);
//     var parent = new User({ children: [{ name: 'user-role' }, { name: 'Sarah' }] })
//     parent.children[0].name = 'Matthew';

// // 但是**没有**保存文档。你需要 save 他的父文档
//     parent.save(function(err,res) {
//         console.log(err);
//         ctx.body ='okk'
//     });
    const res = await User.create({children: [{ name: 'user-role' }, { name: 'Sarah' }],userName:ctx.query.user,age:ctx.query.age})
    ctx.body =res
})

router.get('/test/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
