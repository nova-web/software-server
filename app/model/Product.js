'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE, TEXT } = Sequelize;

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
        comment: '设备modelId'
      },
      name: {
        type: STRING(30),
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
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '项目经理'
      },
      type: {
        type: STRING(30),
        validate: {
          isIn: {
            args: [['package_01', 'package_02']],
            msg: '非法状态码'
          }
        },
        defaultValue: 'package_01',
        comment: '软硬件：1硬件|2软件'
      },
      stage: {
        type: STRING(30),
        validate: {
          isIn: {
            args: [['stage_01', 'stage_02', 'stage_03', 'stage_11', 'stage_12', 'stage_13', 'stage_14', 'stage_15']],
            msg: '非法状态码'
          }
        },
        defaultValue: 'stage_13',
        comment: '产品阶段：软件--1开发 2测试 3发布 | 硬件--11原型机 12研发样机 13销售样机 14量产 15停产'
      },
      area: {
        type: STRING(30),
        validate: {
          isIn: {
            args: [['area_01', 'area_02']],
            msg: '非法状态码'
          }
        },
        defaultValue: 'area_01',
        comment: '产品所属区域：1国内 | 2国外'
      },
      dept: {
        type: STRING(30),
        validate: {
          isIn: {
            args: [['dept_01', 'dept_02', 'dept_03']],
            msg: '非法状态码'
          }
        },
        defaultValue: 'dept_01',
        comment: '产品线：1视频 | 2同步 | 3云显'
      },
      publishState: {
        field: 'publish_state',
        type: STRING(30),
        validate: {
          isIn: {
            args: [['pro_state_01', 'pro_state_02', 'pro_state_03', 'pro_state_04']],
            msg: '非法状态码'
          }
        },
        defaultValue: 'pro_state_01',
        comment: '发布状态：1未发布 | 2已试用 | 3已发布 | 4已下架'
      },
      version: {
        type: STRING(30),
        comment: '版本号'
      },
      productDesc: {
        field: 'product_desc',
        type: TEXT,
        comment: '产品简介'
      },
      status: {
        type: INTEGER,
        validate: {
          isIn: {
            args: [[0, 1, 2]],
            msg: '非法状态码'
          }
        },
        defaultValue: 1,
        comment: '状态：1有效|0无效|2删除'
      },
      createdBy: {
        field: 'created_by',
        type: STRING
      },
      updatedBy: {
        field: 'udpated_by',
        type: STRING
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
