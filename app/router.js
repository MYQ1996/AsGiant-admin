'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/addUser', controller.home.addUser);
  router.get('/user/signin', controller.user.signin);


};
