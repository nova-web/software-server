const Service = require('egg').Service;

class SyslogService extends Service {
  /**
   * 查询
   * @param {pageSize} 每页显示条数
   * @param {pageNum} 页码
   * @param {operateType} 操作类型
   * @param {operateContent} 操作描述
   * @param {startTime} 开始时间
   * @param {endTime} 结束时间
   */
  async getLogs({ pageSize, pageNum, operator, target, operateType, operateContent, startTime, endTime }) {
    pageSize = pageSize ? Number.parseInt(pageSize) : this.app.config.pageSize;
    pageNum = pageNum ? Number.parseInt(pageNum) : 1;
    let logs = await this.ctx.model.Log.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      where: {
        createdAt: { ...this.ctx.helper.whereDate({ start: startTime, end: endTime }) },
        ...this.ctx.helper.whereAndLike({ operateContent, target, operator }),
        ...this.ctx.helper.whereAndEq({ operateType })
      }
    });

    let rows = [];
    const logType = ['新增', '修改', '删除', '授权', '试用', '撤回', '发布', '下架', '置为有效', '置为无效'];
    logs.rows.forEach(_log => {
      rows.push({
        operator: _log.operator,
        target: _log.target,
        operateType: logType[_log.operateType],
        operateContent: _log.operateContent,
        ip: _log.ip,
        createdAt: _log.createdAt
      });
    });
    logs.rows = rows;
    return logs;
  }

  async writeLog(target, operateType, operateContent) {
    let log = await this.ctx.model.Log.create({
      operator: this.ctx.name,
      target,
      operateType,
      ip: this.getClientIp(this.ctx.req),
      operateContent,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId
    });
    return log;
  }

  getClientIp(req) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || '';
    ip = ip.match(/\d+.\d+.\d+.\d+/);
    ip = ip ? ip.join('.') : '';
    return ip;
  }
}

module.exports = SyslogService;
