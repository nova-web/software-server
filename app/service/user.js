const Service = require('egg').Service;

class UserService extends Service {
  async getData() {
    return await this.app.mysql.select('sys_user');
  }

  async addData(params) {
    let result = await this.app.mysql.insert('sys_user', params);
    return result.insertId;
  }

  async updateData(id, query) {
    const result = await this.app.mysql.update('sys_user', { id, ...query });
    return result.affectedRows;
  }

  async delData(id) {
    const result = await this.app.mysql.delete('sys_user', { id });
    return result.affectedRows;
  }
}

module.exports = UserService;
