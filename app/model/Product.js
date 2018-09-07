'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE } = Sequelize;

  const Product = app.model.define(
    'nova_product',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      modelId: {
        field: 'model_id',
        type: STRING(20),
        defaultValue: ''
      },
      name: {
        type: STRING(20),
        defaultValue: ''
      },
      proModel: {
        type: STRING(20),
        field: 'pro_model',
        comment: '产品型号'
      },
      type: {
        type: INTEGER(20),
        defaultValue: 1,
        comment: '种类：1硬件|0软件'
      },
      proStatus: {
        field: 'pro_status',
        type: INTEGER(20),
        defaultValue: 0,
        comment: '种类：0未发布|2已试用|1已发布|3已下架'
      },
      version: {
        type: STRING(20),
        defaultValue: ''
      },
      status: {
        type: INTEGER(20),
        defaultValue: 1,
        comment: '状态：1有效|0无效|2删除'
      },
      stage: {
        type: INTEGER(20),
        defaultValue: 0,
        comment: '阶段：软件--1开发版 2beta版 3正式版 | 硬件--11原型机 12研发样机 13试产 14销售样机 15量产 16停产'
      },
      area: {
        type: INTEGER(20),
        defaultValue: 1,
        comment: '范围：1国内 | 0国外'
      },
      dept: {
        type: INTEGER(20),
        defaultValue: 1,
        comment: '产品线：1视频 | 2同步 | 3云显'
      },
      projectManager: {
        field: 'project_manager',
        type: STRING,
        defaultValue: '',
        comment: '项目经理'
      },
      productDesc: {
        field: 'product_desc',
        type: STRING,
        defaultValue: '',
        comment: '产品简介'
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

  Product.sync().then(function(result) {
    console.log('同步Product表成功');
  });

  return Product;
};
