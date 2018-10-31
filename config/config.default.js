'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531883447101_6558';
  config.adminPassword = 'admin';

  // add your config here
  config.middleware = ['checktoken', 'checkuser', 'checkauth'];
  config.checktoken = {
    ignore: ['/login']
  };
  config.checkuser = {
    ignore: ['/login']
  };
  config.checkauth = {
    ignore: ['/login', '/getUserAclCodes']
  };

  config.security = {
    csrf: false
  };

  config.pageSize = 10;

  config.sequelize = {
    dialect: 'mysql',
    host: '172.16.6.252',
    password: 'root',
    port: 3306,
    database: 'software-upgrade',
    username: 'root',
    timezone: '+08:00', //东八时区
    logging: true
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
