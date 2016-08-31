(function() {
  'use strict';

  angular
    .module('theApp')
    .run(runBlock);

  runBlock.$inject = ['$rootScope', '$location', '$window', 'SocketService', 'store', 'auth'];

  function runBlock ($rootScope, $location, $window, SocketService, store, auth) {

    var isAuth = function() {
      return !!$window.sessionStorage.getItem('token');
    };
    var profile = store.get('profile');
    var userid =  profile ? profile.nickname : $window.localStorage.getItem('userId');

    if (isAuth()) {
      SocketService.register();
    }

    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
      if($location.path() == '/' || $location.path() == '/signup' || $location.path() == '/login') {
        console.log('This page does not need authentication')
      }else if(!isAuth()){
          console.log('not authenticated')
          $location.path('/');
      }
    });

    auth.hookEvents();
  }
})();
