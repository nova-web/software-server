const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const list = await this.ctx.service.user.getUser();
    this.ctx.success(list);
  }

  async new() {
    this.ctx.success('new-' + this.ctx.params.id);
  }

  async show() {
    this.ctx.success('show-' + this.ctx.params.id);
  }

  async edit() {
    this.ctx.success('edit-' + this.ctx.params.id);
  }

  //新增数据 post
  async create() {
    const id = await this.ctx.service.user.addUser();
    this.ctx.success({ userId: id });
  }

  //更新数据 put
  async update() {
    const id = await this.ctx.service.user.addUser();
    this.ctx.success('update-' + this.ctx.params.id);
  }

  //更新数据 delete
  async destroy() {
    const userId = await this.ctx.service.user.delUser(this.ctx.params.id);
    this.ctx.success({ userId });
  }
}

module.exports = UserController;
