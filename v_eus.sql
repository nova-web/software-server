/*
Navicat MySQL Data Transfer

Source Server         : 172.16.6.203
Source Server Version : 50560
Source Host           : 172.16.6.203:3306
Source Database       : v_eus

Target Server Type    : MYSQL
Target Server Version : 50560
File Encoding         : 65001

Date: 2019-02-14 14:13:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `nova_product`
-- ----------------------------
DROP TABLE IF EXISTS `nova_product`;
CREATE TABLE `nova_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model_id` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `model` varchar(30) NOT NULL,
  `project_manager` varchar(30) DEFAULT NULL,
  `type` varchar(30) DEFAULT 'package_01',
  `stage` varchar(30) DEFAULT 'stage_13',
  `area` varchar(30) DEFAULT 'area_01',
  `dept` varchar(30) DEFAULT 'dept_01',
  `publish_status` varchar(30) DEFAULT 'pro_status_01',
  `fit_pro` varchar(255) DEFAULT NULL,
  `product_desc` text,
  `logo` varchar(255) DEFAULT NULL,
  `service` int(11) DEFAULT '1',
  `service_time` datetime DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nova_product
-- ----------------------------
-- ----------------------------
-- Table structure for `nova_product_log`
-- ----------------------------
DROP TABLE IF EXISTS `nova_product_log`;
CREATE TABLE `nova_product_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `device_id` varchar(30) NOT NULL,
  `device_name` varchar(30) NOT NULL,
  `software_ip` varchar(30) DEFAULT NULL,
  `version` varchar(30) DEFAULT NULL,
  `device_info` text,
  `device_status` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nova_product_log
-- ----------------------------
INSERT INTO `nova_product_log` VALUES ('1', '1', 'vcan1', '172.16.6.203', null, '{\"screen\":null}', null, '1', null, null, '2019-01-15 11:29:14', '2019-01-15 11:29:14');

-- ----------------------------
-- Table structure for `nova_product_package`
-- ----------------------------
DROP TABLE IF EXISTS `nova_product_package`;
CREATE TABLE `nova_product_package` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `version` varchar(30) NOT NULL,
  `url` varchar(255) NOT NULL,
  `version_log` text NOT NULL,
  `type` varchar(30) DEFAULT 'version_01',
  `publish_status` varchar(30) DEFAULT 'pro_status_01',
  `size` varchar(30) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nova_product_package
-- ----------------------------
-- ----------------------------
-- Table structure for `sys_acl`
-- ----------------------------
DROP TABLE IF EXISTS `sys_acl`;
CREATE TABLE `sys_acl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `code` varchar(30) DEFAULT NULL,
  `url` varchar(30) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_acl
-- ----------------------------
INSERT INTO `sys_acl` VALUES ('1', null, 'QXGL', '', '权限管理', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('2', '1', 'YHGL', '', '用户管理', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('3', '2', 'YHCX', 'get/users', '用户查询', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('4', '2', 'YHXZ', 'post/users', '用户新增', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('5', '2', 'YHXG', 'put/users', '用户修改', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('6', '2', 'YHSC', 'delete/users', '用户删除', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('7', '2', 'YHSZZT', 'post/setUserStatus', '用户设置状态', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('8', '1', 'JSGL', '', '角色管理', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('9', '8', 'JSCX', 'get/roles', '角色查询', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('10', '8', 'JSXZ', 'post/roles', '角色新增', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('11', '8', 'JSXG', 'put/roles', '角色修改', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('12', '8', 'JSSC', 'delete/roles', '角色删除', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('13', '8', 'JSSZZT', 'post/setRoleStatus', '角色设置状态', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('14', '8', 'JSSQ', 'post/setAuthorize', '角色授权', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('15', '1', 'GNGL', '', '权限管理', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('16', '15', 'GNCX', 'get/acls', '权限查询', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('17', '15', 'GNXZ', 'post/acls', '权限新增', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('18', '15', 'GNXG', 'put/acls', '权限修改', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('19', '15', 'GNSC', 'delete/acls', '权限删除', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('20', '15', 'GNSZZT', 'post/setAclStatus', '权限设置状态', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('21', null, 'CPGL', '', '产品管理', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('22', '21', 'CPLB', '', '产品列表', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('23', '22', 'CPCX', 'get/products', '产品查询', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('24', '22', 'CPXZ', 'post/products', '产品新增', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('25', '22', 'CPXG', 'put/products', '产品修改', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('26', '22', 'CPSC', 'delete/products', '产品删除', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('27', '22', 'CPFB', 'post/product/publish', '产品发布', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('28', '22', 'CPCH', 'post/product/withdraw', '产品撤回', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('29', '22', 'CPSY', 'post/product/tryout', '产品试用', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('30', '22', 'CPXJ', 'post/product/obtained', '产品下架', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('31', '21', 'BBLB', '', '版本列表', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('32', '31', 'BBCX', 'get/packages', '版本查询', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('33', '31', 'BBXZ', 'post/packages', '版本新增', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('34', '31', 'BBXG', 'put/packages', '版本修改', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('35', '31', 'BBSC', 'delete/packages', '版本删除', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('36', '31', 'BBFB', 'post/package/publish', '版本发布', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('37', '31', 'BBCH', 'post/package/withdraw', '版本撤回', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('38', '31', 'BBSY', 'post/package/tryout', '版本试用', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('39', '31', 'BBXJ', 'post/package/obtained', '版本下架', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('40', null, 'XTGL', '', '系统管理', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('41', '40', 'CZSJ', 'get/logs', '操作审计', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('42', '40', 'XTKZ', '', '系统控制', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('43', '42', 'XTKZCX', 'get/syscontrol', '系统控制查询', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('44', '42', 'XTKZKG', 'put/syscontrol', '系统控制开关', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');
INSERT INTO `sys_acl` VALUES ('45', null, 'TJFX', 'get/product/logs', '统计分析', '', '1', '0', '0', '2018-12-07 18:51:48', '2018-12-07 18:51:48');

-- ----------------------------
-- Table structure for `sys_dict`
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `type` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `code` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES ('1', null, 'area', '全部', 'area_01');
INSERT INTO `sys_dict` VALUES ('2', null, 'area', '国内', 'area_02');
INSERT INTO `sys_dict` VALUES ('3', null, 'area', '国外', 'area_03');
INSERT INTO `sys_dict` VALUES ('4', null, 'pro_status', '未发布', 'pro_status_01');
INSERT INTO `sys_dict` VALUES ('5', null, 'pro_status', '已试用', 'pro_status_02');
INSERT INTO `sys_dict` VALUES ('6', null, 'pro_status', '已发布', 'pro_status_03');
INSERT INTO `sys_dict` VALUES ('7', null, 'pro_status', '已下架', 'pro_status_04');
INSERT INTO `sys_dict` VALUES ('8', null, 'stage', '开发', 'stage_01');
INSERT INTO `sys_dict` VALUES ('9', null, 'stage', '测试', 'stage_02');
INSERT INTO `sys_dict` VALUES ('10', null, 'stage', '发布', 'stage_03');
INSERT INTO `sys_dict` VALUES ('11', null, 'stage', '原型机', 'stage_11');
INSERT INTO `sys_dict` VALUES ('12', null, 'stage', '研发样机', 'stage_12');
INSERT INTO `sys_dict` VALUES ('13', null, 'stage', '销售样机', 'stage_13');
INSERT INTO `sys_dict` VALUES ('14', null, 'stage', '量产', 'stage_14');
INSERT INTO `sys_dict` VALUES ('15', null, 'stage', '停产', 'stage_15');
INSERT INTO `sys_dict` VALUES ('16', null, 'dept', '视频产品线', 'dept_01');
INSERT INTO `sys_dict` VALUES ('17', null, 'dept', '同步产品线', 'dept_02');
INSERT INTO `sys_dict` VALUES ('18', null, 'dept', '云显产品线', 'dept_03');
INSERT INTO `sys_dict` VALUES ('19', null, 'package', '硬件', 'package_01');
INSERT INTO `sys_dict` VALUES ('20', null, 'package', '软件', 'package_02');
INSERT INTO `sys_dict` VALUES ('21', null, 'version', '体验版', 'version_01');
INSERT INTO `sys_dict` VALUES ('22', null, 'version', '正式版', 'version_02');

-- ----------------------------
-- Table structure for `sys_log`
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `target` varchar(30) DEFAULT NULL,
  `operate_type` int(11) DEFAULT '1',
  `ip` varchar(30) DEFAULT NULL,
  `operate_content` text,
  `operator` varchar(30) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=312 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_log
-- ----------------------------
-- ----------------------------
-- Table structure for `sys_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `remark` varchar(30) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
-- ----------------------------
-- Table structure for `sys_role_acl`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_acl`;
CREATE TABLE `sys_role_acl` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT '0',
  `acl_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`role_id`,`acl_id`),
  KEY `acl_id` (`acl_id`),
  CONSTRAINT `sys_role_acl_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sys_role_acl_ibfk_2` FOREIGN KEY (`acl_id`) REFERENCES `sys_acl` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_acl
-- ----------------------------
-- ----------------------------
-- Table structure for `sys_role_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_user`;
CREATE TABLE `sys_role_user` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `role_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `sys_role_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sys_role_user_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_user
-- ----------------------------
-- ----------------------------
-- Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(32) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------