const Service = require('egg').Service;

class RoleUserService extends Service {
  async getData() {
    return await this.ctx.model.RoleUser.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at']
      }
    });
  }

  async addData(params) {
    let result = await this.ctx.model.RoleUser.create({ ...params });
    return result.dataValues;
  }

  async updateData(id, params) {
    let result = await this.ctx.model.RoleUser.update({ ...params }, { where: { id } });
    return result[0];
  }

  async delData(id) {
    const result = await this.ctx.model.RoleUser.destroy({ where: { id } });
    return result;
  }
}

module.exports = RoleUserService;
