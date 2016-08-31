(function() {
  'use strict';

  angular
    .module('services')
    .factory('SocketService', SocketService);

  SocketService.$inject = ['$rootScope', 'DataService', 'ContactService'];

  function SocketService($rootScope, DataService, ContactService) {
    var service = {
      addListeners: addListeners,
      sendMessage: sendMessage,
      markRead: markRead,
      register: register,
      updateTyping: updateTyping
    }

    return service;

    var socket;

    function addListeners(socket) {
      socket.on('get message', function(message) {
        $rootScope.$apply(function() {
          $rootScope.$broadcast('get message', message);
        });
      });

      socket.on('online', function(contactId) {
        ContactService.contactStatusChange(contactId, 1);
      });

      socket.on('offline', function(contactId) {
        ContactService.contactStatusChange(contactId, 0);
      });

      socket.on('typing', function(senderId, state) {
        $rootScope.$apply(function() {
          ContactService.typingStatus(senderId, state);
          $rootScope.$broadcast('typingStatus', senderId, state);
        });
      });
    }

    function sendMessage(message) {
      socket.emit('send message', message);
    }

    function markRead(list) {
      socket.emit('mark read', list);
    }

    function updateTyping(recipient, state) {
      socket.emit('typing status', recipient, state);
    }

    function register() {
      socket = io.connect();

      addListeners(socket);
      socket.emit('registered', DataService.getCurrentUserId());
    }
  }
})();
