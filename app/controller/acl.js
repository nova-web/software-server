const Controller = require('egg').Controller;

class AclController extends Controller {
  //查询所有数据 get
  async index() {
    const list = await this.ctx.service.acl.getAcls(this.ctx.request.query);
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
    const { length = 0, msg = '权限不存在！' } = await this.ctx.service.acl.updateAcl(this.ctx.params.id, this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //删除数据 delete
  async destroy() {
    const { length = 0, msg = '权限不存在！' } = await this.ctx.service.acl.delAcl(this.ctx.params.id);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //置为有效1无效0
  async setStatus() {
    const { length = 0, msg = '权限不存在！' } = await this.ctx.service.acl.setStatus(this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  async getUserAclTree() {
    const list = await this.ctx.service.acl.getUserAclTree();
    this.ctx.success(list);
  }

  async getUserAclCodes() {
    const list = await this.ctx.service.acl.getUserAclCodes(this.ctx.request.body);
    this.ctx.success(list);
  }

  async getRoleAcls() {
    const list = await this.ctx.service.acl.getRoleAcls(this.ctx.request.query);
    this.ctx.success(list);
  }
}

module.exports = AclController;
