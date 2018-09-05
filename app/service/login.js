const Service = require('egg').Service;

class LoginService extends Service {
  async login({ username = '', password = '' }) {
    const result = await this.app.mysql.get('sys_user', { username, password });
    return result;
  }
}

module.exports = LoginService;
