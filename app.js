const db = require('./db');

module.exports = app => {
  app.on('error', (err, ctx) => {
    let errMsg = '';
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      errMsg = err.errors.map(item => item.message);
    } else {
      errMsg = err.message;
    }
    ctx.fail(errMsg);
  });

  app.on('request', ctx => {
    console.log(`--------------${ctx.request.method}请求${ctx.request.url}--------------`);
  });

  app.on('server', server => {
    const Acl = app.model.Acl;
    const Role = app.model.Role;
    const User = app.model.User;
    const Product = app.model.Product;
    const ProductPackage = app.model.ProductPackage;
    app.beforeStart(async () => {
      User.belongsToMany(Role, { as: 'roles', through: 'sys_role_user', foreignKey: 'user_id' });
      Role.belongsToMany(User, { as: 'users', through: 'sys_role_user', foreignKey: 'role_id' });
      Role.belongsToMany(Acl, { as: 'acls', through: 'sys_role_acl', foreignKey: 'role_id' });
      Acl.belongsToMany(Role, { as: 'roles', through: 'sys_role_acl', foreignKey: 'acl_id' });
      ProductPackage.belongsTo(Product, { as: 'product' });
      await app.model.sync();
    });
  });
};
