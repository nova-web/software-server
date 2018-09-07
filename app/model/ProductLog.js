'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE, TEXT } = Sequelize;

  const Package = app.model.define(
    'nova_product_log',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      productId: {
        type: INTEGER,
        allowNull: false,
        comment: '产品id'
      },
      versions: {
        type: STRING(20),
        defaultValue: ''
      },
      url: {
        type: STRING,
        defaultValue: ''
      },
      size: {
        type: STRING,
        defaultValue: ''
      },
      fitPro: {
        filed: 'fit_pro',
        type: STRING,
        defaultValue: '',
        comment: '适应产品'
      },
      versionLog: {
        field: 'version_log',
        type: TEXT,
        defaultValue: '',
        comment: '版本日志'
      },
      publishBy: {
        filed: 'publish_by',
        type: STRING,
        defaultValue: '',
        comment: '发布人'
      },
      status: {
        type: INTEGER,
        defaultValue: 1,
        comment: '状态：1有效|0无效|2删除'
      },
      version_type: {
        type: INTEGER(20),
        defaultValue: 0,
        comment: '类型：1体验版|2正式版'
      },
      createdBy: {
        field: 'created_by',
        type: STRING,
        defaultValue: ''
      },
      updatedBy: {
        field: 'udpated_by',
        type: STRING,
        defaultValue: ''
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

  Package.sync().then(function(result) {
    console.log('同步Package表成功');
  });

  return Package;
};
