const Controller = require('egg').Controller;

class AclController extends Controller {
  //查询所有数据 get
  async index() {
    const list = await this.ctx.service.acl.getAcls();
    this.ctx.success(list);
  }

  //新增数据 post
  async create() {
    const { result, msg = '参数不正确！' } = await this.ctx.service.acl.addAcl(this.ctx.request.body);
    if (result) {
      this.ctx.success({ id: result.id });
    } else {
      this.ctx.fail(msg);
    }
  }

  //更新数据 put
  async update() {
    const { length = 0, msg = '功能不存在！' } = await this.ctx.service.acl.updateAcl(this.ctx.params.id, this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //删除数据 delete
  async destroy() {
    const len = await this.ctx.service.acl.delData(this.ctx.params.id);
    if (len) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail('权限不存在！');
    }
  }
}

module.exports = AclController;
