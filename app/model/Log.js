'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE, TEXT } = Sequelize;

  const Log = app.model.define(
    'sys_log',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      target: {
        type: STRING(30),
        comment: '操作对象'
      },
      operateType: {
        field: 'operate_type',
        type: INTEGER,
        validate: {
          isIn: {
            args: [[0, 1, 2]],
            msg: '无效状态码'
          }
        },
        defaultValue: 1,
        comment: '操作类型：0新增|1修改|2删除3授权|4试用|5撤回|6发布|7下架'
      },
      ip: {
        field: 'ip',
        type: STRING(30),
        comment: '操作主机ip'
      },
      operateContent: {
        field: 'operate_content',
        type: TEXT,
        comment: '操作内容'
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

  Log.sync().then(function(result) {
    console.log('同步Log表成功');
  });

  return Log;
};
