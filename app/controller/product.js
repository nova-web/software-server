const Controller = require('egg').Controller;

class ProductController extends Controller {
  //查询所有数据 get
  async index() {
    const list = await this.ctx.service.product.getProducts(this.ctx.request.query);
    this.ctx.success(list);
  }

  //新增数据 post
  async create() {
    const { result, msg = '参数不正确！' } = await this.ctx.service.product.addProduct();
    if (result) {
      this.ctx.success({ id: result.id });
    } else {
      this.ctx.fail(msg);
    }
  }

  //更新数据 put
  async update() {
    const { length = 0, msg = '产品不存在！' } = await this.ctx.service.product.updateProduct(this.ctx.params.id, this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //删除数据 delete
  async destroy() {
    const { length = 0, msg = '产品不存在！' } = await this.ctx.service.product.delProduct(this.ctx.params.id);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //查询所有产品
  async getAllProducts() {
    const list = await this.ctx.service.product.getAllProducts();
    this.ctx.success(list);
  }

  //试用
  async tryout() {
    const { length = 0, msg = '操作异常' } = await this.ctx.service.product.tryout(this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //撤回
  async withdraw() {
    const { length = 0, msg = '操作异常' } = await this.ctx.service.product.withdraw(this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //发布
  async publish() {
    const { length = 0, msg = '操作异常' } = await this.ctx.service.product.publish(this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }

  //下架
  async obtained() {
    const { length = 0, msg = '操作异常' } = await this.ctx.service.product.obtained(this.ctx.request.body);
    if (length) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail(msg);
    }
  }
}

module.exports = ProductController;
