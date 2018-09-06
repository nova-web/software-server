const Service = require('egg').Service;

class UserService extends Service {
  async getData() {
    return await this.ctx.model.User.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at', 'password']
      },
      include: [this.ctx.app.model.Role]
    });
  }

  async addData(params) {
    let result = await this.ctx.model.User.create({ ...params });
    return result.dataValues;
  }

  async updateData(id, params) {
    let result = await this.ctx.model.User.update({ ...params }, { where: { id } });
    return result[0];
  }

  async delData(id) {
    const result = await this.ctx.model.User.destroy({ where: { id } });
    return result;
  }
}

module.exports = UserService;
