const Controller = require('egg').Controller;

class PackageController extends Controller {
  //查询所有数据 get
  async index() {
    const list = await this.ctx.service.package.getPackages(this.ctx.request.query);
    this.ctx.success(list);
  }

  //新增数据 post
  async create() {
    const { result, msg = '参数不正确！' } = await this.ctx.service.package.addPackage(this.ctx.request.body);
    if (result) {
      this.ctx.success({ id: result.id });
    } else {
      this.ctx.fail(msg);
    }
  }

  //更新数据 put
  async update() {
    const { length = 0, msg = '版本不存在！' } = await this.ctx.service.package.updatePackage(this.ctx.params.id);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //删除数据 delete
  async destroy() {
    const len = await this.ctx.service.package.delPackage(this.ctx.params.id);
    if (len) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail('Package不存在！');
    }
  }

  //获取最新版本列表/版本
  async newlist() {
    const list = await this.ctx.service.package.newlist(this.ctx.request.query);
    this.ctx.success(list);
  }

  //试用
  async tryout() {
    const { length = 0, msg = '操作异常' } = await this.ctx.service.package.tryout(this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //撤回
  async withdraw() {
    const { length = 0, msg = '操作异常' } = await this.ctx.service.package.withdraw(this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //发布
  async publish() {
    const { length = 0, msg = '操作异常' } = await this.ctx.service.package.publish(this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //下架
  async obtained() {
    const { length = 0, msg = '操作异常' } = await this.ctx.service.package.obtained(this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //新增版本表单校验
  async preAdd() {
    const { result, msg = '参数不正确！' } = await this.ctx.service.package.preAddPackage();
    if (result) {
      this.ctx.success(result);
    } else {
      this.ctx.fail(msg);
    }
  }

  //修改版本表单校验
  async preUpdate() {
    const { result, msg = '参数不正确！' } = await this.ctx.service.package.preUpdatePackage(this.ctx.params.id);
    if (result) {
      this.ctx.success(result);
    } else {
      this.ctx.fail(msg);
    }
  }
}

module.exports = PackageController;
