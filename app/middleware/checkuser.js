module.exports = options => {
  return async function checkuser(ctx, next) {
    console.log('middleware [checkuser]');

    if (ctx.userId == 0) {
      await next();
    } else {
      let user = await ctx.model.User.findById(ctx.userId);
      if (user && user.status == 1) {
        await next();
      } else {
        ctx.status = 401;
        ctx.fail('无效用户');
      }
    }
  };
};
