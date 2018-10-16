const md5 = require('md5');

module.exports = {
  dict: [
    {
      type: 'area',
      name: '国内',
      code: 'area_01'
    },
    {
      type: 'area',
      name: '国外',
      code: 'area_02'
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
      name: '用户1',
      code: 'Nova0001',
      username: 'user1',
      password: md5('user1'),
      phone: '88888888',
      email: 'user1@novastar.tech',
      remark: 'user1',
      createdBy: 0,
      updatedBy: 0
    },
    {
      name: '用户2',
      code: 'Nova0002',
      username: 'user2',
      password: md5('user2'),
      phone: '88888888',
      email: 'user2@novastar.tech',
      remark: 'user2',
      createdBy: 0,
      updatedBy: 0
    },
    {
      name: '用户3',
      code: 'Nova0003',
      username: 'user3',
      password: md5('user3'),
      phone: '88888888',
      email: 'user3@novastar.tech',
      remark: 'user3',
      createdBy: 0,
      updatedBy: 0
    }
  ],
  role: [
    {
      name: '角色1',
      remark: 'role1',
      createdBy: 0,
      updatedBy: 0
    },
    {
      name: '角色2',
      remark: 'role2',
      createdBy: 0,
      updatedBy: 0
    },
    {
      name: '角色3',
      remark: 'role3',
      createdBy: 0,
      updatedBy: 0
    }
  ],
  config: [
    {
      type: 'service',
      createdBy: 1,
      updatedBy: 1
    }
  ],
  acl: [
    {
      name: '产品管理',
      url: '',
      code: 'CPGL',
      remark: '',
      createdBy: 1,
      updatedBy: 1
    },
    {
      name: '权限管理',
      url: '',
      code: 'QXGL',
      remark: '',
      createdBy: 1,
      updatedBy: 1
    },
    {
      name: '用户管理',
      url: '',
      code: 'YHGL',
      remark: '',
      createdBy: 1,
      updatedBy: 1,
      parentId: 2
    },
    {
      name: '用户新增',
      url: 'post/users',
      code: 'YHXZ',
      remark: '',
      createdBy: 1,
      updatedBy: 1,
      parentId: 3
    },
    {
      name: '用户修改',
      url: 'put/users',
      code: 'YHXG',
      remark: '',
      createdBy: 1,
      updatedBy: 1,
      parentId: 3
    },
    {
      name: '用户删除',
      url: 'delete/users',
      code: 'YHSC',
      remark: '',
      createdBy: 1,
      updatedBy: 1,
      parentId: 3
    }
  ]
};
