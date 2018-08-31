const Service = require('egg').Service;

class RoleService extends Service {
  async getData() {
    return await this.app.mysql.select('sys_role');
  }

  async addData(params) {
    let result = await this.app.mysql.insert('sys_role', params);
    return result.insertId;
  }

  async updateData(id, query) {
    const result = await this.app.mysql.update('sys_role', { id, ...query });
    return result.affectedRows;
  }

  async delData(id) {
    const result = await this.app.mysql.delete('sys_role', { id });
    return result.affectedRows;
  }
}

module.exports = RoleService;
