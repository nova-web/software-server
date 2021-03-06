'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const db = require('../db');

module.exports = app => {
  const { router, controller } = app;

  //登录
  router.post('/login', controller.login.login); //登录(对外开放)
  //用户
  router.resources('user', '/users', controller.user); //用户添删改查
  router.post('/setUserStatus', controller.user.setStatus); //设置用户状态
  //角色
  router.resources('role', '/roles', controller.role); //角色添删改查
  router.post('/setRoleStatus', controller.role.setStatus); //设置角色状态
  router.post('/setAuthorize', controller.role.setAuthorize); //给角色授权
  router.get('/getUserRoles', controller.role.getUserRoles); //获取用户拥有的角色(对内开放)
  router.get('/getRoles', controller.role.getRoles); //根据角色筛选用户(对内开放)
  //权限
  router.resources('acl', '/acls', controller.acl); //权限添删改查
  router.post('/setAclStatus', controller.acl.setStatus); //设置权限状态
  router.get('/getUserAclTree', controller.acl.getUserAclTree); //获取用户拥有的权限树(对内开放)
  router.get('/getUserAclCodes', controller.acl.getUserAclCodes); //获取用户拥有的权限码(对内开放)
  router.get('/getRoleAcls', controller.acl.getRoleAcls); //获取角色拥有的权限id(对内开放)
  //产品
  router.resources('product', '/products', controller.product); //产品添删改查
  router.get('/product/all', controller.product.getAllProducts); //下拉查询所有产品(对内开放)
  router.post('/product/tryout', controller.product.tryout); //试用
  router.post('/product/withdraw', controller.product.withdraw); //撤回
  router.post('/product/publish', controller.product.publish); //发布
  router.post('/product/obtained', controller.product.obtained); //下架
  router.get('/product/logs', controller.product.log); //产品日志统计分析
  router.post('/product/report', controller.product.report); //产品日志上报(对外开放)
  //版本
  router.post('/package/preAdd', controller.package.preAdd); //新增版本表单校验(对内开放)
  router.put('/package/preUpdate/:id', controller.package.preUpdate); //修改版本表单校验(对内开放)
  router.resources('productPackage', '/packages', controller.package); //版本添删改查
  router.get('/package/newlist', controller.package.newlist); //查询可升级版本列表(对外开放)
  router.post('/package/tryout', controller.package.tryout); //试用
  router.post('/package/withdraw', controller.package.withdraw); //撤回
  router.post('/package/publish', controller.package.publish); //发布
  router.post('/package/obtained', controller.package.obtained); //下架
  //字典
  router.get('/dict', controller.dict.getDict); //字典(对内开放)
  //操作审计
  router.get('/logs', controller.syslog.getLogs);
  //系统控制
  router.resources('syscontrol', '/syscontrol', controller.syscontrol); //产品服务的查改

  // app.model.User.bulkCreate(db.user);
  // app.model.Role.bulkCreate(db.role);
  // app.model.Dict.bulkCreate(db.dict);
  // app.model.Acl.bulkCreate(db.acl);
};
