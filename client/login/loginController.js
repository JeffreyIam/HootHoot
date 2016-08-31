(function() {
  'use strict';

  angular
    .module('app.login',['theApp'])
    .controller('loginController', loginController);

  loginController.$inject = ['$scope', '$http', 'auth', '$location','$window', 'SocketService'];

  function loginController($scope, $http, auth, $location, $window, SocketService) {
    $scope.auth = auth;
    $scope.login = login;

    function login(email, password) {
      return $http({
        method: 'POST',
        url: '/',
        data: {email: email, password: password}
      })
      .then(function (resp) {
        if(resp.data.token) {
          $window.sessionStorage.setItem('token', resp.data.token);
          $window.localStorage.setItem('token', resp.data.token);
          $window.localStorage.setItem('userId', resp.data.id)
          $window.localStorage.setItem('email', resp.data.email);
          $scope.id = $window.localStorage.getItem('userId');
          SocketService.register();
          $location.path('/chat');
        } else {
          $location.path('/');
        }
      });
    }
  }
})();