const md5 = require('md5');

module.exports = {
  dict: [
    {
      type: 'area',
      name: '全部',
      code: 'area_01'
    },
    {
      type: 'area',
      name: '国内',
      code: 'area_02'
    },
    {
      type: 'area',
      name: '国外',
      code: 'area_03'
    },
    {
      type: 'pro_status',
      name: '未发布',
      code: 'pro_status_01'
    },
    {
      type: 'pro_status',
      name: '已试用',
      code: 'pro_status_02'
    },
    {
      type: 'pro_status',
      name: '已发布',
      code: 'pro_status_03'
    },
    {
      type: 'pro_status',
      name: '已下架',
      code: 'pro_status_04'
    },
    {
      type: 'stage',
      name: '开发',
      code: 'stage_01'
    },
    {
      type: 'stage',
      name: '测试',
      code: 'stage_02'
    },
    {
      type: 'stage',
      name: '发布',
      code: 'stage_03'
    },
    {
      type: 'stage',
      name: '原型机',
      code: 'stage_11'
    },
    {
      type: 'stage',
      name: '研发样机',
      code: 'stage_12'
    },
    {
      type: 'stage',
      name: '销售样机',
      code: 'stage_13'
    },
    {
      type: 'stage',
      name: '量产',
      code: 'stage_14'
    },
    {
      type: 'stage',
      name: '停产',
      code: 'stage_15'
    },
    {
      type: 'dept',
      name: '视频产品线',
      code: 'dept_01'
    },
    {
      type: 'dept',
      name: '同步产品线',
      code: 'dept_02'
    },
    {
      type: 'dept',
      name: '云显产品线',
      code: 'dept_03'
    },
    {
      type: 'package',
      name: '硬件',
      code: 'package_01'
    },
    {
      type: 'package',
      name: '软件',
      code: 'package_02'
    }
  ],
  user: [
    {
      name: 'qss',
      code: 'Nova0001',
      username: 'qss',
      password: md5('qss'),
      phone: '88888888',
      email: 'qss@novastar.tech',
      remark: '强树树',
      createdBy: 0,
      updatedBy: 0
    },
    {
      name: 'muyuan',
      code: 'Nova0002',
      username: 'muyuan',
      password: md5('muyuan'),
      phone: '88888888',
      email: 'muyuan@novastar.tech',
      remark: '穆远',
      createdBy: 0,
      updatedBy: 0
    }
  ],
  role: [
    {
      name: 'admin',
      remark: 'admin',
      createdBy: 0,
      updatedBy: 0
    }
  ],
  config: [
    {
      type: 'service',
      createdBy: 0,
      updatedBy: 0
    }
  ],
  acl: [
    {
      name: '权限管理',
      url: '',
      code: 'QXGL',
      remark: '',
      createdBy: 0,
      updatedBy: 0
    },
    {
      name: '用户管理',
      url: '',
      code: 'YHGL',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 1
    },
    {
      name: '用户查询',
      url: 'get/users',
      code: 'YHCX',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 2
    },
    {
      name: '用户新增',
      url: 'post/users',
      code: 'YHXZ',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 2
    },
    {
      name: '用户修改',
      url: 'put/users',
      code: 'YHXG',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 2
    },
    {
      name: '用户删除',
      url: 'delete/users',
      code: 'YHSC',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 2
    },
    {
      name: '用户设置状态',
      url: 'post/setUserStatus',
      code: 'YHSZZT',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 2
    },
    {
      name: '角色管理',
      url: '',
      code: 'JSGL',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 1
    },
    {
      name: '角色查询',
      url: 'get/roles',
      code: 'JSCX',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 8
    },
    {
      name: '角色新增',
      url: 'post/roles',
      code: 'JSXZ',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 8
    },
    {
      name: '角色修改',
      url: 'put/roles',
      code: 'JSXG',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 8
    },
    {
      name: '角色删除',
      url: 'delete/roles',
      code: 'JSSC',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 8
    },
    {
      name: '角色设置状态',
      url: 'post/setRoleStatus',
      code: 'JSSZZT',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 8
    },
    {
      name: '角色授权',
      url: 'post/setAuthorize',
      code: 'JSSQ',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 8
    },
    {
      name: '用户角色',
      url: 'get/getUserRoles',
      code: 'YHJS',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 8
    },
    {
      name: '功能管理',
      url: '',
      code: 'GNGL',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 1
    },
    {
      name: '功能查询',
      url: 'get/acls',
      code: 'GNCX',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 16
    },
    {
      name: '功能新增',
      url: 'post/acls',
      code: 'GNXZ',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 16
    },
    {
      name: '功能修改',
      url: 'put/acls',
      code: 'GNXG',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 16
    },
    {
      name: '功能删除',
      url: 'delete/acls',
      code: 'GNSC',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 16
    },
    {
      name: '功能设置状态',
      url: 'post/setAclStatus',
      code: 'GNSZZT',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 16
    },
    {
      name: '用户功能',
      url: 'get/getUserAclTree',
      code: 'YHGN',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 16
    },
    {
      name: '用户权限码',
      url: 'get/getUserAclCodes',
      code: 'YHQXM',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 16
    },
    {
      name: '角色功能',
      url: 'get/getRoleAcls',
      code: 'JSGN',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 16
    },
    {
      name: '产品管理',
      url: '',
      code: 'CPGL',
      remark: '',
      createdBy: 0,
      updatedBy: 0
    },
    {
      name: '产品查询',
      url: '',
      code: 'CPCX',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 25
    },
    {
      name: '产品新增',
      url: '',
      code: 'CPXZ',
      remark: '',
      createdBy: 0,
      updatedBy: 0,
      parentId: 25
    }
  ]
};
