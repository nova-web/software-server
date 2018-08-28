const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    this.ctx.service.login(this.req.params);
  }
}

module.exports = LoginController;
