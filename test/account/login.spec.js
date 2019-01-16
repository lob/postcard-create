'use strict';

var expect  = require('chai').expect;
var Angular = require('angular');
var Sinon   = require('sinon');

require('angular-mocks');

var session = { tokens: { test: 'banana', live: 'apple' }, user: { id: 'user_id' } };
var error = { message: 'error message' };

describe('login controller', function () {

  var $controller;
  var $cookies;
  var $q;
  var $scope;
  var $state;
  var Auth;
  var Recaptcha;

  beforeEach(Angular.mock.inject(function ($injector) {
    $controller = $injector.get('$controller');
    $cookies    = $injector.get('$cookies');
    $q          = $injector.get('$q');
    $scope      = $injector.get('$rootScope').$new();
    $state      = $injector.get('$state');
    Auth        = $injector.get('Auth');
    Recaptcha   = $injector.get('vcRecaptchaService');
  }));

  describe('setWidgetId', function () {

    it('sets widgetId', function () {
      var widgetId = 'recaptcha1';

      $controller('LoginCtrl', { $scope: $scope, $state: $state });

      $scope.setWidgetId(widgetId);

      expect($scope.widgetId).to.eql(widgetId);
    });
  });

  describe('cbExpiration', function () {

    it('reloads the recaptcha', function () {
      var recaptchaMock = Sinon.mock(Recaptcha);

      $controller('LoginCtrl', { $scope: $scope, $state: $state });

      recaptchaMock.expects('reload').returns($q.resolve({}));

      $scope.cbExpiration();
      $scope.$apply();

      recaptchaMock.verify();
    });

  });

  describe('login', function () {

    beforeEach(function () {
      $controller('LoginCtrl', { $scope: $scope, $state: $state });

      $scope.$apply();

      Sinon.stub(Recaptcha, 'reload');
      Sinon.stub(Recaptcha, 'getResponse').returns('token');
    });

    it('sets the token cookie', function () {
      Sinon.stub(Auth, 'login').returns($q.resolve(session));

      $scope.login({});

      $scope.$apply();

      expect($cookies.get('token')).to.eql(session.tokens.test);
    });

    it('sets the user cookie', function () {
      Sinon.stub(Auth, 'login').returns($q.resolve(session));

      $scope.login({});

      $scope.$apply();

      expect($cookies.getObject('user')).to.eql(session.user);
    });

    it('sets error if an error is returned', function () {
      Sinon.stub(Auth, 'login').returns($q.reject(error));

      $scope.login({});

      $scope.$apply();

      expect($scope.error).to.eql(error.message);
    });

  });

});
