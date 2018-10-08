const Service = require('egg').Service;

class AclService extends Service {
  createTree(arr, acls) {
    arr.forEach(item => {
      let children = acls.filter(acl => acl.parentId === item.id);
      if (children.length) {
        item.dataValues.children = children;
        // Object.assign(item, children);
        this.createTree(children, acls);
      }
    });
  }

  async getAcls() {
    let aclResult = [];
    let acls = await this.ctx.model.Acl.findAll();
    acls.forEach(item => {
      if (!item.parentId) {
        aclResult.push(item);
      }
    });

    this.createTree(aclResult, acls);

    return aclResult;
  }

  async addData(params) {
    let result = await this.ctx.model.Acl.create({ ...params });
    return result.dataValues;
  }

  async updateData(id, params) {
    let result = await this.ctx.model.Acl.update({ ...params }, { where: { id } });
    return result[0];
  }

  async delData(id) {
    const result = await this.ctx.model.Acl.destroy({ where: { id } });
    return result;
  }
}

module.exports = AclService;
