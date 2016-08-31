(function(){
  'use strict';

  angular
    .module('app.config', ['theApp', 'auth0', 'angular-storage', 'angular-jwt', 'ngRoute'])
    .config(myAppConfig);

  myAppConfig.$inject = ['$routeProvider', 'authProvider', '$httpProvider', '$locationProvider', 'jwtInterceptorProvider'];

  function myAppConfig ($routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {

    $routeProvider
    .when('/', {
      templateUrl: 'app/components/home/home.html',
      // controller: 'homedirective'
    })
    .when('/login', {
      templateUrl: 'login/login.html',
      controller: 'loginController'
    })
    .when('/signup', {
      templateUrl: 'signup/signup.html',
      controller: 'signupController'
    })
    .when('/profile', {
      templateUrl: 'profile/profile.html',
      controller: 'profileController'
    })
    .when('/chat', {
      templateUrl: 'app/views/chat.html',
      controller: 'chatController',
      // authenticate: true
    })
    .when('/commands', {
      templateUrl: 'app/components/commands/commands.html',
      controller: 'commandController'
    });

    authProvider.init({
    domain: 'jeffreylamwork.auth0.com',
    clientID: 'RdSGwryXzBL0bEHYoPasF9KX0hMwROjN',
    loginUrl: '/'
    });

    authProvider.init({
    domain: 'jeffreylamwork.auth0.com',
    clientID: 'RdSGwryXzBL0bEHYoPasF9KX0hMwROjN',
    loginUrl: '/'
    });

    authProvider.on('loginSuccess', ['$location', '$http', 'profilePromise', 'idToken', 'store', 'SocketService',
      function($location, $http, profilePromise, idToken, store, SocketService) {

        console.log("Login Success");
        profilePromise.then(function(profile) {
          store.set('profile', profile);
          store.set('token', idToken);
          $location.path('/chat');
          var name = JSON.parse(window.localStorage.profile).name.split(" ");

          //after successul signin with auth, we will create a token
          return $http({
            method: 'POST',
            url: '/auth',
            data: {email: JSON.parse(window.localStorage.profile).email, firstname: name[0], lastname: name[1] }
          })
          .then(function (resp) {
            if(resp.data.token) {
              sessionStorage.setItem('token', resp.data.token);
              localStorage.setItem('userId', resp.data.id);
            } else {
              $location.path('/');
            }
          })
          .then(function() {
            $location.path('/chat');
          });

          SocketService.register();
        });
    }]);

    //Called when login fails
    authProvider.on('loginFailure', function($location) {
      alert("Error");
      $location.path('/');
    });

    //Push interceptor function to $httpProvider's interceptors
    $httpProvider.interceptors.push('jwtInterceptor');

    $httpProvider.interceptors.push('AttachTokens');
  }
})();
