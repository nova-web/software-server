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
      name: '开发版',
      code: 'stage_01'
    },
    {
      type: 'stage',
      name: 'beta版',
      code: 'stage_02'
    },
    {
      type: 'stage',
      name: '正式版',
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
      name: '试产',
      code: 'stage_13'
    },
    {
      type: 'stage',
      name: '销售样机',
      code: 'stage_14'
    },
    {
      type: 'stage',
      name: '量产',
      code: 'stage_15'
    },
    {
      type: 'stage',
      name: '停产',
      code: 'stage_16'
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
    }
  ],
  user: [
    {
      date: new Date(),
      username: 'admin',
      password: 'admin',
      phone: '88888888',
      email: 'admin@admin.com',
      remark: '超级管理员',
      createBy: 'init',
      updateBy: 'init'
    }
  ],
  role: [
    {
      name: 'admin',
      remark: '超级管理员拥有一切权利',
      createBy: 'init',
      updateBy: 'init'
    }
  ],
  config: [
    {
      type: 'service',
      createBy: 'init',
      updateBy: 'init'
    }
  ]
};
