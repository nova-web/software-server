const Service = require('egg').Service;

let userId = 0;
class UserService extends Service {
  async getUser() {
    return await this.app.mysql.select('employee');
  }

  async addUser() {
    let user = await this.app.mysql.insert('employee', { name: 2, roleId: 2 });
    return user.insertId;
  }

  async delUser(id) {
    const userId = await this.app.mysql.delete('employee', { id });
    return userId;
  }
}

module.exports = UserService;
