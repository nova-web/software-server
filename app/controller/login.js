const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;

    if (username === 'admin' && password === this.app.config.adminPassword) {
      let userId = 0;
      let token = app.jwt.sign({ userId, name: '超级管理员' }, ctx.app.config.jwt.secret, { expiresIn: ctx.app.config.jwt.exp });
      this.ctx.cookies.set(`user-${userId}`, token, { maxAge: ctx.app.config.jwt.exp * 1000, encrypt: true });
      ctx.success({
        username: 'admin',
        name: '超级管理员',
        token: token
      });
      return;
    }

    const result = await ctx.service.login.login(ctx.request.body);
    if (result && result.username === username) {
      let token = app.jwt.sign({ userId: result.id, name: result.name }, ctx.app.config.jwt.secret, { expiresIn: ctx.app.config.jwt.exp });
      this.ctx.cookies.set(`user-${result.id}`, token, { maxAge: ctx.app.config.jwt.exp * 1000, encrypt: true });

      // 调用 rotateCsrfSecret 刷新用户的 CSRF token
      // ctx.rotateCsrfSecret();

      ctx.success(Object.assign(result.dataValues, { token }));
    } else {
      ctx.fail('用户名或密码错误');
    }
  }
}

module.exports = LoginController;
