const Controller = require('egg').Controller;

class RoleController extends Controller {
  //查询所有数据 get
  async index() {
    const list = await this.ctx.service.role.getRoles(this.ctx.request.query);
    this.ctx.success(list);
  }

  //新增数据 post
  async create() {
    const { result, msg = '参数不正确！' } = await this.ctx.service.role.addRole(this.ctx.request.body);
    if (result) {
      this.ctx.success({ id: result.id });
    } else {
      this.ctx.fail(msg);
    }
  }

  //更新数据 put
  async update() {
    const { length = 0, msg = '角色不存在！' } = await this.ctx.service.role.updateRole(this.ctx.params.id, this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //删除数据 delete
  async destroy() {
    const { length = 0, msg = '角色不存在！' } = await this.ctx.service.role.delRole(this.ctx.params.id);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //置为有效1无效0
  async setStatus() {
    const { length = 0, msg = '角色不存在！' } = await this.ctx.service.role.setStatus(this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //授权
  async setAuthorize() {
    const { length = 0, msg = '角色不存在！' } = await this.ctx.service.role.setAcls(this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //获取用户拥有的角色
  async getUserRoles() {
    const list = await this.ctx.service.role.getUserRoles();
    this.ctx.success(list);
  }

  //获取所有角色（根据角色筛选用户）
  async getRoles() {
    const list = await this.ctx.service.role.getRoles({ status: 1, pageSize: 1000 });
    this.ctx.success(list);
  }
}

module.exports = RoleController;
