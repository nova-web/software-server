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

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'mysql'
    },
    app: true,
    agent: false
  };

  config.mysql = {
    client: {
      host: '172.16.6.121',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'onlinedb'
    },
    app: true,
    agent: false
  };

  // 添加 view 配置
  // config.view = {
  //   defaultViewEngine: 'nunjucks',
  //   mapping: {
  //     '.tpl': 'nunjucks'
  //   }
  // };

  // config.view = {
  //   root: path.join(appInfo.baseDir, 'app/assets'),
  //   mapping: {
  //     '.js': 'assets'
  //   }
  // };

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

  return config;
};
