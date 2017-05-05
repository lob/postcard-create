'use strict';

var Config = require('../../config');

module.exports = function (API) {

  var Postcard = {};

  Postcard.url = Config.API_HOST + '/postcards';

  Postcard.create = function (payload) {
    return API.post(this.url, payload);
  };

  return Postcard;

};
