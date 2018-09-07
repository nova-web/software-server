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
      type: {
        type: STRING(20),
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      name: {
        type: STRING,
        defaultValue: ''
      },
      code: {
        type: STRING(20),
        validate: {
          notEmpty: true
        },
        allowNull: false
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
