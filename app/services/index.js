'use strict';

var Angular = require('angular');
var Cookies = require('angular-cookies');

var API       = require('./api');
var Auth      = require('./auth');
var Session   = require('./session');
var Postcard = require('./postcard');

module.exports = Angular.module('postcard-create.services', [
  Cookies
])
.factory('API', API)
.factory('Auth', Auth)
.factory('Postcard', Postcard)
.factory('Session', Session)
.name;
