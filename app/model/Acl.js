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
      parentId: {
        field: 'parent_id',
        type: INTEGER,
        comment: '父权限id'
      },
      code: {
        type: STRING(30),
        unique: {
          msg: '权限码重复'
        },
        validate: {
          notEmpty: true
        },
        comment: '权限码'
      },
      url: {
        type: STRING(30),
        allowNull: false,
        comment: '权限url'
      },
      name: {
        unique: {
          msg: '权限名称重复'
        },
        type: STRING(30),
        comment: '权限名称'
      },
      remark: {
        type: STRING
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

  Acl.sync().then(function(result) {
    console.log('同步Acl表成功');
  });

  return Acl;
};
