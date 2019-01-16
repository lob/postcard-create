'use strict';

module.exports = function ($scope, $cookies, $state, Auth, vcRecaptchaService) {

  $scope.loading = false;
  $scope.error = null;

  $scope.setWidgetId = function (widgetId) {
    $scope.widgetId = widgetId;
  }

  $scope.cbExpiration = function () {
    vcRecaptchaService.reload($scope.widgetId);
  }

  $scope.login = function (user) {
    $scope.loading = true;
    $scope.error = null;

    user.recaptcha_token = vcRecaptchaService.getResponse($scope.widgetId);

    Auth.login(user)
    .then(function (session) {
      $cookies.put('token', session.tokens.test);
      $cookies.putObject('user', session.user);
      return $state.go('home');
    })
    .catch(function (err) {
      $scope.error = err.message;
    })
    .finally(function () {
      $scope.cbExpiration();
      $scope.loading = false;
    });
  };

};
