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
      name: '系统管理员',
      code: 'Nova0000',
      username: 'admin',
      password: md5('admin'),
      phone: '88888888',
      email: 'admin@admin.tech',
      remark: '超级管理员',
      createdBy: 1,
      updatedBy: 1
    },
    {
      name: '用户1',
      code: 'Nova0001',
      username: 'user1',
      password: md5('user1'),
      phone: '88888888',
      email: 'user1@novastar.tech',
      remark: 'user1',
      createdBy: 1,
      updatedBy: 1
    },
    {
      name: '用户2',
      code: 'Nova0002',
      username: 'user2',
      password: md5('user2'),
      phone: '88888888',
      email: 'user2@novastar.tech',
      remark: 'user2',
      createdBy: 1,
      updatedBy: 1
    }
  ],
  role: [
    {
      name: '超级管理员',
      remark: '超级管理员拥有一切权利',
      createdBy: 1,
      updatedBy: 1
    },
    {
      name: '总经理',
      remark: '',
      createdBy: 1,
      updatedBy: 1
    },
    {
      name: '部门经理',
      remark: '',
      createdBy: 1,
      updatedBy: 1
    },
    {
      name: '项目经理',
      remark: '',
      createdBy: 1,
      updatedBy: 1
    },
    {
      name: '普通成员',
      remark: '',
      createdBy: 1,
      updatedBy: 1
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
      code: '0100',
      remark: '',
      createdBy: 1,
      updatedBy: 1
    },
    {
      name: '权限管理',
      code: '0200',
      remark: '',
      createdBy: 1,
      updatedBy: 1
    },
    {
      name: '用户管理',
      code: '0210',
      remark: '',
      createdBy: 1,
      updatedBy: 1,
      parentId: 2
    },
    {
      name: '用户新增',
      code: '0211',
      remark: '',
      createdBy: 1,
      updatedBy: 1,
      parentId: 3
    },
    {
      name: '用户修改',
      code: '0212',
      remark: '',
      createdBy: 1,
      updatedBy: 1,
      parentId: 3
    },
    {
      name: '用户删除',
      code: '0213',
      remark: '',
      createdBy: 1,
      updatedBy: 1,
      parentId: 3
    }
  ]
};
