(function(){
  'use strict';

  angular
    .module('app.signup', ['theApp'])
    .controller('signupController', signupController);

  signupController.$inject = ['$scope', 'auth', '$window', '$http'];

  function signupController ($scope, auth, $window, $http) {
    $scope.signUp = signUp;

    function signUp (firstName, lastName, username, email, password) {
      $http({
        method: 'POST',
        url: '/signup',
        data: {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password
        }
      });
      window.location.href = "/#/login"
      console.log('sent post req from signup controller');
    };
  }
})();
