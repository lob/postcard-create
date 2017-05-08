'use strict';

var expect  = require('chai').expect;
var Angular = require('angular');
var Sinon   = require('sinon');
var Config  = require('../../config');

var $q;
var $rootScope;
var API;
var Postcard;

require('angular-mocks');

describe('postcard service', function () {

  beforeEach(Angular.mock.inject(function ($injector) {
     $q         = $injector.get('$q');
     $rootScope = $injector.get('$rootScope');
     API        = $injector.get('API');
     Postcard   = $injector.get('Postcard');
  }));

  describe('create', function () {

    it('calls the correct endpoint and with correct params', function () {
      var payload = { id: 'psc_id' };

      Sinon.stub(API, 'post').returns($q.resolve());

      Postcard.create(payload);

      $rootScope.$apply();

      expect(API.post.firstCall.args[0]).to.eql(Config.API_HOST + '/postcards');
      expect(API.post.firstCall.args[1]).to.eql(payload);
      // Ask questions over what above is actually asserting?
      
      API.post.restore();
    });

  });

});

