'use strict';

module.exports = function ($scope, Postcard) {

  $scope.loading = false;
  $scope.error = null;
  $scope.postcard = null;

  $scope.create = function (payload) {

    $scope.payload = { mail_type: 'usps_first_class' };
    $scope.loading = true;
    $scope.error = null;
    $scope.postcard = null;

    Postcard.create(payload)
    .then(function (postcard) {
      $scope.postcard = postcard;
    })
    .catch(function (err) {
      $scope.error = err.message;
    })
    .finally(function () {
      $scope.loading = false;
    });
  };

};
