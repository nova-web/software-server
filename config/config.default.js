'use strict';

exports.keys = '_1531883447101_6558';
// 添加 view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks'
  }
};

exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0'
};

exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: '172.16.6.121',
    // host: 'localhost',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: 'root',
    // 数据库名
    database: 'onlinedb'
    // database: 'mysql'
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false
};

exports.security = {
  csrf: false
};

// module.exports = appInfo => {
//   const config = (exports = {});

//   // use for cookie sign key, should change to your own and keep security
//   config.keys = appInfo.name + '_1531883447101_6558';

//   // add your config here
//   config.middleware = [];

//   return config;
// };