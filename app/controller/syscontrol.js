const Controller = require('egg').Controller;

class SysControlController extends Controller {
  //查询所有数据 get
  async index() {
    const list = await this.ctx.service.syscontrol.getProducts();
    this.ctx.success(list);
  }

  async update() {
    const { length = 0, msg = '产品不存在' } = await this.ctx.service.syscontrol.updateProduct(this.ctx.params.id, this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }
}

module.exports = SysControlController;
