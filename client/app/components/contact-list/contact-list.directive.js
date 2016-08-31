(function() {
  'use strict';

  angular
  .module('contactlistdirective', ['theApp', 'ui.bootstrap'])
  .directive('contactlist', contactlist);

  function contactlist() {
    var directive = {
        restrict: "E",
        templateUrl: 'app/components/contact-list/contact-list.html',
        controller: contactlistController
    };
    return directive;
  }
   contactlistController.$inject = ['$rootScope', '$scope', 'ContactService', 'Globals', 'MessageService'];

   function contactlistController($rootScope, $scope, ContactService, Globals, MessageService) {
      $scope.contacts = ContactService.contacts;
      $scope.addContact = addContact;
      $scope.getAllContacts = getAllContacts;
      $scope.deleteContact = deleteContact;
      $scope.setSelectedRecipient = setSelectedRecipient;
      // $scope.tooggle = true;
      function addContact(newContactEmail) {
        ContactService.createContact(newContactEmail);
      }

      function getAllContacts() {
        ContactService.getAllContacts();
      }

      function deleteContact(contact) {
        ContactService.deleteContact(contact);
      }

      function setSelectedRecipient(recipient) {
        Globals.setSelectedRecipient(recipient);
        markRead(recipient);
      }

      function markRead(recipient) {
        if(recipient.unreadCount > 0) {
          setTimeout(markReadIfFocused, 3000)
        }

        function markReadIfFocused() {
          if(recipient === Globals.selections.recipient) {
            recipient.unreadCount = 0;
            MessageService.markAllRead(recipient.id)
          }
        }
      }
   }
})();
