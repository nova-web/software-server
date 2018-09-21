'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531883447101_6558';

  // add your config here
  config.middleware = ['checktoken'];
  config.checktoken = {
    ignore: ['/login', '/packagelist', '/download/*']
  };

  config.security = {
    csrf: false
  };

  config.pageSize = 10;

  config.sequelize = {
    dialect: 'mysql',
    host: '172.16.6.100',
    password: 'root',
    port: 3306,
    database: 'software-upgrade',
    username: 'root',
    timezone: '+08:00' //东八时区
  };

  // config.view = {
  //   mapping: {
  //     '.js': 'assets'
  //   }
  // };

  // //静态资源配置TODO
  // config.assets = {
  //   publicPath: '/public/',
  //   devServer: {
  //     debug: false,
  //     command: 'umi dev',
  //     port: 7001,
  //     env: {
  //       APP_ROOT: process.cwd() + '/app/assets',
  //       BROWSER: 'none',
  //       ESLINT: 'none',
  //       // SOCKET_SERVER: 'http://127.0.0.1:7003',
  //       PUBLIC_PATH: 'http://127.0.0.1:7001'
  //     }
  //   }
  // };

  config.onerror = {
    all(err, ctx) {}
  };

  config.jwt = {
    secret: 'nova-eus-token',
    exp: 10 //秒
  };

  return config;
};
