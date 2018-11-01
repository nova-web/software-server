'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE, TEXT, BLOB } = Sequelize;

  const Product = app.model.define(
    'nova_product',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      modelId: {
        field: 'model_id',
        type: STRING(30),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '设备modelId'
      },
      name: {
        type: STRING(30),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '产品名称'
      },
      model: {
        field: 'model',
        type: STRING(30),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '产品型号'
      },
      projectManager: {
        field: 'project_manager',
        type: STRING(30),
        comment: '项目经理'
      },
      type: {
        type: STRING(30),
        validate: {
          isIn: {
            args: [['package_01', 'package_02']],
            msg: '无效产品类型'
          }
        },
        defaultValue: 'package_01',
        comment: '产品类型：1硬件|2软件'
      },
      stage: {
        type: STRING(30),
        validate: {
          isIn: {
            args: [['stage_01', 'stage_02', 'stage_03', 'stage_11', 'stage_12', 'stage_13', 'stage_14', 'stage_15']],
            msg: '无效产品阶段'
          }
        },
        defaultValue: 'stage_13',
        comment: '产品阶段：软件--1开发 2测试 3发布 | 硬件--11原型机 12研发样机 13销售样机 14量产 15停产'
      },
      area: {
        type: STRING(30),
        validate: {
          isIn: {
            args: [['area_01', 'area_02', 'area_03']],
            msg: '无效区域'
          }
        },
        defaultValue: 'area_01',
        comment: '产品所属区域：1全国 | 2国内 | 3国外'
      },
      dept: {
        type: STRING(30),
        validate: {
          isIn: {
            args: [['dept_01', 'dept_02', 'dept_03']],
            msg: '无效产品线'
          }
        },
        defaultValue: 'dept_01',
        comment: '所属产品线：1视频 | 2同步 | 3云显'
      },
      publishStatus: {
        field: 'publish_status',
        type: STRING(30),
        validate: {
          isIn: {
            args: [['pro_status_01', 'pro_status_02', 'pro_status_03', 'pro_status_04']],
            msg: '无效发布状态'
          }
        },
        defaultValue: 'pro_status_01',
        comment: '发布状态：1未发布 | 2已试用 | 3已发布 | 4已下架'
      },
      fitPro: {
        field: 'fit_pro',
        type: STRING,
        comment: '适配产品'
      },
      productDesc: {
        field: 'product_desc',
        type: TEXT,
        comment: '产品简介'
      },
      logo: {
        field: 'logo',
        type: BLOB,
        comment: '产品示意图'
      },
      service: {
        type: INTEGER,
        validate: {
          isIn: {
            args: [[0, 1]],
            msg: '操作异常'
          }
        },
        defaultValue: 1,
        comment: '更新开关：0关闭 | 1开启'
      },
      serviceTime: {
        field: 'service_time',
        type: DATE,
        get(val) {
          let time = this.getDataValue(val);
          if (time) {
            time = moment(time).format('YYYY-MM-DD HH:mm:ss');
          }
          return time || '';
        },
        set(val) {
          return this.setDataValue('serviceTime', moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
        },
        comment: '更新开关的时间'
      },
      status: {
        type: INTEGER,
        validate: {
          isIn: {
            args: [[0, 1, 2]],
            msg: '无效状态码'
          }
        },
        defaultValue: 1,
        comment: '状态：1有效|0无效|2删除'
      },
      createdBy: {
        field: 'created_by',
        type: INTEGER
      },
      updatedBy: {
        field: 'updated_by',
        type: INTEGER
      },
      createdAt: {
        field: 'created_at',
        type: DATE,
        get(val) {
          let time = this.getDataValue(val);
          if (time) {
            time = moment(time).format('YYYY-MM-DD HH:mm:ss');
          }
          return time || '';
        },
        set(val) {
          return this.setDataValue(val, Sequelize.NOW);
        }
      },
      updatedAt: {
        field: 'updated_at',
        type: DATE,
        get(val) {
          let time = this.getDataValue(val);
          if (time) {
            time = moment(time).format('YYYY-MM-DD HH:mm:ss');
          }
          return time || '';
        },
        set(val) {
          return this.setDataValue(val, Sequelize.NOW);
        }
      }
    },
    {
      freezeTableName: true
    }
  );

  Product.sync().then(function(result) {
    console.log('同步Product表成功');
  });

  return Product;
};
