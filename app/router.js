'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const db = require('../db');

module.exports = app => {
  const { router, controller } = app;

  //登录
  router.post('/login', controller.login.login);
  //用户
  router.resources('user', '/users', controller.user); //用户添删改查
  router.post('/setUserStatus', controller.user.setStatus); //设置用户状态
  //角色
  router.resources('role', '/roles', controller.role); //角色添删改查
  router.post('/setRoleStatus', controller.role.setStatus); //设置角色状态
  router.post('/setAuthorize', controller.role.setAuthorize); //给角色授权
  router.get('/getUserRoles', controller.role.getUserRoles); //获取用户拥有的角色
  //权限
  router.resources('acl', '/acls', controller.acl); //权限添删改查
  router.post('/setAclStatus', controller.acl.setStatus); //设置权限状态
  router.get('/getUserAclTree', controller.acl.getUserAclTree); //获取用户拥有的权限树
  router.get('/getUserAclCodes', controller.acl.getUserAclCodes); //获取用户拥有的权限码
  router.get('/getRoleAcls', controller.acl.getRoleAcls); //获取角色拥有的权限id

  router.get('/', controller.home.index);
  router.get('/packagelist', controller.file.index);
  router.post('/upload', controller.file.upload);
  router.get('/download/*', controller.file.download);
  router.resources('product', '/products', controller.product);
  router.resources('package', '/package', controller.package);
  router.resources('syslog', '/syslog', controller.syslog);
  router.post('/logout', controller.login.logout);

  // app.model.User.bulkCreate(db.user);
  // app.model.Role.bulkCreate(db.role);
  // app.model.Dict.bulkCreate(db.dict);
  // app.model.Config.bulkCreate(db.config);
  // app.model.Acl.bulkCreate(db.acl);
};
