'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531883447101_6558';
  config.adminPassword = 'admin';

  // add your config here
  config.middleware = ['checktoken', 'checkuser', 'checkauth'];
  //不检查登录
  config.checktoken = {
    ignore: ['/login', '/package/newlist', '/product/report', '/upload*']
  };
  //不检查用户
  config.checkuser = {
    ignore: ['/login', '/package/newlist', '/product/report', '/upload*']
  };
  //不检查权限
  config.checkauth = {
    ignore: ['/login', '/package/newlist', '/product/report', '/upload*', '/getUserAclCodes', '/dict', '/product/all', '/getUserAclTree', '/package/preAdd', '/package/preUpdate']
  };

  config.security = {
    // csrf: {
    //   headerName: 'x-csrf-token'
    // }
    csrf: false
  };

  config.pageSize = 10;

  config.sequelize = {
    dialect: 'mysql',
    host: '172.16.6.188',
    password: 'root',
    port: 3306,
    database: 'software-upgrade',
    username: 'root',
    timezone: '+08:00', //东八时区
    logging: true
  };

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public')
  };

  config.onerror = {
    all(err, ctx) {}
  };

  config.jwt = {
    secret: 'nova-eus-token',
    exp: 3600 //秒
  };

  config.apihost = 'http://172.16.6.188:7001';

  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '0.0.0.0'
    }
  };

  return config;
};
