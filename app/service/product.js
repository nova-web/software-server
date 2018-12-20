const Service = require('egg').Service;

class ProductService extends Service {
  async getProducts({ pageSize = this.app.config.pageSize, pageNum = 1, publishStatus, type, name } = {}) {
    let result = { count: 0, rows: [] };
    pageSize = Number.parseInt(pageSize);
    pageNum = Number.parseInt(pageNum);

    let productsAll = await this.getAllProducts();
    let products = await this.ctx.model.Product.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      order: [['updatedAt', 'DESC']],
      limit: pageSize,
      where: {
        status: 1,
        ...this.ctx.helper.whereAndLike({ name }),
        ...this.ctx.helper.whereAndEq({ publishStatus, type })
      },
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
      let temp = this.ctx.helper.pick(product, ['id', 'name', 'model', 'modelId', 'type', 'stage', 'area', 'dept', 'productDesc', 'publishStatus', 'projectManager', 'updatedAt']);
      temp.version = product.packages.length ? product.packages[0].version : '';
      if (product.fitPro) {
        temp.fitPro = productsAll.filter(item => product.fitPro.split(',').includes(item.id + ''));
      } else {
        temp.fitPro = [];
      }
      temp.logo = product.logo ? this.ctx.app.config.apihost + product.logo : '';
      result.rows.push(temp);
    });

    return result;
  }

  async getProduct(id) {
    let result;
    let productsAll = await this.getAllProducts();
    let product = await this.ctx.model.Product.findById(id, {
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
    if (product && product.status == 1) {
      result = this.ctx.helper.pick(product, ['name', 'type', 'stage', 'area', 'dept', 'productDesc', 'publishStatus', 'projectManager']);
      result.version = product.packages.length ? product.packages[0].version : '';
      if (product.fitPro) {
        result.fitPro = productsAll.filter(item => product.fitPro.split(',').includes(item.id + ''));
      } else {
        result.fitPro = [];
      }
      result.logo = product.logo ? this.ctx.app.config.apihost + product.logo : '';
    }

    return { result };
  }

  async addProduct() {
    const extraParams = await this.ctx.service.file.parse(this.ctx.req);
    let { name, model, type, stage, fitPro, area, dept, projectManager, productDesc, modelId } = extraParams && extraParams.fields;

    if (await this.ctx.model.Product.findOne({ where: { modelId, status: 1 } })) {
      return { msg: 'modelId重复' };
    }

    let fileObj = await this.ctx.service.file.rename(extraParams.files.logo);

    let product = await this.ctx.model.Product.create({
      name,
      model,
      modelId,
      type,
      stage,
      fitPro,
      area,
      dept,
      projectManager,
      productDesc,
      logo: fileObj.url,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId
    });

    //操作日志
    this.ctx.service.syslog.writeLog('产品', 0, '新增产品：' + product.name);
    return { result: product };
  }

  async updateProduct(id) {
    const extraParams = await this.ctx.service.file.parse(this.ctx.req);
    let { name, model, type, stage, fitPro, area, dept, projectManager, productDesc, logoStatus } = extraParams && extraParams.fields;

    let product = await this.ctx.model.Product.findById(id);
    if (!(product && product.status == 1)) {
      return {};
    }

    let params = {
      name,
      model,
      type,
      stage,
      fitPro,
      area,
      dept,
      projectManager,
      productDesc,
      updatedBy: this.ctx.userId
    };

    if (logoStatus === 'remove') {
      Object.assign(params, { logo: '' });
      this.ctx.service.file.delFile(product.logo);
    }

    if (extraParams.files.logo) {
      let logo = await this.ctx.service.file.rename(extraParams.files.logo);
      if (logo.url) {
        Object.assign(params, { logo: logo.url });
        this.ctx.service.file.delFile(product.logo);
      }
    }

    let result = await this.ctx.model.Product.update(params, { where: { id, status: 1 } });
    if (result.length) {
      //操作日志
      // let diff = this.ctx.helper.compareDiff(product, params);
      // this.ctx.service.syslog.writeLog('产品', 1, '修改产品：[' + diff.oldValue.join('，') + ']为[' + diff.newValue.join('，') + ']');
      this.ctx.service.syslog.writeLog('产品', 1, '修改产品：' + product.name);
    }
    return { length: result[0] };
  }

  async delProduct(id) {
    const product = await this.ctx.model.Product.findById(id, {
      include: [
        {
          model: this.ctx.model.ProductPackage,
          as: 'packages'
        }
      ]
    });

    if (product && product.status === 1) {
      if (product.publishStatus === 'pro_status_02' || product.publishStatus === 'pro_status_03') {
        return { msg: `使用中的产品无法删除` };
      }

      if (product.packages && product.packages.filter(item => item.status == 1).length) {
        return {
          msg: `移除产品包【${product.packages
            .filter(item => item.status == 1)
            .map(p => p.version)
            .join('、')}】,再删除产品！`
        };
      }
    }
    if (product.logo) {
      this.ctx.service.file.delFile(product.logo);
    }
    const result = await this.ctx.model.Product.update({ status: 2 }, { where: { id, status: 1 } });
    if (result.length) {
      //操作日志
      this.ctx.service.syslog.writeLog('产品', 2, '删除产品：' + product.name);
    }

    return { length: result[0] };
  }

  //查询所有产品
  async getAllProducts() {
    return await this.ctx.model.Product.findAll({ where: { status: 1 } }).map(item => ({ id: item.id, name: item.name }));
  }

  //试用
  async tryout({ id }) {
    let result = await this.ctx.model.Product.update({ publishStatus: 'pro_status_02', updatedBy: this.ctx.userId }, { where: { id, status: 1, publishStatus: { $in: ['pro_status_01', 'pro_status_04'] } } });
    if (result.length) {
      //操作日志
      let product = await this.ctx.model.Product.findById(id);
      this.ctx.service.syslog.writeLog('产品', 4, '试用产品：' + product.name);
    }
    return { length: result[0] };
  }

  //撤回
  async withdraw({ id }) {
    let result = await this.ctx.model.Product.update({ publishStatus: 'pro_status_01', updatedBy: this.ctx.userId }, { where: { id, status: 1, publishStatus: { $in: ['pro_status_02'] } } });
    if (result.length) {
      //操作日志
      let product = await this.ctx.model.Product.findById(id);
      this.ctx.service.syslog.writeLog('产品', 5, '撤回产品：' + product.name);
    }
    return { length: result[0] };
  }

  //发布
  async publish({ id }) {
    let result = await this.ctx.model.Product.update({ publishStatus: 'pro_status_03', updatedBy: this.ctx.userId }, { where: { id, status: 1, publishStatus: { $in: ['pro_status_01', 'pro_status_02', 'pro_status_04'] } } });
    if (result.length) {
      //操作日志
      let product = await this.ctx.model.Product.findById(id);
      this.ctx.service.syslog.writeLog('产品', 6, '发布产品：' + product.name);
    }
    return { length: result[0] };
  }

  //下架
  async obtained({ id }) {
    let result = await this.ctx.model.Product.update({ publishStatus: 'pro_status_04', updatedBy: this.ctx.userId }, { where: { id, status: 1, publishStatus: { $in: ['pro_status_03'] } } });
    if (result.length) {
      //操作日志
      let product = await this.ctx.model.Product.findById(id);
      this.ctx.service.syslog.writeLog('产品', 7, '下架产品：' + product.name);
    }
    return { length: result[0] };
  }

  //上报日志
  async report({ modelId, deviceId, version, deviceInfo, deviceStatus }) {
    try {
      deviceInfo = JSON.stringify(deviceInfo);
    } catch (e) {
      deviceInfo = '';
    }
    const product = await this.ctx.model.Product.findOne({ where: { modelId, status: 1 } });
    if (!product) {
      return { msg: '产品不存在' };
    }

    let productLog = await this.ctx.model.ProductLog.create({
      deviceName: product.name,
      deviceId,
      version,
      deviceInfo,
      deviceStatus,
      softwareIp: this.ctx.req.connection.remoteAddress
    });
    return { result: productLog };
  }

  // 查询设备日志
  async getLogs({ pageSize = this.app.config.pageSize, pageNum = 1, ipName: deviceName, ipName: softwareIp, deviceId } = {}) {
    let result = { count: 0, rows: [] };
    pageSize = Number.parseInt(pageSize);
    pageNum = Number.parseInt(pageNum);

    let logs = await this.ctx.model.ProductLog.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      limit: pageSize,
      where: {
        status: 1,
        ...this.ctx.helper.whereAndLike({ deviceId }),
        ...this.ctx.helper.whereOrLike({ softwareIp, deviceName })
      }
    });

    result.count = logs.count;
    logs.rows.forEach(product => {
      let temp = this.ctx.helper.pick(product, ['deviceId', 'deviceName', 'softwareIp', 'version', 'deviceStatus', 'createdAt']);
      try {
        temp.deviceInfo = JSON.parse(product.deviceInfo);
      } catch (e) {
        temp.deviceInfo = {};
      }
      result.rows.push(temp);
    });

    return result;
  }
}

module.exports = ProductService;
