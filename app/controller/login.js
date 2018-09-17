const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    const result = await ctx.service.login.login(ctx.request.body);
    if (result) {
      ctx.session.user = result;
      console.log(ctx.session);
      ctx.success({ userId: result });
    } else {
      ctx.fail('用户名或密码错误');
    }
  }
}

module.exports = LoginController;
