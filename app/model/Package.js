'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE, TEXT } = Sequelize;

  const Package = app.model.define(
    'sys_package',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      versions: {
        type: STRING(20),
        defaultValue: ''
      },
      fit_pro: {
        type: STRING,
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
      remark: {
        type: TEXT,
        defaultValue: ''
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

  // Package.sync().then(function(result) {
  //   console.log('同步Package表成功');
  // });

  return Package;
};
