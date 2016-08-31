(function() {
  'use strict';

  angular
    .module('services')
    .factory('MessageService', MessageService);

  MessageService.$inject = ['SocketService', 'DataService', 'CommandService', 'Globals'];

  function MessageService(SocketService, DataService, CommandService, Globals) {
    var service = {
      chats: [],
      addMessageToList: addMessageToList,
      getRecentMessages: getRecentMessages,
      markAllRead: markAllRead,
      processText: processText,
      typingState: typingState,
      sendMessage: sendMessage
    };

    var gotRecentMessages = false;

    return service;

    function getRecentMessages() {
      DataService.getRecentMessages()
        .then(consumeMessages);

      function consumeMessages(messages) {
        messages.forEach(addMessageToList);
        gotRecentMessages = true;
      }
    }

    function markAllRead(senderId) {
      var toUpdate = [];

      service.chats.map(function(chat) {
        if(chat.senderId === senderId && !chat.isRead) {
          chat.isRead = 1;
          toUpdate.push(chat.id);
        }
      })

      SocketService.markRead(toUpdate)
    }

    // returns with a closure to the typing state, only updates other user if new state
    function typingState() {
      var lastState;

      return function(recipientId, state) {
        if(state !== lastState) {
          lastState = state;
          SocketService.updateTyping(recipientId, state);
        }
      }
    }

    function sendMessage(sender, recipient, messageText) {
      var message = {
        'senderId': sender,
        'recipientId': recipient,
        'body': messageText,
        'recipientType': 'U'
      };

      var flag = false;
      //whiteboard
      if(message.body.indexOf('/wb') >= 0) {
        var query = message.body.split("/wb ")[1];
        if(query.slice(0,4) === ('http')) {
          message.body = "[:frame:]" + query + "[:frame:]";
        } else {
          message.body = "[:frame:]https://" + query + "[:frame:]";
        }
      }  //browsing websites
      else if(message.body.indexOf('/browse') >= 0) {
        var query = message.body.split("/browse ")[1];
        if(query.slice(0,4) === ('http')) {
          message.body = "[:frame:]" + query + "[:frame:]";
        } else {
          message.body = "[:frame:]https://" + query + "[:frame:]";
        }
      } //webcam
      else if(message.body.indexOf('/webcam') >= 0) {
        var room = message.body.split(" ")[1];
        message.body = "[:webcam:]https://appear.in/" + room + "[:webcam:]";
      }
      //embed youtube links
      else if(message.body.indexOf('/embed') >= 0) {
        message.body = message.body.split('http').join('[:iframe:]http') + '[:iframe:]'
      }
      //youtube links
      else if(message.body.indexOf('youtube.com/watch') >= 0) {
        message.body = message.body.replace("/watch?v=", "/embed/").split('http').join('[:iframe:]http') + '[:iframe:]';
      }
      //vimeo links
      else if(message.body.indexOf('vimeo.') >= 0) {
        message.body = message.body.replace('vimeo.com', 'player.vimeo.com/video').split('http').join('[:iframe:]http') + '[:iframe:]';
      }
      else if(message.body[0] === '/' ) {
        flag = true;
        CommandService.dispatchCommand(message)
          .then(function(processed) {
            SocketService.sendMessage(processed);
          })
      }

      if(!flag){
        SocketService.sendMessage(message);
      }

    };

    function processText(text) {
      var escapeMap = {
        "<": "&lt;",
        ">": "&gt;"
      };

      var tags = {
        '[:link:]': {
          open: '<a href="$val">',
          close: '</a>'
        },
        '[:img:]': {
          open: '<img src="',
          close: '" height = "50%"; width="50%">'
        },
        '[:video:]': {
          open: '<video controls="controls" src="',
          close: '"height = "300px"></video>'
        },
        '[:audio:]': {
          open: '<audio controls="controls" src="',
          close: '"></audio>'
        },
        '[:frame:]': {
          open: 'Let\'s look at ',
          action: function(str) {
            if(gotRecentMessages) { Globals.selections.frame = str };
          }
        },
        '[:webcam:]': {
          open: 'Let\'s look at ',
          action: function(str) {
            Globals.webcam = !Globals.webcam;
            if(gotRecentMessages) { Globals.camroom = str };
          }
        },
        '[:iframe:]': {
          open: '<iframe width="640" height="360" src="',
          close: '" frameborder="0" allowfullscreen></iframe>'
        },
        '[:uber:]': {
          open: '<a href="$val">',
          close: '</a>'
        }
      }
      return text.replace(/[<>]/g, escape)
        .replace(/(\[:.*:\])(.*)(\1)/g, interpretMarkup);

      function escape(s) {
        return escapeMap[s];
      }

      function interpretMarkup(s, foundTag, content) {
        var tag = tags[foundTag];

        if(!tag) {
          return foundTag + content + foundTag;
        }

        if(tag.action) {
          tag.action(content);
        }

        var processed = tag.close ? foundTag === '[:uber:]' ? tag.open + 'Get a Ride' + tag.close : tag.open + content + tag.close : tag.open + content;

        return processed.replace('$val', content);
      }
    }

    function addMessageToList(message) {
      message.body = processText(message.body);
      service.chats.push(message);
    }
  }
})();
