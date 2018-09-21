const Service = require('egg').Service;

class LoginService extends Service {
  async login({ username = '', password = '' }) {
    let result = await this.ctx.model.User.findOne({
      attributes: {
        exclude: ['created_at', 'createdAt', 'updated_at', 'updatedAt', 'password', 'remark', 'status', 'createdBy', 'updatedBy']
      },
      where: { username, password }
    });
    return result;
  }
}

module.exports = LoginService;
