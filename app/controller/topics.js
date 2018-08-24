const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  accesstoken: 'string',
  title: 'string',
  tab: { type: 'enum', values: ['ask', 'share', 'job'], required: false },
  content: 'string'
};

class TopicController extends Controller {
  async create() {
    const ctx = this.ctx;
    // ctx.validate(createRule);
    // const id = await ctx.service.topics.create(ctx.request.body);
    ctx.body = { topic_id: 22 };
    ctx.status = 200;
  }

  async index() {
    const ctx = this.ctx;
    // const result = await ctx.service.topics.index();
    ctx.body = { topic_id: 11 };
    ctx.status = 200;
  }
}

module.exports = TopicController;
