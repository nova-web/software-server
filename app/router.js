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
  router.resources('user', '/users', controller.user);
  router.post('/setUserStatus', controller.user.setStatus);
  //角色
  router.resources('role', '/roles', controller.role);
  router.post('/setRoleStatus', controller.role.setStatus);
  router.post('/setAuthorize', controller.role.setAuthorize);
  //权限
  router.resources('acl', '/acls', controller.acl);
  router.post('/setAclStatus', controller.acl.setStatus);
  router.post('/getAclCodes', controller.acl.getCodes);

  router.get('/', controller.home.index);
  router.get('/packagelist', controller.file.index);
  router.post('/upload', controller.file.upload);
  router.get('/download/*', controller.file.download);
  router.resources('product', '/products', controller.product);
  router.resources('package', '/package', controller.package);
  router.resources('syslog', '/syslog', controller.syslog);
  router.post('/logout', controller.login.logout);
};
