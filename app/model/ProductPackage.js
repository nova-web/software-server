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
      type: {
        type: STRING(30),
        validate: {
          isIn: {
            args: [['version_01', 'version_02']],
            msg: '版本类型码无效'
          }
        },
        defaultValue: 'version_01',
        comment: '版本类型：软件--1体验版 2正式版'
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
