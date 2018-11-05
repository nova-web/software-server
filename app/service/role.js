const Service = require('egg').Service;

class RoleService extends Service {
  async getRoles({ pageSize = this.app.config.pageSize, pageNum = 1, name = '', status = 1 } = {}) {
    let result = { count: 0, rows: [] };
    let roles = {};
    pageSize = Number.parseInt(pageSize);
    pageNum = Number.parseInt(pageNum);
    status = Number.parseInt(status || 1);

    if (!(status == 0 || status == 1)) {
      return [];
    }

    roles = await this.ctx.model.Role.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      limit: pageSize,
      where: {
        status,
        ...this.ctx.helper.whereAndLike({ name })
      }
    });

    result.count = roles.count;
    roles.rows.forEach(role => {
      result.rows.push(this.ctx.helper.pick(role, ['id', 'name', 'remark', 'updatedAt', 'status']));
    });
    return result;
  }

  async addRole({ name, remark }) {
    if (await this.ctx.model.Role.findOne({ where: { name, status: { $in: [0, 1] } } })) {
      return { msg: '角色名重复' };
    }

    let role = await this.ctx.model.Role.create({
      name,
      remark,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId
    });

    //操作日志
    this.ctx.service.syslog.writeLog('角色', 0, '新增角色：' + role.name);
    return { result: role };
  }

  async updateRole(id, { name, remark }) {
    let role = await this.ctx.model.Role.findById(id);
    if (!(role && [0, 1].includes(role.status))) {
      return {};
    }

    if (await this.ctx.model.Role.findOne({ where: { name, status: { $in: [0, 1] }, id: { $not: id } } })) {
      return { msg: '角色名重复' };
    }

    let result = await this.ctx.model.Role.update({ name, remark, updatedBy: this.ctx.userId }, { where: { id, status: { $in: [0, 1] } } });
    if (result.length) {
      //操作日志
      let diff = this.ctx.helper.compareDiff(role, { name, remark });
      this.ctx.service.syslog.writeLog('角色', 1, '修改角色：[' + diff.oldValue.join('，') + ']为[' + diff.newValue.join('，') + ']');
    }
    return { length: result[0] };
  }

  async delRole(id) {
    let role = await this.ctx.model.Role.findById(id, {
      include: [
        {
          model: this.ctx.model.User,
          as: 'users'
        }
      ]
    });

    if (role) {
      if (role.status === 1) {
        return { msg: '有效角色不能删除！' };
      }

      if (role.users.some(u => [0, 1].includes(u.status)) && status == 0) {
        return { msg: `角色正在被用户${role.users.map(r => r.name).join('、')}使用中！` };
      }
    }

    let result = await this.ctx.model.Role.update({ status: 2 }, { where: { id, status: 0 } });
    if (result.length) {
      //操作日志
      this.ctx.service.syslog.writeLog('角色', 2, '删除角色：' + role.name);
    }
    return { length: result[0] };
  }

  async setStatus({ status, id }) {
    if (status == 2) {
      return { msg: '无效状态码' };
    }

    let role = await this.ctx.model.Role.findById(id, {
      include: [
        {
          model: this.ctx.model.User,
          as: 'users'
        }
      ]
    });

    if (role && role.users.some(u => [0, 1].includes(u.status)) && status == 0) {
      return { msg: `角色正在被用户${role.users.map(r => r.name).join('、')}使用中！` };
    }

    let result = await this.ctx.model.Role.update({ status }, { where: { id, status: { $in: [0, 1] } } });
    if (result.length) {
      //操作日志
      this.ctx.service.syslog.writeLog('角色', status ? 8 : 9, '设置角色状态为：' + (status ? '有效' : '无效'));
    }
    return { length: result[0] };
  }

  //授权
  async setAcls({ acls = [], id }) {
    let role = await this.ctx.model.Role.findById(id, {
      include: [
        {
          model: this.ctx.model.Acl,
          as: 'acls'
        }
      ]
    });

    if (!(role && [0, 1].includes(role.status))) {
      return { length: 0 };
    }

    let acl = await this.ctx.model.Acl.findAll({ where: { id: { $in: acls }, status: 1 } });
    await role.setAcls(acl);

    if (role) {
      //操作日志
      this.ctx.service.syslog.writeLog('角色', 3, '给角色[' + role.name + ']授权：[' + acl.map(item => item.name).join('，') + ']');
    }

    return { length: acl };
  }

  async getUserRoles() {
    let result = [];
    let roles = [];

    if (this.ctx.userId == 0) {
      roles = await this.ctx.model.Role.findAll({ where: { status: 1 } });
    } else {
      let user = await this.ctx.model.User.findById(this.ctx.userId, {
        include: [
          {
            model: this.ctx.model.Role,
            as: 'roles',
            where: { status: 1 }
          }
        ]
      });
      roles = user.roles;
    }

    roles.forEach(role => {
      result.push(this.ctx.helper.pick(role, ['id', 'name']));
    });
    return result;
  }
}

module.exports = RoleService;
