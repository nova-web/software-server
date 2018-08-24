const Controller = require('egg').Controller;

class UserController extends Controller {
  async list() {
    console.log('UserController...');
    const list = await this.ctx.service.user.getUser();
    this.ctx.body = list;
  }
}

module.exports = UserController;
