'use strict';

var Config = require('../config');

module.exports = function ($urlRouterProvider, vcRecaptchaServiceProvider) {

  $urlRouterProvider.otherwise('/');
  vcRecaptchaServiceProvider.setSiteKey(Config.GOOGLE_RECAPTCHA_KEY);

};
