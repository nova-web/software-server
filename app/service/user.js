const Service = require('egg').Service;
const md5 = require('md5');

class UserService extends Service {
  async getUsers({ pageSize = this.app.config.pageSize, pageNum = 1, name = '', code = '', username = '', roleId, status = 1 } = {}) {
    let result = { count: 0, rows: [] };
    let users = {};
    pageSize = Number.parseInt(pageSize);
    pageNum = Number.parseInt(pageNum);
    status = Number.parseInt(status || 1);

    if (!(status == 0 || status == 1)) {
      return [];
    }

    users = await this.ctx.model.User.findAndCountAll({
      offset: pageSize * (pageNum - 1),
      limit: pageSize,
      where: {
        status,
        ...this.ctx.helper.whereAndLike({ username, name, code }),
        id: {
          $notIn: [this.ctx.userId]
        }
      },
      include: [
        {
          model: this.ctx.app.model.Role,
          as: 'roles'
        }
      ],
      distinct: true
    });

    result.count = users.count;
    users.rows.forEach(user => {
      let roles = [];
      user.roles.forEach(role => {
        roles.push(this.ctx.helper.pick(role, ['id', 'name']));
      });
      if (!roleId || roles.findIndex(item => item.id == roleId) !== -1) {
        result.rows.push(Object.assign(this.ctx.helper.pick(user, ['id', 'code', 'name', 'username', 'phone', 'email', 'updatedAt', 'status']), { roles }));
      }
    });
    return result;
  }

  async addUser({ username, roles = [], phone, email, password, code, name }) {
    if (await this.ctx.model.User.findOne({ where: { username, status: { $in: [0, 1] } } })) {
      return { msg: '用户名重复' };
    }

    let role = await this.ctx.model.Role.findAll({
      where: {
        id: {
          $in: roles
        },
        status: 1
      }
    });

    let user = await this.ctx.model.User.create({
      username,
      phone: phone || null,
      email: email || null,
      password: md5(password),
      code,
      name,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId
    });
    await user.setRoles(role);

    //操作日志
    this.ctx.service.syslog.writeLog('用户', 0, '新增用户：' + user.username);
    return { result: user };
  }

  async updateUser(id, { name, password, phone, email, roles = [], code }) {
    if (id != 0 && id == this.ctx.userId) {
      return { msg: '无法操作当前用户' };
    }

    let user = await this.ctx.model.User.findById(id, {
      include: [
        {
          model: this.ctx.app.model.Role,
          as: 'roles'
        }
      ]
    });

    if (!(user && [0, 1].includes(user.status))) {
      return { length: 0 };
    }

    let columns = {
      name,
      phone,
      email,
      code,
      updatedBy: this.ctx.userId
    };
    if (password) {
      Object.assign(columns, { password });
    }

    let result = await this.ctx.model.User.update(columns, { where: { id, status: { $in: [0, 1] } } });
    let role = await this.ctx.model.Role.findAll({ where: { id: { $in: roles }, status: 1 } });
    await user.setRoles(role);

    if (result.length) {
      //操作日志
      let diff = this.ctx.helper.compareDiff(user, columns);
      this.ctx.service.syslog.writeLog('用户', 1, '修改用户：[' + diff.oldValue.join('，') + ']为[' + diff.newValue.join('，') + ']');
    }

    return { length: result[0] };
  }

  async delUser(id) {
    if (id != 0 && id == this.ctx.userId) {
      return { msg: '无法操作当前用户' };
    }

    const user = await this.ctx.model.User.findById(id);
    if (user && user.status === 1) {
      return { msg: '有效用户不能删除！' };
    }

    let result = await this.ctx.model.User.update({ status: 2 }, { where: { id, status: 0 } });
    if (result.length) {
      //操作日志
      this.ctx.service.syslog.writeLog('用户', 2, '删除用户：' + user.username);
    }
    return { length: result[0] };
  }

  async setStatus({ status, id }) {
    if (status == 2) {
      return { msg: '无效状态码' };
    }

    if (id != 0 && id == this.ctx.userId) {
      return { msg: '无法操作当前用户' };
    }

    let result = await this.ctx.model.User.update({ status }, { where: { id, status: { $in: [0, 1] } } });
    if (result.length) {
      //操作日志
      this.ctx.service.syslog.writeLog('用户', status ? 8 : 9, '设置用户状态为：' + (status ? '有效' : '无效'));
    }
    return { length: result[0] };
  }
}

module.exports = UserService;
