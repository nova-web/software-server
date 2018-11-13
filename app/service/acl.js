const Service = require('egg').Service;
const md5 = require('md5');

class AclService extends Service {
  async getAcls({ status, name } = {}) {
    let acls = await this.ctx.model.Acl.findAll({ where: { status: { $in: [0, 1] } } });
    let filteredAcls = await this.ctx.model.Acl.findAll({
      where: {
        ...this.ctx.helper.whereStatus(status),
        ...this.ctx.helper.whereAndLike({ name })
      }
    });

    // 根据过滤出来的权限查找顶层节点
    let filterdAclParent = this.findFilteredParent(filteredAcls);

    //生成权限树
    let aclTree = [];
    filterdAclParent.forEach(item => {
      aclTree.push(this.ctx.helper.pick(item, ['id', 'name', 'code', 'url', 'status', 'remark', 'updatedAt', 'parentId']));
    });
    this.createTree(aclTree, acls);
    return aclTree;
  }

  async addAcl({ name, remark, code, url, parentId }) {
    if (parentId) {
      let parentAcl = await this.ctx.model.Acl.findById(parentId);
      if (!(parentAcl && [0, 1].includes(parentAcl.status))) {
        return { msg: '无效的父级权限！' };
      }
    }

    if (await this.ctx.model.Acl.findOne({ where: { code, status: { $in: [0, 1] } } })) {
      return { msg: '权限码重复' };
    }

    if (url) {
      if (await this.ctx.model.Acl.findOne({ where: { url, status: { $in: [0, 1] } } })) {
        return { msg: '权限地址重复' };
      }
    }

    let acl = await this.ctx.model.Acl.create({
      name,
      code,
      url,
      remark,
      parentId,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId
    });

    //操作日志
    this.ctx.service.syslog.writeLog('权限', 0, '新增权限：' + acl.name);
    return { result: acl };
  }

  async updateAcl(id, { name, code, url, remark }) {
    if (await this.ctx.model.Acl.findOne({ where: { code, status: { $in: [0, 1] }, id: { $not: id } } })) {
      return { msg: '权限码重复' };
    }

    if (url) {
      if (await this.ctx.model.Acl.findOne({ where: { url, status: { $in: [0, 1] }, id: { $not: id } } })) {
        return { msg: '权限地址重复' };
      }
    }

    let acl = await this.ctx.model.Acl.findById(id);
    let result = await this.ctx.model.Acl.update({ name, remark, code, url, updatedBy: this.ctx.userId }, { where: { id, status: { $in: [0, 1] } } });
    if (result.length) {
      //操作日志
      // let diff = this.ctx.helper.compareDiff(acl, { name, remark, code, url, updatedBy: this.ctx.userId });
      // this.ctx.service.syslog.writeLog('权限', 1, '修改权限：[' + diff.oldValue.join('，') + ']为[' + diff.newValue.join('，') + ']');
      this.ctx.service.syslog.writeLog('权限', 1, '修改权限：' + acl.name);
    }
    return { length: result[0] };
  }

  async delAcl(id) {
    let acl = await this.ctx.model.Acl.findById(id, {
      include: [
        {
          model: this.ctx.model.Role,
          as: 'roles'
        }
      ]
    });

    if (acl) {
      if (acl.status === 1) {
        return { msg: '有效权限不能删除！' };
      }

      if (acl.roles.length && status == 0) {
        return { msg: `权限正在被角色【${acl.roles.map(r => r.name).join('、')}】使用中！` };
      }
    }

    let result = await this.ctx.model.Acl.update({ status: 2 }, { where: { id, status: 0 } });
    if (result.length) {
      //操作日志
      this.ctx.service.syslog.writeLog('权限', 2, '删除权限：' + acl.name);
    }
    return { length: result[0] };
  }

