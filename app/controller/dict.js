const Controller = require('egg').Controller;

class DictController extends Controller {
  //查询所有数据 get
  async getDict() {
    const list = await this.ctx.model.Dict.findAll();
    // let dict = {};
    // list.forEach(item => {
    //   if (!dict[item.type]) {
    //     dict[item.type] = {};
    //   }
    //   dict[item.type][item.code] = item.name;
    // });
    this.ctx.success(list);
  }
}

module.exports = DictController;
