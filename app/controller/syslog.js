const Controller = require('egg').Controller;

class SyslogController extends Controller {
  //查询日志
  async getLogs() {
    const list = await this.ctx.service.syslog.getLogs(this.ctx.request.query);
    this.ctx.success(list);
  }
}

module.exports = SyslogController;
