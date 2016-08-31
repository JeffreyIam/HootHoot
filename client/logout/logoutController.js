(function() {
  'use strict';

  angular
    .module('app.logout', ['theApp', 'ui.bootstrap'])
    .controller('logoutController', logoutController);

  logoutController.$inject = ['$scope', '$window', '$location' , 'SocketService'];

  function logoutController($scope, $window, $location, SocketService) {

    $scope.logout = logout;

    function logout() {
      $window.localStorage.clear();
      $window.sessionStorage.clear();
    }
  }
})();
