'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE, TEXT } = Sequelize;

  const ProductPackage = app.model.define(
    'nova_product_package',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      productId: {
        field: 'product_id',
        type: INTEGER,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '产品id'
      },
      version: {
        type: STRING(30),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '版本'
      },
      url: {
        type: STRING,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '存放路径'
      },
      versionLog: {
        field: 'version_log',
        type: TEXT,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '版本日志'
      },
      publishBy: {
        field: 'publish_by',
        type: STRING(30),
        comment: '发布人'
      },
      stage: {
        type: STRING(30),
        validate: {
          isIn: {
            args: [['stage_01', 'stage_02', 'stage_03', 'stage_11', 'stage_12', 'stage_13', 'stage_14', 'stage_15', 'stage_16']],
            msg: '产品阶段码无效'
          }
        },
        defaultValue: 'stage_11',
        comment: '阶段：软件--1开发版 2beta版 3正式版 | 硬件--11原型机 12研发样机 13试产 14销售样机 15量产 16停产'
      },
      publishStatus: {
        field: 'publish_status',
        type: STRING(30),
        validate: {
          isIn: {
            args: [['pro_status_01', 'pro_status_02', 'pro_status_03', 'pro_status_04']],
            msg: '发布状态码无效'
          }
        },
        defaultValue: 'pro_status_01',
        comment: '发布状态：1未发布 | 2已试用 | 3已发布 | 4已下架'
      },
      size: {
        type: STRING(30),
        comment: '文件大小'
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

  ProductPackage.sync().then(function(result) {
    console.log('同步ProductPackage表成功');
  });

  return ProductPackage;
};
