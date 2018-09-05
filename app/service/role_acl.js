const Service = require('egg').Service;

class RoleAclService extends Service {
  async getData() {
    return await this.ctx.model.RoleAcl.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at']
      }
    });
  }

  async addData(params) {
    let result = await this.ctx.model.RoleAcl.create({ ...params });
    return result.dataValues;
  }

  async updateData(id, params) {
    let result = await this.ctx.model.RoleAcl.update({ ...params }, { where: { id } });
    return result[0];
  }

  async delData(id) {
    const result = await this.ctx.model.RoleAcl.destroy({ where: { id } });
    return result;
  }
}

module.exports = RoleAclService;
