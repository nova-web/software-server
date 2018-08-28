const Service = require('egg').Service;

class LoginService extends Service {
  login({ name = '', password = '' }) {
    console.log(this.app.mysql.get({ name, password }));
  }
}
