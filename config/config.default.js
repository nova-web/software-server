'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531883447101_6558';

  // add your config here
  config.middleware = [];

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

  //静态资源配置TODO
  // config.assets = {
  //   publicPath: '/public/',
  //   devServer: {
  //     debug: false,
  //     command: 'roadhog dev',
  //     port: 7003,
  //     env: {
  //       BROWSER: 'none',
  //       ESLINT: 'none',
  //       SOCKET_SERVER: 'http://127.0.0.1:7003',
  //       PUBLIC_PATH: 'http://127.0.0.1:7003'
  //     }
  //   }
  // };

  config.onerror = {
    all(err, ctx) {}
  };

  config.passportLocal = {
    usernameField: 'username',
    passwordField: 'password'
  };

  return config;
};
