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
  async getLogs({ pageSize, pageNum, operator, operateType, operateContent, startTime, endTime }) {
    pageSize = pageSize ? Number.parseInt(pageSize) : this.app.config.pageSize;
    pageNum = pageNum ? Number.parseInt(pageNum) : 1;
    let logs = await this.ctx.model.Log.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      order: [['createdAt', 'ASC']],
      limit: pageSize,
      where: {
        createdAt: { ...this.ctx.helper.whereDate({ start: startTime, end: endTime }) },
        ...this.ctx.helper.whereAnd({ operateType, operateContent })
      },
      include: [
        {
          model: this.ctx.app.model.User,
          as: 'operator',
          where: {
            ...this.ctx.helper.whereAnd({ name: operator })
          }
        }
      ],
      distinct: true
    });

    let rows = [];
    const logType = ['新增', '修改', '删除', '授权', '试用', '撤回', '发布', '下架'];
    logs.rows.forEach(_log => {
      rows.push({
        operator: _log.operator.name,
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

  async writeLog({ target, operateType, operateContent }) {
    let log = await this.ctx.model.Log.create({
      target,
      operateType,
      ip: this.ctx.req.connection.remoteAddress,
      operateContent,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId
    });
    return log;
  }
}

module.exports = SyslogService;
