(function() {
  'use strict';

  angular
    .module('services')
    .factory('DataService', DataService);

  DataService.$inject = ['$http', '$exceptionHandler'];

  function DataService($http, $exceptionHandler) {
    var service = {
      getCurrentUserId: getCurrentUserId,
      getRecentMessages: getRecentMessages,
      getContacts: getContacts,
      createContact: createContact,
      deleteContact: deleteContact,
      getCommands: getCommands,
      createCommand: createCommand,
      dispatchCommand: dispatchCommand,
      getLocation: getLocation
    }

    return service;

    function getCurrentUserId() {
      return +localStorage.getItem('userId');
    }

    function getContacts() {
      return $http.get('/contacts')
        .then(requestComplete)
        .catch(errorHandler('getContacts'));
    }

    function createContact(newContactEmail) {
      return $http.post('/contacts', {newContactEmail: newContactEmail})
        .then(requestComplete)
        .catch(errorHandler('createContact'));
    }

    function deleteContact(contactId) {
      return $http({
        url: '/contacts',
        method: 'DELETE',
        data: { contact: contactId },
        headers: { 'Content-type': 'application/json;charset=utf-8' }
      }).then(requestComplete)
        .catch(errorHandler('deleteContact'));
    }

    function getRecentMessages() {
      return $http.get('/message')
        .then(requestComplete)
        .catch(errorHandler('getRecentMessages'));
    }

    function getCommands() {
      return $http.get('/commands')
        .then(requestComplete)
        .catch(errorHandler('getCommands'));
    }

    function createCommand(command) {
      return $http.post('/commands', command)
        .then(requestComplete)
        .catch(errorHandler('getCommands'));
    }

    function dispatchCommand(postUrl, params) {
      return $http.post(postUrl, params)
        .then(requestComplete)
        .catch(errorHandler('dispatchCommand'));
    }

    function getLocation(cb) {
      navigator.geolocation.getCurrentPosition(gotPosition);

      function gotPosition(position) {
        cb(position.coords);
      }
    }

    function requestComplete(response) {
      return response.data;
    }

    function errorHandler(requestName){
      return function(e) {
        $exceptionHandler('An error has occured in ' + requestName + '.\nHTTP error: ' + JSON.stringify(e));
      }
    }
  }
})();