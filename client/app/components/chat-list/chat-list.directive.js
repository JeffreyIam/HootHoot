(function() {
  'use strict';

  angular
    .module('chatlistdirective', ['theApp', 'luegg.directives'])
    .directive('chatlist', chatlist);

  function chatlist() {
    var directive = {
      restrict: "E",
      replace: true,
      templateUrl: 'app/components/chat-list/chat-list.html',
      scope: {
        list: '=chatlist'
      },
      controller: chatlistController
    };

    return directive;
  }

  chatlistController.$inject = ['$scope', '$timeout', '$rootScope', 'MessageService', 'Globals'];

  function chatlistController ($scope, $timeout, $rootScope, MessageService, Globals) {
    $scope.chats = [];
    $scope.selections = Globals.selections;

    $scope.getRecentMessages = getRecentMessages;
    $scope.filterById = filterById

    $scope.$watch(function() { return MessageService.chats; }, function(val) {
      $scope.chats = val;
    }, true);

    $rootScope.$on('get message', function(e, message) { MessageService.addMessageToList(message) });

    function getRecentMessages() {
      MessageService.getRecentMessages();
    }


    function filterById(message) {
      if (Globals.selections.recipient) {
        var recipient = Globals.selections.recipient.id;

        return message.recipientId === recipient || message.senderId === recipient;
      }
    }
  }
})();