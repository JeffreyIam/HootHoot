(function() {
  'use strict';

  angular
    .module('services')
    .factory('ContactService', ContactService);

  ContactService.$inject = ['DataService']

  function ContactService(DataService) {
    var service =  {
      contacts: [],
      createContact: createContact,
      getAllContacts: getAllContacts,
      deleteContact: deleteContact,
      contactStatusChange: contactStatusChange,
      typingStatus: typingStatus
    };

    return service;

    function createContact(newContactEmail) {
      DataService.createContact(newContactEmail)
        .then(addContactToList);
    };

    function getAllContacts() {
      DataService.getContacts()
        .then(consumeContacts);

      function consumeContacts(contacts) {
        contacts.forEach(addContactToList);
      }
    };

    function deleteContact(contactId) {
      DataService.deleteContact(contactId)
        .then(removeContactFromList);
    };

    function addContactToList(contact) {
      service.contacts.push(contact)
    }

    function typingStatus(contactId, state) {
      service.contacts.map(findAndChangeContact(contactId, 'typing', state));
    }

    function contactStatusChange(contactId, status) {
      service.contacts.map(findAndChangeContact(contactId, 'isActive', status));
    }

    function findAndChangeContact(targetContactId, prop, newState) {
      return function(contact) {
        if(contact.id === targetContactId) {
          contact[prop] = newState;
        }
      }
    }

    function removeContactFromList(contactId) {
      for(var i = 0; i < service.contacts.length; i++) {
        if(service.contacts[i].id === contactId) {
          return service.contacts.splice(i, 1)[0];
        }
      }
    }
  }
})();
