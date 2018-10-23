const Service = require('egg').Service;
const formidable = require('formidable');

class ProductService extends Service {
  async parse(req) {
    const form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        console.log('parse', form);
        resolve({ fields, files });
      });
    });
  }

  async getProducts({ pageSize = this.app.config.pageSize, pageNum = 1, publishState, type, name } = {}) {
    let result = { count: 0, rows: [] };
    pageSize = Number.parseInt(pageSize);
    pageNum = Number.parseInt(pageNum);

    let products = await this.ctx.model.Product.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      limit: pageSize,
      where: { status: 1 }
    });

    result.count = products.count;
    products.rows.forEach(product => {
      // let roles = [];
      // product.roles.forEach(role => {
      //   roles.push(this.ctx.helper.pick(role, ['id', 'name']));
      // });
      // if (!roleId || roles.findIndex(item => item.id == roleId) !== -1) {
      //   result.rows.push(Object.assign(this.ctx.helper.pick(product, ['id', 'code', 'name', 'username', 'phone', 'email', 'updatedAt', 'status']), { roles }));
      // }
      result.rows.push(Object.assign(this.ctx.helper.pick(product, ['id', 'name', 'model', 'type', 'stage', 'fitPro', 'area', 'dept', 'productDesc', 'modelId', 'logo', 'updatedAt'])));
    });

    return result;
  }

  async addProduct() {
    // { name, model, type, stage, fitPro = [], area, dept, projectManager, productDesc, modelId, logo }
    console.log('addProduct');
    const extraParams = await this.parse(this.ctx.req);
    console.log('extraParams');

    if (await this.ctx.model.Product.findOne({ where: { modelId, status: { $in: [0, 1] } } })) {
      return { msg: 'modelId重复' };
    }

    let product = await this.ctx.model.Product.create({
      name,
      model,
      type,
      stage,
      fitPro: fitPro.join(','),
      area,
      dept,
      projectManager,
      productDesc,
      modelId,
      logo,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId
    });

    return { result: product };
  }

  async updateData(id, params) {
    let result = await this.ctx.model.Product.update({ ...params }, { where: { id } });
    return result[0];
  }

  async delData(id) {
    const result = await this.ctx.model.Product.destroy({ where: { id } });
    return result;
  }
}

module.exports = ProductService;
