module.exports = options => {
  return async function firstmd(ctx, next) {
    console.log('middleware [checktoken]');
    let reqToken = ctx.request.header.token;
    let cookieToken = ctx.cookies.get('token');
    if (reqToken) {
      if (reqToken === cookieToken) {
        try {
          console.log('try');
          ctx.app.jwt.verify(reqToken, ctx.app.config.jwt.secret);
          ctx.cookies.set('token', cookieToken, { maxAge: ctx.app.config.jwt.exp * 1000 });
        } catch (error) {
          console.log('catch');
          ctx.app.jwt.sign({ userId: ctx.cookies.get('userId') }, ctx.app.config.jwt.secret, { expiresIn: ctx.app.config.jwt.exp });
          ctx.cookies.set('token', cookieToken, { maxAge: ctx.app.config.jwt.exp * 1000 });
        }
        await next();
      } else {
        ctx.status = 401;
        ctx.fail('token失效');
        return;
      }
    } else {
      ctx.status = 401;
      ctx.fail('未授权');
      return;
    }
  };
};
