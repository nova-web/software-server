'use strict';

// had enabled by egg
// exports.static = true;
// exports.nunjucks = {
//   enable: true,
//   package: 'egg-view-nunjucks'
// };

exports.mysql = {
  enable: true,
  package: 'egg-mysql'
};

exports.validate = {
  enable: true,
  package: 'egg-validate'
};

exports.sequelize = {
  enable: false,
  package: 'egg-sequelize'
};

// exports.assets = {
//   enable: true,
//   package: 'egg-view-assets'
// };
