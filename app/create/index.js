'use strict';

var Angular = require('angular');

var Controller = require('./controller');
var State = require('./state');

module.exports = Angular.module('postcard-create.create', [])
.config(State)
.controller('CreateCtrl', Controller)
.name;
