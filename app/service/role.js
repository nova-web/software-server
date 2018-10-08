const Service = require('egg').Service;

class RoleService extends Service {
  async getRoles({ pageSize = this.app.config.pageSize, pageNum = 1, name = '', status = 1 } = {}) {
    let result = { count: 0, rows: [] };
    let roles = {};
    pageSize = Number.parseInt(pageSize);
    pageNum = Number.parseInt(pageNum);
    status = Number.parseInt(status || 1);

    roles = await this.ctx.model.Role.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      limit: pageSize,
      where: {
        status,
        ...this.ctx.helper.whereFilter({ name }),
        id: {
          $notIn: [1]
        }
      }
    });

    result.count = roles.count;
    roles.rows.forEach(role => {
      result.rows.push(this.ctx.helper.pick(role, ['id', 'name', 'remark', 'updatedAt', 'status']));
    });
    return result;
  }

  async addRole({ name, remark }) {
    let role = await this.ctx.model.Role.create({
      name,
      remark,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId
    });

    return { result: role };
  }

  async updateRole(id, { name, remark }) {
    if (id == 1) {
      return {
        msg: '非法操作!'
      };
    }

    let result = await this.ctx.model.Role.update({ name, remark, updatedBy: this.ctx.userId }, { where: { id } });
    return { length: result[0] };
  }

  async delRole(id) {
    const role = await this.ctx.model.Role.findById(id);
    if (role && role.status === 1) {
      return {
        msg: '有效角色不能删除！'
      };
    }

    let result = await this.ctx.model.Role.update({ status: 2 }, { where: { id, status: 0 } });
    return { length: result[0] };
  }

  async setStatus({ status, id }) {
    if (status == 2 || id == 1) {
      return {
        msg: '非法操作!'
      };
    }

    //用户被占用 不能设置为无效TODO

    let result = await this.ctx.model.Role.update({ status }, { where: { id } });

    return { length: result[0] };
  }

  async setAuthorize() {
    return { length: result[0] };
  }
}

module.exports = RoleService;
