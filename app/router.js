'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const db = require('../db');

module.exports = app => {
  const { router, controller } = app;

  //用户
  router.resources('user', '/users', controller.user);
  router.post('/setUserStatus', controller.user.setStatus);
  //角色
  router.resources('role', '/roles', controller.role);
  router.post('/setRoleStatus', controller.role.setStatus);
  router.post('/setAuthorize', controller.role.setAuthorize);
  //权限
  router.resources('acl', '/acls', controller.acl);

  router.get('/', controller.home.index);
  router.get('/packagelist', controller.file.index);
  router.post('/upload', controller.file.upload);
  router.get('/download/*', controller.file.download);
  router.resources('product', '/products', controller.product);
  router.resources('package', '/package', controller.package);
  router.resources('syslog', '/syslog', controller.syslog);
  router.post('/login', controller.login.login);
  router.post('/logout', controller.login.logout);

  // app.model.User.bulkCreate(db.user);
  // app.model.Role.bulkCreate(db.role);
  // app.model.Dict.bulkCreate(db.dict);
  // app.model.Config.bulkCreate(db.config);
  // app.model.Acl.bulkCreate(db.acl);
};
