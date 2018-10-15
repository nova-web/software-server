const Service = require('egg').Service;
const pinyin = require('node-pinyin');

class AclService extends Service {
  //创建权限树
  createTree(arr, acls) {
    arr.forEach(item => {
      let children = acls.filter(acl => acl.parentId === item.id);
      if (children.length) {
        let temp = [];
        children.forEach(c => {
          temp.push(this.ctx.helper.pick(c, ['id', 'name', 'code', 'status', 'remark', 'updatedAt', 'parentId']));
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

  async getAcls() {
    let acls = await this.ctx.model.Acl.findAll();
    let filterdAcls = [];

    if (this.ctx.userId == 0) {
      filterdAcls = acls;
    } else {
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

      //过滤出用户权限
      filterdAcls = acls.filter(a => userAclIds.includes(a.id));
    }

    //生成权限树
    let aclTree = [];
    filterdAcls.forEach(item => {
      if (!item.parentId) {
        aclTree.push(this.ctx.helper.pick(item, ['id', 'name', 'code', 'status', 'remark', 'updatedAt', 'parentId']));
      }
    });
    this.createTree(aclTree, filterdAcls);
    return aclTree;
  }

  async addAcl({ name, remark, parentId }) {
    if (parentId) {
      let parentAcl = await this.ctx.model.Acl.findById(parentId);
      if (!parentAcl) {
        return {
          msg: '无效的父级权限！'
        };
      }
    }

    let code = pinyin(name, {
      style: 'firstLetter'
    })
      .join('')
      .toUpperCase();

    let acl = await this.ctx.model.Acl.create({
      name,
      code,
      remark,
      parentId,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId
    });
    return { result: acl };
  }

  async updateAcl(id, params) {
    let result = await this.ctx.model.Acl.update({ ...params }, { where: { id } });
    return result[0];
  }

  async delData(id) {
    const result = await this.ctx.model.Acl.destroy({ where: { id } });
    return result;
  }
}

module.exports = AclService;
