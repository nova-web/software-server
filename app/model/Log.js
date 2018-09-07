'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE } = Sequelize;

  const Syslog = app.model.define(
    'sys_log',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      target: {
        type: STRING,
        defaultValue: ''
      },
      operateType: {
        field: 'operate_type',
        type: INTEGER,
        defaultValue: 1,
        comment: '操作类型：1新增|0修改|2删除'
      },
      ip: {
        type: STRING,
        defaultValue: 'ip地址',
        comment: '操作时间'
      },
      operateTime: {
        type: STRING,
        defaultValue: '',
        comment: '操作时间'
      },
      operateContent: {
        field: 'operate_content',
        type: STRING,
        defaultValue: '',
        comment: '操作内容'
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

  Syslog.sync().then(function(result) {
    console.log('同步Syslog表成功');
  });

  return Syslog;
};
