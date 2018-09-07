'use strict';

var moment = require('moment');
var dbData = require('../../db');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE } = Sequelize;

  const Dict = app.model.define(
    'sys_dict',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '姓名'
      },
      type: {
        type: STRING(20),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '类别'
      },
      code: {
        type: STRING(20),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '字典代码'
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Dict.sync().then(function(result) {
    console.log('同步Dict表成功', result);
    Dict.bulkCreate(dbData.dict);
  });

  return Dict;
};
