const Service = require('egg').Service;

class PackageService extends Service {
  /**
   *  查询
   * @param {pageSize} 每页显示条数
   * @param {pageNum} 页码
   * @param {productId} 产品Id
   * @param {version} 版本号
   * @param {publishStatus} 发布状态
   * @param {updatedAt} 更新时间
   */
  async getPackages({ pageSize, pageNum, productName, version, publishStatus, updatedStart, updatedEnd } = {}) {
    pageSize = pageSize ? Number.parseInt(pageSize) : this.app.config.pageSize;
    pageNum = pageNum ? Number.parseInt(pageNum) : 1;

    let packages = await this.ctx.model.ProductPackage.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      order: [['updatedAt', 'DESC']],
      limit: pageSize,
      where: {
        status: 1,
        updatedAt: { ...this.ctx.helper.whereDate({ start: updatedStart, end: updatedEnd }) },
        ...this.ctx.helper.whereAndLike({ version }),
        ...this.ctx.helper.whereAndEq({ publishStatus })
      },
      include: [
        {
          model: this.ctx.app.model.Product,
          as: 'product',
          where: {
            ...this.ctx.helper.whereAndLike({ name: productName })
          }
        }
      ],
      distinct: true
    });
    let rows = [];
    packages.rows.forEach(_package => {
      rows.push({
        updatedAt: _package.updatedAt,
        id: _package.id,
        productId: _package.productId,
        productName: _package.product.name,
        version: _package.version,
        url: this.ctx.app.config.apihost + _package.url,
        versionLog: _package.versionLog,
        type: _package.type,
        publishStatus: _package.publishStatus
      });
    });
    packages.rows = rows;
    return packages;
  }

  //新增版本前获取表单并校验数据
  async preAddPackage() {
    const extraParams = await this.ctx.service.file.parse(this.ctx.req);
    let { version, productId, versionLog, type } = extraParams && extraParams.fields;

    let product = await this.ctx.model.Product.findById(productId);
    if (!(product && product.status == 1)) {
      return { msg: '产品不存在' };
    }

    if (await this.ctx.model.ProductPackage.findOne({ where: { version, productId, status: 1 } })) {
      return { msg: '版本名称重复' };
    }

    if (['version_01', 'version_02'].indexOf(type) === -1) {
      return { msg: '版本类型码无效' };
    }

    return { result: extraParams.fields };
  }

  /**
   * 新增版本
   * @param {version} 版本
   * @param {productId} 产品Id
   * @param {versionLog} 版本日志
   * @param {type} 版本类型：1开发版 2正式版
   * @param {publishStatus} 发布状态：1未发布 | 2已试用 | 3已发布 | 4已下架
   * @param {url} 存放路径
   * @param {size} 版本文件大小
   */
  async addPackage() {
    const extraParams = await this.ctx.service.file.parse(this.ctx.req);

    let { version, productId, versionLog, type } = extraParams && extraParams.fields;

    let product = await this.ctx.model.Product.findById(productId);
    if (!(product && product.status == 1)) {
      return { msg: '产品不存在' };
    }

    if (await this.ctx.model.ProductPackage.findOne({ where: { version, productId, status: 1 } })) {
      return { msg: '版本名称重复' };
    }

    let fileObj = await this.ctx.service.file.rename(extraParams.files.package, product.modelId);

    if (!fileObj.url) {
      return { msg: '请上传版本包' };
    }

    let _package = await this.ctx.model.ProductPackage.create({
      version,
      productId,
      versionLog,
      type,
      size: fileObj.size,
      url: fileObj.url,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId
    });
    //操作日志
    this.ctx.service.syslog.writeLog('固件包', 0, '新增产品[' + product.name + ']固件包：' + version);
    return { result: _package };
  }

  //修改版本前获取表单并校验数据
  async preUpdatePackage(id) {
    const extraParams = await this.ctx.service.file.parse(this.ctx.req);
    let { version, productId, versionLog, type } = extraParams && extraParams.fields;

    let product = await this.ctx.model.Product.findById(productId);
    if (!(product && product.status == 1)) {
      return { msg: '产品不存在' };
    }

    if (await this.ctx.model.ProductPackage.findOne({ where: { version, productId, status: 1, id: { $not: id } } })) {
      return { msg: '版本名称重复' };
    }

    if (['version_01', 'version_02'].indexOf(type) === -1) {
      return { msg: '版本类型码无效' };
    }

    return { result: extraParams.fields };
  }

  /**
   * 修改版本包
   * @param {id} id
   * @param {version} 版本
   * @param {productId} 产品Id
   * @param {versionLog} 版本日志
   * @param {type} 版本类型：1开发版 2正式版
   * @param {publishStatus} 发布状态：1未发布 | 2已试用 | 3已发布 | 4已下架
   * @param {url} 存放路径
   * @param {size} 版本文件大小
   */
  async updatePackage(id) {
    const extraParams = await this.ctx.service.file.parse(this.ctx.req);
    let { version, productId, versionLog, type } = extraParams && extraParams.fields;
    let productPackage = await this.ctx.model.ProductPackage.findById(id);
    if (productPackage) {
      let product = await this.ctx.model.Product.findById(productId);
      if (!(product && product.status == 1)) {
        return { msg: '产品不存在' };
      }

      if (await this.ctx.model.ProductPackage.findOne({ where: { version, productId, status: 1, id: { $not: id } } })) {
        return { msg: '版本名称重复' };
      }

      let params = {
        version,
        productId,
        versionLog,
        type,
        updatedBy: this.ctx.userId
      };
      if (extraParams.files.package) {
        this.ctx.service.file.delFile(productPackage.url);
        let fileObj = await this.ctx.service.file.rename(extraParams.files.package, product.modelId);

        Object.assign(params, {
          size: fileObj.size,
          url: fileObj.url
        });
      }

      let result = await this.ctx.model.ProductPackage.update(params, { where: { id } });
      if (result.length) {
        //操作日志
        // let diff = this.ctx.helper.compareDiff(productPackage, params);
        // this.ctx.service.syslog.writeLog('固件包', 1, '修改产品固件包：[' + diff.oldValue.join('，') + ']为[' + diff.newValue.join('，') + ']');
        this.ctx.service.syslog.writeLog('固件包', 1, '修改产品[' + product.name + ']固件包：' + productPackage.version);
      }
      return { length: result[0] };
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
      if (result.length) {
        //操作日志
        this.ctx.service.syslog.writeLog('固件包', 2, '删除固件包：' + productPackage.version);
      }
      return { length: result[0] };
    }

    return { msg: '没有此数据' };
  }

  //获取可升级的版本列表
  async newlist({ modelId, version = '', limit = 1 }) {
    limit = parseInt(limit) || 1;
    let list = [];
    let product = await this.ctx.model.Product.findOne({
      where: { modelId, status: 1 },
      include: [
        {
          model: this.ctx.model.ProductPackage,
          as: 'packages',
          where: {
            status: 1,
            publishStatus: {
              $in: ['pro_status_02', 'pro_status_03']
            },
            version: {
              $gt: version
            }
          },
          order: [['version', 'DESC']],
          limit
        }
      ]
    });
    if (product && product.service && product.packages.length) {
      list = product.packages.map(item => {
        return {
          url: this.ctx.app.config.apihost + item.url,
          version: item.version,
          log: item.versionLog,
          createdAt: item.createdAt,
          versionType: this.app.dict[item.type],
          publishStatus: this.app.dict[item.publishStatus]
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
      if (result.length) {
        //操作日志
        this.ctx.service.syslog.writeLog('固件包', 4, '试用固件包：' + productPackage.version);
      }
      return { length: result[0] };
    }
    return { msg: '没有此数据' };
  }

  //撤回
  async withdraw({ id }) {
    let productPackage = await this.ctx.model.ProductPackage.findById(id);
    if (productPackage) {
      let product = await this.ctx.model.Product.findById(productPackage.productId);
      let result = await this.ctx.model.ProductPackage.update({ publishStatus: 'pro_status_01', updatedBy: this.ctx.userId }, { where: { id, status: 1, publishStatus: { $in: ['pro_status_02'] } } });
      if (result.length) {
        //操作日志
        this.ctx.service.syslog.writeLog('固件包', 5, '撤回固件包：' + productPackage.version);
      }
      return { length: result[0] };
    }
    return { msg: '没有此数据' };
  }

  //发布
  async publish({ id }) {
    let productPackage = await this.ctx.model.ProductPackage.findById(id);
    if (productPackage) {
      let product = await this.ctx.model.Product.findById(productPackage.productId);
      let result = await this.ctx.model.ProductPackage.update({ publishStatus: 'pro_status_03', updatedBy: this.ctx.userId }, { where: { id, status: 1, publishStatus: { $in: ['pro_status_01', 'pro_status_02', 'pro_status_04'] } } });
      if (result.length) {
        //操作日志
        this.ctx.service.syslog.writeLog('固件包', 6, '发布固件包：' + productPackage.version);
      }
      return { length: result[0] };
    }
    return { msg: '没有此数据' };
  }

  //下架
  async obtained({ id }) {
    let productPackage = await this.ctx.model.ProductPackage.findById(id);
    if (productPackage) {
      let product = await this.ctx.model.Product.findById(productPackage.productId);
      let result = await this.ctx.model.ProductPackage.update({ publishStatus: 'pro_status_04', updatedBy: this.ctx.userId }, { where: { id, status: 1, publishStatus: { $in: ['pro_status_03'] } } });
      if (result.length) {
        //操作日志
        this.ctx.service.syslog.writeLog('固件包', 7, '下架固件包：' + productPackage.version);
      }
      return { length: result[0] };
    }
    return { msg: '没有此数据' };
  }
}

module.exports = PackageService;
