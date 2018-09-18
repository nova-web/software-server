module.exports = options => {
  return async function firstmd(ctx, next) {
    console.log('middleware [checktoken]');
    if (ctx.request.header.token) {
      let token = ctx.request.header.token;
      try {
        ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
        ctx.cookies.set('token', token, { maxAge: ctx.app.config.jwt.exp * 1000 });
      } catch (error) {
        if (ctx.cookies.get('token') === token) {
          ctx.app.jwt.sign({ userId: ctx.cookies.get('userId') }, ctx.app.config.jwt.secret, { expiresIn: ctx.app.config.jwt.exp });
          ctx.cookies.set('token', token, { maxAge: ctx.app.config.jwt.exp * 1000 });
        } else {
          ctx.status = 401;
          ctx.fail('token失效');
          return;
        }
      } finally {
      }
      await next();
    } else {
      ctx.status = 401;
      ctx.fail('未授权');
      return;
    }
  };
};
