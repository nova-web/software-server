const Service = require('egg').Service;

class UserService extends Service {
  async getUser() {
    console.log('getUser...');
    // return await this.app.mysql.select('role');
    return await this.app.mysql.select('systemfunction');
  }
}

module.exports = UserService;
