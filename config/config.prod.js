'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});

  config.sequelize = {
    dialect: 'mysql',
    host: '172.16.6.203',
    password: 'root',
    port: 3306,
    database: 'v_eus',
    username: 'root',
    timezone: '+08:00', //东八时区
    logging: false
  };

  config.apihost = 'http://172.16.6.203:7002';

  config.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostname: '0.0.0.0'
    }
  };

  config.logger = {
    consoleLevel: 'DEBUG'
  };

  return config;
};
