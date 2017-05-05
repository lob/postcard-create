'use strict';

var Angular = require('angular');
var Controller = require('./controller');
var State = require('./state');

module.exports = Angular.module('postcard-create.create', [])
.controller('CreateCtrl', Controller)
.config(State)
.name;
