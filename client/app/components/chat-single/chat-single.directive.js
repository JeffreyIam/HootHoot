(function() {
  'use strict';

  angular
  .module('chatsingledirective', ['theApp', 'ngSanitize'])
  .directive('chatsingle', chatsingle);

  function chatsingle(MessageService) {
    var directive = {
      restrict: "E",
      templateUrl: 'app/components/chat-single/chat-single.html',
      scope: {
        sender: '@', //???
        body: '@',
        date: '@',
        type: '@',
        url: '@',
        video: '@',
        audio: '@'
      },
      controller: chatsingleController
    };
    return directive;
  }

  chatsingleController.$inject = ['$scope', '$sce'];

  function chatsingleController ($scope, $sce) {
    $scope.trustedBody = $sce.trustAsHtml($scope.body);
  }
})();
