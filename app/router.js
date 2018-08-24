'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.get('/user', controller.user.list);
  router.resources('topics3', '/api/v2/topics', controller.topics);
  router.resources('upload', '/upload', controller.upload);
};