  async setStatus({ status, id }) {
    if (status == 2) {
      return { msg: '无效状态码' };
    }

    let acl = await this.ctx.model.Acl.findById(id, {
      include: [
        {
          model: this.ctx.model.Role,
          as: 'roles'
        }
      ]
    });

    if (acl && acl.roles.length && status == 0) {
      return { msg: `权限正在被角色【${acl.roles.map(r => r.name).join('、')}】使用中！` };
    }

    let result = await this.ctx.model.Acl.update({ status }, { where: { id, status: { $in: [0, 1] } } });
    if (result.length) {
      //操作日志
      this.ctx.service.syslog.writeLog('权限', status ? 8 : 9, '设置权限[' + acl.name + ']状态为：' + (status ? '有效' : '无效'));
    }
    return { length: result[0] };
  }

  //创建权限树
  createTree(arr, acls) {
    arr.forEach(item => {
      let children = acls.filter(acl => acl.parentId === item.id);
      if (children.length) {
        let temp = [];
        children.forEach(c => {
          temp.push(this.ctx.helper.pick(c, ['id', 'name', 'code', 'url', 'status', 'remark', 'updatedAt', 'parentId']));
        });
        item.children = temp;
        this.createTree(temp, acls);
      }
    });
  }

  //根据权限id过滤权限(找出所有父级权限id)
  filterAcls(id, userParentAclIds, acls) {
    let parentAcl = acls.filter(item => item.id === id);
    if (parentAcl.length) {
      let parentId = parentAcl[0].parentId;
      if (parentId) {
        userParentAclIds.push(parentId);
        this.filterAcls(parentId, userParentAclIds, acls);
      }
    }
  }

  //获取用户权限
  async getFilteredAcls(acls) {
    if (this.ctx.userId == 0) {
      return await acls;
    }

    let user = await this.ctx.model.User.findById(this.ctx.userId, {
      include: [
        {
          model: this.ctx.model.Role,
          as: 'roles',
          include: [
            {
              model: this.ctx.model.Acl,
              as: 'acls'
            }
          ]
        }
      ]
    });

    //获取用户权限ids
    let userAclIds = [];
    user.roles
      .filter(r => r.status == 1)
      .forEach(r => {
        userAclIds = userAclIds.concat(r.acls.filter(a => a.status == 1).map(a => a.id));
      });

    //获取用户父级权限ids
    let userParentAclIds = [];
    userAclIds.forEach(id => {
      this.filterAcls(id, userParentAclIds, acls);
    });

    //合并用户权限ids
    userAclIds = [...new Set(userAclIds.concat(userParentAclIds))];

    return acls.filter(a => userAclIds.includes(a.id));
  }

  //获取用户权限树
  async getUserAclTree() {
    let acls = await this.ctx.model.Acl.findAll({ where: { status: 1 } });
    let filterdAcls = await this.getFilteredAcls(acls);

    let aclTree = [];
    filterdAcls.forEach(item => {
      if (!item.parentId) {
        aclTree.push(this.ctx.helper.pick(item, ['id', 'name', 'code', 'url', 'status', 'remark', 'updatedAt', 'parentId']));
      }
    });
    this.createTree(aclTree, filterdAcls);
    return aclTree;
  }

  //获取用户权限码
  async getUserAclCodes() {
    let acls = await this.ctx.model.Acl.findAll({ where: { status: 1 } });
    let filterdAcls = await this.getFilteredAcls(acls);
    return filterdAcls.map(a => ({ name: a.name, code: a.code }));
  }

  //获取用户权限URL
  async getUserAclUrls() {
    let acls = await this.ctx.model.Acl.findAll({ where: { status: 1 } });
    let filterdAcls = await this.getFilteredAcls(acls);
    return filterdAcls.map(a => a.url).filter(i => i);
  }

  //获取角色权限码
  async getRoleAcls({ id }) {
    let result = [];
    let role = await this.ctx.model.Role.findById(id, {
      include: [
        {
          model: this.ctx.model.Acl,
          as: 'acls'
        }
      ]
    });

    if (role && [0, 1].includes(role.status)) {
      result = role.acls
        .filter(item => {
          return item.status == 1 && item.url;
        })
        .map(a => a.id);
    }

    return result;
  }

  // 根据过滤出来的权限查找顶层节点
  findFilteredParent(acls) {
    let parentAcls = [];
    acls.forEach(item => {
      if (!acls.some(acl => acl.id === item.parentId)) {
        parentAcls.push(item);
      }
    });
    return parentAcls;
  }
}

module.exports = AclService;
