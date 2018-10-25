const Service = require('egg').Service;

class ProductService extends Service {
  async getAllProducts() {
    return await this.ctx.model.Product.findAll({ where: { status: 1 } }).map(item => ({ id: item.id, name: item.name }));
  }

  async getProducts({ pageSize = this.app.config.pageSize, pageNum = 1, publishState, type, name } = {}) {
    let result = { count: 0, rows: [] };
    pageSize = Number.parseInt(pageSize);
    pageNum = Number.parseInt(pageNum);

    let productsAll = await this.getAllProducts();
    let products = await this.ctx.model.Product.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      limit: pageSize,
      where: { status: 1 },
      include: [
        {
          model: this.ctx.model.ProductPackage,
          as: 'packages',
          order: [['version', 'DESC']],
          limit: 1,
          where: { status: 1 }
        }
      ]
    });

    result.count = products.count;
    products.rows.forEach(product => {
      let temp = this.ctx.helper.pick(product, ['id', 'name', 'model', 'modelId', 'type', 'stage', 'area', 'dept', 'productDesc', 'modelId', 'logo', 'publishState', 'projectManager', 'updatedAt']);
      temp.version = product.packages.length ? product.packages[0].version : '';
      if (product.fitPro) {
        temp.fitPro = productsAll.filter(item => product.fitPro.split(',').includes(item.id + ''));
      } else {
        temp.fitPro = [];
      }
      result.rows.push(temp);
    });

    return result;
  }

  async addProduct() {
    const extraParams = await this.ctx.service.file.parse(this.ctx.req);
    let { name, model, type, stage, fitPro = [], area, dept, projectManager, productDesc, modelId } = extraParams && extraParams.fields;

    if (await this.ctx.model.Product.findOne({ where: { modelId, status: 1 } })) {
      return { msg: 'modelId重复' };
    }

    let product = await this.ctx.model.Product.create({
      name,
      model,
      type,
      stage,
      fitPro: JSON.parse(fitPro).join(','),
      area,
      dept,
      projectManager,
      productDesc,
      modelId,
      logo: await this.ctx.service.file.uploadImg(extraParams.files.logo),
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId
    });

    return { result: product };
  }

  async updateProduct(id) {
    const extraParams = await this.ctx.service.file.parse(this.ctx.req);
    let { name, model, type, stage, fitPro = [], area, dept, projectManager, productDesc } = extraParams && extraParams.fields;

    let product = await this.ctx.model.Product.findById(id);
    if (!(product && product.status == 1)) {
      return {};
    }

    let params = {
      name,
      model,
      type,
      stage,
      fitPro: JSON.parse(fitPro).join(','),
      area,
      dept,
      projectManager,
      productDesc,
      updatedBy: this.ctx.userId
    };

    let logo = await this.ctx.service.file.uploadImg(extraParams.files.logo);
    if (logo) {
      Object.assign(params, { logo });
      this.ctx.service.file.delFile(product.logo);
    }

    let result = await this.ctx.model.Product.update(params, { where: { id, status: 1 } });
    return { length: result[0] };
  }

  async delProduct(id) {
    const result = await this.ctx.model.Product.destroy({ where: { id } });
    return result;
  }
}

module.exports = ProductService;
