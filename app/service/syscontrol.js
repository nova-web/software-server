const Service = require('egg').Service;

class SysControlService extends Service {
  async getProducts({ pageSize = this.app.config.pageSize, pageNum = 1, name, service = 1 } = {}) {
    let result = { count: 0, rows: [] };
    pageSize = Number.parseInt(pageSize);
    pageNum = Number.parseInt(pageNum);

    let products = await this.ctx.model.Product.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      limit: pageSize,
      where: {
        status: 1,
        service,
        ...this.ctx.helper.whereAndLike({ name })
      }
    });

    result.count = products.count;
    products.rows.forEach(product => {
      result.rows.push(this.ctx.helper.pick(product, ['id', 'name', 'service', 'serviceTime']));
    });

    return result;
  }

  async updateProduct(id, { service }) {
    let params = {
      service,
      serviceTime: new Date()
    };

    let result = await this.ctx.model.Product.update(params, { where: { id, status: 1 } });
    return { length: result[0] };
  }
}

module.exports = SysControlService;
