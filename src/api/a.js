module.exports = function (ctx) {
    console.log(ctx.request.query);
  ctx.body = {
      code:200,
      data:{name:'sss'}
  };
};
