'use strict';

var expect  = require('chai').expect;
var Angular = require('angular');
var Sinon   = require('sinon');

require('angular-mocks');

describe('create controller', function () {

  var $controller;
  var $q;
  var $scope;
  var Postcard;

  beforeEach(Angular.mock.inject(function ($injector) {
    $controller = $injector.get('$controller');
    $q          = $injector.get('$q');
    $scope      = $injector.get('$rootScope').$new();
    Postcard    = $injector.get('Postcard');
  }));

  describe('create', function () {

    beforeEach(function () {
      $controller('CreateCtrl', {
        $scope: $scope
      });

      $scope.$apply();
    });

    it('exposes the newly created postcard', function () {
      var payload = { front: 'front', back: 'back' };
      var postcard = { id: 'psc_id' };

      Sinon.stub(Postcard, 'create').returns($q.resolve(postcard));

      $scope.create(payload);

      $scope.$apply();

      expect($scope.postcard).to.eql(postcard);
      expect($scope.error).to.not.exist;
    });

    it('exposes the error if an error is returned', function () {
      var payload = { front: 'front', back: 'back' };
      var message = 'banana phone';

      Sinon.stub(Postcard, 'create').returns($q.reject(new Error(message)));

      $scope.create(payload);

      $scope.$apply();

      expect($scope.error).to.eql(message);
      expect($scope.postcard).to.not.exist;
    });

  });

});
