const Service = require('egg').Service;
const md5 = require('md5');

class AclService extends Service {
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
    let parentId = acls.filter(item => item.id === id)[0].parentId;
    if (parentId) {
      userParentAclIds.push(parentId);
      this.filterAcls(parentId, userParentAclIds, acls);
    }
  }

  //获取权限用户
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
    user.roles.forEach(r => {
      userAclIds = userAclIds.concat(r.acls.map(a => a.id));
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

  async getAcls() {
    let acls = await this.ctx.model.Acl.findAll();
    let filterdAcls = await this.getFilteredAcls(acls);

    //生成权限树
    let aclTree = [];
    filterdAcls.forEach(item => {
      if (!item.parentId) {
        aclTree.push(this.ctx.helper.pick(item, ['id', 'name', 'code', 'url', 'status', 'remark', 'updatedAt', 'parentId']));
      }
    });
    this.createTree(aclTree, filterdAcls);
    return aclTree;
  }

  async addAcl({ name, remark, code, url, parentId }) {
    if (parentId) {
      let parentAcl = await this.ctx.model.Acl.findById(parentId);
      if (!parentAcl) {
        return {
          msg: '无效的父级权限！'
        };
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
    return { result: acl };
  }

  async updateAcl(id, { name, code, url, remark }) {
    let result = await this.ctx.model.Acl.update({ name, remark, code, url, updatedBy: this.ctx.userId }, { where: { id, status: { $in: [0, 1] } } });
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
        return { msg: `功能正在被角色【${acl.roles.map(r => r.name).join('、')}】使用中！` };
      }
    }

    let result = await this.ctx.model.Acl.update({ status: 2 }, { where: { id, status: 0 } });
    return { length: result[0] };
  }

  async setStatus({ status, id }) {
    if (status == 2) {
      return { msg: '非法操作!' };
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
      return { msg: `功能正在被角色【${acl.roles.map(r => r.name).join('、')}】使用中！` };
    }

    let result = await this.ctx.model.Acl.update({ status }, { where: { id, status: { $in: [0, 1] } } });

    return { length: result[0] };
  }

  //获取权限码
  async getAclCodes() {
    let acls = await this.ctx.model.Acl.findAll();
    let filterdAcls = await this.getFilteredAcls(acls);
    return filterdAcls.map(a => ({ name: a.name, code: a.code }));
  }

  //获取权限URL
  async getAclUrls() {
    let acls = await this.ctx.model.Acl.findAll();
    let filterdAcls = await this.getFilteredAcls(acls);
    return filterdAcls.map(a => a.url).filter(i => i);
  }
}

module.exports = AclService;
