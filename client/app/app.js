(function() {
  'use strict';

  angular
    .module('theApp', ['app.config', 'app.login', 'app.logout', 'app.signup', 'app.chatBox', 'app.contacts', 'commandController', 'userpicdirective', 'services', 'chat', 'ngSanitize', 'app.profile'])
    .factory('AttachTokens', AttachTokens);

    AttachTokens.$inject = ['$window'];

    function AttachTokens($window) {
      var attach = {
        request: function(object) {
          var jwt = $window.sessionStorage.getItem('token');
          if(jwt) {
            object.headers['x-access-token'] = jwt;
          }
          object.headers['Allow-Control-Allow-Origin'] = '*';
          return object;
        }
      };
      return attach;
    }
})();
