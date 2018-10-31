const Service = require('egg').Service;

class PackageService extends Service {
  /**
   *  查询
   * @param {pageSize} 每页显示条数
   * @param {pageNum} 页码
   * @param {productId} 产品Id
   * @param {version} 版本号
   * @param {status} 版本状态
   * @param {stage} 版本阶段
   * @param {publishStatus} 发布状态
   * @param {updatedAt} 更新时间
   */
  async getPackages({ pageSize, pageNum, productName, version, status, stage, publishStatus, updatedStart, updatedEnd } = {}) {
    pageSize = pageSize ? Number.parseInt(pageSize) : this.app.config.pageSize;
    pageNum = pageNum ? Number.parseInt(pageNum) : 1;
    status = Number.parseInt(status || 1);
    let packages = await this.ctx.model.ProductPackage.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      order: [['updatedAt', 'ASC']],
      limit: pageSize,
      where: {
        updatedAt: { ...this.ctx.helper.whereDate({ start: updatedStart, end: updatedEnd }) },
        ...this.ctx.helper.whereAnd({ version, status, stage, publishStatus })
      },
      include: [
        {
          model: this.ctx.app.model.Product,
          as: 'product',
          where: {
            name: {
              $like: `%${productName}%`
            }
          }
        }
      ],
      distinct: true
    });
    let rows = [];
    packages.rows.forEach(_package => {
      rows.push({
        createdAt: _package.createdAt,
        updatedAt: _package.updatedAt,
        id: _package.id,
        version: _package.version,
        url: this.ctx.app.config.apihost + _package.url,
        versionLog: _package.versionLog,
        stage: _package.stage,
        publishStatus: _package.publishStatus,
        size: _package.size,
        status: _package.status,
        productName: _package.product.name
      });
    });
    packages.rows = rows;
    return packages;
  }
  /**
   * 新增版本
   * @param {version} 版本
   * @param {productId} 产品Id
   * @param {versionLog} 版本日志
   * @param {stage} 阶段：软件--1开发版 2beta版 3正式版 | 硬件--11原型机 12研发样机 13试产 14销售样机 15量产 16停产
   * @param {publishStatus} 发布状态：1未发布 | 2已试用 | 3已发布 | 4已下架
   * @param {url} 存放路径
   * @param {size} 版本文件大小
   */
  async addPackage() {
    const extraParams = await this.ctx.service.file.parse(this.ctx.req);
    let { version, productId, versionLog, stage } = extraParams && extraParams.fields;

    let product = await this.ctx.model.Product.findById(productId);
    if (!(product && product.status == 1)) {
      return { msg: '产品不存在' };
    }

    if (await this.ctx.model.ProductPackage.findOne({ where: { version, productId, status: 1 } })) {
      return { msg: 'version重复' };
    }

    let fileObj = await this.ctx.service.file.upload(extraParams.files.package, product.modelId, version);

    let _package = await this.ctx.model.ProductPackage.create({
      version,
      productId,
      versionLog,
      stage,
      size: fileObj.size,
      url: fileObj.url,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId
    });
    //操作日志
    this.ctx.service.syslog.writeLog({
      target: '【产品：' + product.name + '】' + '【版本：' + version + '】',
      operateType: 0,
      operateContent: this.ctx.name + '新增' + '【产品：' + product.name + '】的' + '【' + version + '】版本'
    });
    return { result: _package };
  }
  /**
   * 修改版本包
   * @param {id} id
   * @param {version} 版本
   * @param {productId} 产品Id
   * @param {versionLog} 版本日志
   * @param {stage} 阶段：软件--1开发版 2beta版 3正式版 | 硬件--11原型机 12研发样机 13试产 14销售样机 15量产 16停产
   * @param {publishStatus} 发布状态：1未发布 | 2已试用 | 3已发布 | 4已下架
   * @param {url} 存放路径
   * @param {size} 版本文件大小
   */
  async updatePackage(id) {
    const extraParams = await this.ctx.service.file.parse(this.ctx.req);
    let { version, productId, versionLog, stage } = extraParams && extraParams.fields;
    let productPackage = await this.ctx.model.ProductPackage.findById(id);
    if (productPackage) {
      let product = await this.ctx.model.Product.findById(productId);
      if (!(product && product.status == 1)) {
        return { msg: '产品不存在' };
      }
      let ppackage = await this.ctx.model.ProductPackage.findOne({
        where: {
          version,
          productId,
          id: {
            $not: id
          }
        }
      });
      if (ppackage) {
        return { msg: 'version重复' };
      }
      let params = {
        version,
        productId,
        versionLog,
        stage,
        updatedBy: this.ctx.userId
      };
      if (extraParams.files.package) {
        this.ctx.service.file.delFile(productPackage.url);
        let fileObj = await this.ctx.service.file.upload(extraParams.files.package, product.modelId, version);

        Object.assign(params, {
          size: fileObj.size,
          url: fileObj.url
        });
      }

      let result = await this.ctx.model.ProductPackage.update(params, { where: { id } });
      let oldProduct = await this.ctx.model.Product.findById(productPackage.productId);
      //操作日志
      this.ctx.service.syslog.writeLog({
        target: '【产品：' + product.name + '】' + '【版本：' + productPackage.version + '】',
        operateType: 1,
        operateContent: this.ctx.name + '修改' + '【产品：' + oldProduct.name + '】的【' + productPackage.version + '】版本：' + '【' + [oldProduct.name, productPackage.version, productPackage.url, productPackage.size, productPackage.versionLog, this.app.dict[productPackage.stage]].join(',') + '】版本' + '为' + '【' + product.name + ',' + version + ',' + (params.url ? params.url : '') + ',' + (params.size ? params.size : '') + ',' + versionLog + ',' + this.app.dict[stage] + '】'
      });
      return result;
    }

    return { msg: '没有此数据' };
  }

  /**
   * 删除版本包
   * @param {id} id
   */
  async delPackage(id) {
    let productPackage = await this.ctx.model.ProductPackage.findById(id);
    if (productPackage) {
      let product = await this.ctx.model.Product.findById(productPackage.productId);
      let result = await this.ctx.model.ProductPackage.update({ status: 2 }, { where: { id } });
      this.ctx.service.syslog.writeLog({
        target: '【产品：' + product.name + '】' + '【版本：' + productPackage.version + '】',
        operateType: 1,
        operateContent: this.ctx.name + '删除' + '【产品：' + product.name + '】的【' + productPackage.version + '】版本'
      });
      return result.length;
    }

    return { msg: '没有此数据' };
  }

  //获取可升级的版本列表
  async newlist({ modelId, version = '' }) {
    let list = [];
    let product = await this.ctx.model.Product.findOne({
      where: { modelId, status: 1 },
      include: [
        {
          model: this.ctx.model.ProductPackage,
          as: 'packages',
          where: {
            status: 1,
            version: {
              $gt: version
            }
          },
          order: [['version', 'DESC']]
        }
      ]
    });
    if (product && product.packages.length) {
      list = product.packages.map(item => {
        return {
          url: this.ctx.app.config.apihost + item.url,
          version: item.version
        };
      });
    }
    return list;
  }

  //试用
  async tryout({ id }) {
    let productPackage = await this.ctx.model.ProductPackage.findById(id);
    if (productPackage) {
      let product = await this.ctx.model.Product.findById(productPackage.productId);
      let result = await this.ctx.model.ProductPackage.update({ publishStatus: 'pro_status_02', updatedBy: this.ctx.userId }, { where: { id, status: 1, publishStatus: { $in: ['pro_status_01', 'pro_status_04'] } } });
      this.ctx.service.syslog.writeLog({
        target: '【产品：' + product.name + '】' + '【版本：' + productPackage.version + '】',
        operateType: 1,
        operateContent: this.ctx.name + '将' + '【产品：' + product.name + '】的【' + productPackage.version + '】版本的版本类型从' + this.app.dict[productPackage.stage] + '修改为试用版本'
      });
      return result;
    }
    return { msg: '没有此数据' };
  }

  //撤回
  async withdraw({ id }) {
    let productPackage = await this.ctx.model.ProductPackage.findById(id);
    if (productPackage) {
      let product = await this.ctx.model.Product.findById(productPackage.productId);
      let result = await this.ctx.model.ProductPackage.update({ publishStatus: 'pro_status_01', updatedBy: this.ctx.userId }, { where: { id, status: 1, publishStatus: { $in: ['pro_status_02'] } } });
      this.ctx.service.syslog.writeLog({
        target: '【产品：' + product.name + '】' + '【版本：' + productPackage.version + '】',
        operateType: 1,
        operateContent: this.ctx.name + '撤回了' + '【产品：' + product.name + '】的【' + productPackage.version + '】版本'
      });
      return result;
    }
    return { msg: '没有此数据' };
  }

  //发布
  async publish({ id }) {
    let productPackage = await this.ctx.model.ProductPackage.findById(id);
    if (productPackage) {
      let product = await this.ctx.model.Product.findById(productPackage.productId);
      let result = await this.ctx.model.ProductPackage.update({ publishStatus: 'pro_status_03', updatedBy: this.ctx.userId, publishBy: this.ctx.userId }, { where: { id, status: 1, publishStatus: { $in: ['pro_status_01', 'pro_status_02', 'pro_status_04'] } } });
      this.ctx.service.syslog.writeLog({
        target: '【产品：' + product.name + '】' + '【版本：' + productPackage.version + '】',
        operateType: 1,
        operateContent: this.ctx.name + '发布了' + '【产品：' + product.name + '】的【' + productPackage.version + '】版本'
      });
      return result;
    }
    return { msg: '没有此数据' };
  }

  //下架
  async obtained({ id }) {
    let productPackage = await this.ctx.model.ProductPackage.findById(id);
    if (productPackage) {
      let product = await this.ctx.model.Product.findById(productPackage.productId);
      let result = await this.ctx.model.ProductPackage.update({ publishStatus: 'pro_status_04', updatedBy: this.ctx.userId }, { where: { id, status: 1, publishStatus: { $in: ['pro_status_03'] } } });
      this.ctx.service.syslog.writeLog({
        target: '【产品：' + product.name + '】' + '【版本：' + productPackage.version + '】',
        operateType: 1,
        operateContent: this.ctx.name + '下架了' + '【产品：' + product.name + '】的【' + productPackage.version + '】版本'
      });
      return result;
    }
    return { msg: '没有此数据' };
  }
}

module.exports = PackageService;
