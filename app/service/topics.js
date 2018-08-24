const Service = require('egg').Service;

class TopicService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  async create(params) {
    const result = await this.ctx.curl(`${this.root}/topics`, {
      method: 'post',
      data: params,
      dataType: 'json',
      contentType: 'json'
    });

    this.checkStatus(result);

    return result.data.topic_id;
  }

  async index() {
    console.log(1111);
    const result = await this.ctx.curl(`${this.root}/topics`, {
      method: 'get',
      dataType: 'json',
      contentType: 'json'
    });
    this.checkStatus(result);
    return result.data;
  }

  checkStatus(result) {
    if (result.status !== 200) {
      const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      // 远程调用返回格式错误
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }
}

module.exports = TopicService;
