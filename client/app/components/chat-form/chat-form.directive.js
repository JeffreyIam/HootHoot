(function() {
  'use strict';

  angular
    .module('chatformdirective', ['theApp', 'ui.bootstrap'])
    .directive('chatform', chatform);

  function chatform() {
    var directive = {
      restrict: "E",
      replace: true,
      templateUrl: 'app/components/chat-form/chat-form.html',
      controller: chatformController
    };

    return directive;
  }

  chatformController.$inject = ['$scope', 'MessageService', 'Globals', 'DataService', 'CommandService', '$timeout'];

  function chatformController($scope, MessageService, Globals, DataService, CommandService, $timeout) {
      $scope.senderId = DataService.getCurrentUserId();
      $scope.selections = Globals.selections;
      $scope.commands = CommandService.commands;
      $scope.startTalking = startTalking;

      $scope.messageText = '';

      $scope.getCommands = getCommands;
      $scope.onSelect = onSelect;
      $scope.matchCommand = matchCommand;
      $scope.sendMessage = sendMessage;
      $scope.getMedia = getMedia;
      $scope.isChrome = webkitSpeechRecognition !== undefined;
      $scope.typingState = MessageService.typingState();
      $scope.startTyping = startTyping;

      function getCommands() {
        CommandService.getCommands();
      }

      function onSelect(item) {
        $scope.selections.command = item;
      }

      function matchCommand(viewValue) {
        var results = [];
        if(viewValue[0] !== '/') {
          return results;
        }

        $scope.commands.forEach(function(command) {
          if(viewValue === command.name.substr(0, viewValue.length)) {
            results.push(command);
          }
        })

        return results;
      }

      function getMedia() {
        var fd = new FormData(document.querySelector(".foorm"));
        var fileType = document.querySelector('[type="file"]').files[0].type.slice(-3);
        $.ajax({
          url: "/upload/" + fileType,
          type: "POST",
          data: fd,
          processData: false,
          contentType: false,
          success: function(data) {
            var result = JSON.parse(data);
            if(result.resource_type === 'image') {
              result.secure_url = '[:img:]' + result.secure_url + '[:img:]'
            }
            if(result.format === 'mp4' || result.format === 'AVI') {
              result.secure_url = '[:video:]' + result.secure_url + '[:video:]'
            }
            if(result.format === 'mp3' || result.format === 'WAV') {
              result.secure_url = '[:audio:]' + result.secure_url + '[:audio:]'
            }

            MessageService.sendMessage($scope.senderId, $scope.selections.recipient.id, result.secure_url);
          },
          error: function(err) {
            console.log(err);
          }
        })
      }

      function startTalking() {
        var recognition = new webkitSpeechRecognition();
        recognition.onresult = function(event) {
          $scope.messageText = event.results[0][0].transcript;
          $scope.$apply();
        }
        recognition.start();
      }

      function stoppedTyping(recipient) {
        $scope.typingState(recipient, 'ENDED')
      }

      var typingTimeout; // for purposes of cancelling typing timeout if user continues typing

      // sends a notification to recipient if user begins to type
      // sets 5 second timeout before sending an update that user has stopped typing
      function startTyping() {
        // if we're currently focused on someone...
        if($scope.selections.recipient) {
          // set the recipient when they started typing
          var recipient = $scope.selections.recipient.id;
          // should cancel the last timeout if user continues typing
          $timeout.cancel(typingTimeout);

          // change typing state to started, alert other user if this is a new state
          $scope.typingState(recipient, 'STARTED');

          // schedules a 5 second timeout before sending the 'ENDED' state to other user
          typingTimeout = $timeout(function() { stoppedTyping(recipient) }, 5000);
        }
      }

      function sendMessage() {
        $timeout.cancel(typingTimeout);
        stoppedTyping($scope.selections.recipient.id);

        MessageService.sendMessage($scope.senderId, $scope.selections.recipient.id, $scope.messageText);
        $scope.messageText = '';
      }

    }
})();
