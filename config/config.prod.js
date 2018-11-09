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
    ignore: ['/login', '/package/newlist', '/product/report']
  };
  //不检查用户
  config.checkuser = {
    ignore: ['/login', '/package/newlist', '/product/report']
  };
  //不检查权限
  config.checkauth = {
    ignore: ['/login', '/package/newlist', '/product/report', '/getUserAclCodes', '/dict', '/product/all', '/getUserAclTree']
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
    logging: false
    // define: { raw: true }
  };

  // config.view = {
  //   mapping: {
  //     '.js': 'assets'
  //   }
  // };

  // //静态资源配置TODO
  //   config.assets = {
  //     publicPath: '/public/',
  //     devServer: {
  //       debug: false,
  //       command: 'umi dev',
  //       port: 7001,
  //       env: {
  //         APP_ROOT: process.cwd() + '/app/assets',
  //         BROWSER: 'none',
  //         ESLINT: 'none',
  //         // SOCKET_SERVER: 'http://127.0.0.1:7003',
  //         PUBLIC_PATH: 'http://127.0.0.1:7001'
  //       }
  //     }
  //   };

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public')
  };

  config.onerror = {
    all(err, ctx) {}
  };

  config.jwt = {
    secret: 'nova-eus-token',
    exp: 360000 //秒
  };

  config.apihost = 'http://172.16.6.203:7002';

  config.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostname: '0.0.0.0'
    }
  };

  return config;
};
