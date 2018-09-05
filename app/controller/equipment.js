const Controller = require('egg').Controller;

class EquipmentController extends Controller {
  //查询所有数据 get
  async index() {
    const list = await this.ctx.service.equipment.getData();
    this.ctx.success(list);
  }

  //新增数据 post
  async create() {
    const id = await this.ctx.service.equipment.addData(this.ctx.request.body);
    this.ctx.success({ userId: id });
  }

  //更新数据 put
  async update() {
    const len = await this.ctx.service.equipment.updateData(this.ctx.params.id, this.ctx.request.body);
    if (len) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail('角色不存在！');
    }
  }

  //删除数据 delete
  async destroy() {
    const len = await this.ctx.service.equipment.delData(this.ctx.params.id);
    if (len) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail('角色不存在！');
    }
  }
}

module.exports = EquipmentController;
