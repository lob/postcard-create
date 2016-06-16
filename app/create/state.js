'use strict';

var HTML = require('../views/create.html');

module.exports = function ($stateProvider) {

  $stateProvider.state('create', {
    url: '/create',
    template: HTML,
    controller: 'CreateCtrl',
    data: {
      authenticated: true
    }
  });

};
