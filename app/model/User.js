'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE } = Sequelize;

  const User = app.model.define(
    'sys_user',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: STRING(20),
        defaultValue: ''
      },
      password: {
        type: STRING(20),
        defaultValue: ''
      },
      phone: {
        type: STRING,
        defaultValue: ''
      },
      email: {
        type: STRING,
        defaultValue: ''
      },
      remark: {
        type: STRING,
        defaultValue: ''
      },
      status: {
        type: INTEGER,
        defaultValue: 1,
        comment: '状态：1有效|0无效|2删除'
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

  app.beforeStart(async () => {
    console.log('---------', app.model.Acl);
    // RoleUser.belongsTo(User);
    // User.hasMany(Task);
    // const RoleUser = app.model.import('./RoleUser');
    // User.belongsToMany(app.model.Role, { through: app.model.RoleUser });
    // app.model.Role.belongsToMany(User, { through: app.model.RoleUser });

    User.belongsToMany(app.model.Role, { through: app.model.RoleUser, foreignKey: 'userId' });
    app.model.Role.belongsToMany(User, { through: app.model.RoleUser, foreignKey: 'roleId' });
    await app.model.sync();
  });

  User.sync().then(function(result) {
    console.log('同步User表成功');
  });

  return User;
};
