const Service = require('egg').Service;

class FirmwareService extends Service {
  async getData() {
    let result = await this.app.mysql.select('sys_firmware');
    result.forEach(item => {
      item.update_time = this.ctx.helper.formatDate(item.update_time, 'yyyy/MM/dd hh:mm:ss');
      item.create_time = this.ctx.helper.formatDate(item.create_time, 'yyyy/MM/dd hh:mm:ss');
    });
    return result;
  }

  async addData(params) {
    let result = await this.app.mysql.insert('sys_firmware', { ...params, create_time: this.app.mysql.literals.now });
    return result.insertId;
  }

  async updateData(id, params) {
    const result = await this.app.mysql.update('sys_firmware', { id, ...params, update_time: this.app.mysql.literals.now });
    return result.affectedRows;
  }

  async delData(id) {
    const result = await this.app.mysql.delete('sys_firmware', { id });
    return result.affectedRows;
  }
}

module.exports = FirmwareService;
