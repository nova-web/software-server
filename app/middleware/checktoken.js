module.exports = options => {
  return async function checktoken(ctx, next) {
    console.log('middleware [checktoken]');
    let token = ctx.request.header.token;
    if (token) {
      let payload = ctx.app.jwt.decode(token);
      if (!payload) {
        ctx.status = 401;
        ctx.fail('无效token');
        return;
      }

      let userToken = ctx.cookies.get(`user-${payload.userId}`, { encrypt: true });
      if (token === userToken) {
        try {
          ctx.userId = payload.userId;
          ctx.name = payload.name;
          ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
          ctx.cookies.set(`user-${payload.userId}`, token, { maxAge: ctx.app.config.jwt.exp * 1000, encrypt: true });
        } catch (error) {
          ctx.app.jwt.sign({ userId: payload.userId }, ctx.app.config.jwt.secret, { expiresIn: ctx.app.config.jwt.exp });
          ctx.cookies.set(`user-${payload.userId}`, token, { maxAge: ctx.app.config.jwt.exp * 1000, encrypt: true });
        }
      } else {
        ctx.status = 401;
        ctx.fail('token失效');
        return;
      }
      await next();
    } else {
      ctx.status = 401;
      ctx.fail('未授权');
      return;
    }
  };
};
