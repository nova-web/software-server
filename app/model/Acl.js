'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE } = Sequelize;

  const Acl = app.model.define(
    'sys_acl',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: STRING(20),
        defaultValue: ''
      },
      name: {
        type: STRING(20),
        defaultValue: ''
      },
      status: {
        type: INTEGER,
        defaultValue: 1,
        comment: '状态：1有效|0无效|2删除'
      },
      nodeId: {
        field: 'node_id',
        type: INTEGER,
        defaultValue: 0
      },
      parentId: {
        field: 'parent_id',
        type: INTEGER,
        defaultValue: 0
      },
      remark: {
        type: STRING,
        defaultValue: ''
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

  // Acl.sync().then(function(result) {
  //   console.log('同步Acl表成功');
  // });

  return Acl;
};
