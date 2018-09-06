const Service = require('egg').Service;

class UserService extends Service {
  async getData({ pageSize = this.app.config.pageSize, pageNum = 1, username = '', roleId, status = 1 } = {}) {
    pageSize = Number.parseInt(pageSize);
    pageNum = Number.parseInt(pageNum);
    status = Number.parseInt(status || 1);
    let usernameFilter = {};
    let roleIdFilter = {};

    if (username) {
      usernameFilter = {
        username: {
          $like: `%${username}%`
        }
      };
    }

    if (roleId) {
      roleIdFilter = {
        where: {
          id: roleId
        }
      };
    }

    return await this.ctx.model.User.findAndCountAll({
      where: {
        status,
        ...usernameFilter
      },
      offset: pageSize * (pageNum - 1),
      limit: pageSize,
      attributes: {
        exclude: ['created_at', 'updated_at', 'password']
      },
      include: [
        {
          model: this.ctx.app.model.Role,
          attributes: {
            exclude: ['created_at', 'updated_at', 'remark', 'status', 'createdBy', 'updatedBy']
          },
          as: 'roles',
          through: {
            attributes: []
          },
          ...roleIdFilter
        }
      ],
      distinct: true
    });
  }

  async addData(params) {
    let result = await this.ctx.model.User.create(
      {
        ...params,
        roles: params.operator
      },
      {
        include: [
          {
            model: this.ctx.app.model.Role,
            as: 'roles'
          }
        ]
      }
    );
    return result;
  }

  async updateData(id, params) {
    if (params.status === 2) {
      return { msg: '非法操作!' };
    }

    let result = await this.ctx.model.User.update(
      { ...params },
      {
        where: {
          id
        }
      }
    );
    return { length: result[0] };
  }

  async delData(id) {
    const result = await this.ctx.model.User.findById(id);
    if (result.status === 1) {
      return { msg: '有效用户不能删除！' };
    }

    let result = await this.ctx.model.User.update({ status: 2 }, { where: { id, status: 0 } });
    return { length: result[0] };
  }
}

module.exports = UserService;
