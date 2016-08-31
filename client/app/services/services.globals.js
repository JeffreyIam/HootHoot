(function() {
  'use strict';

  angular
    .module('services')
    .factory('Globals', Globals);

  function Globals() {
    var service = {
      selections: {},
      setSelectedRecipient: setSelectedRecipient,
      webcam: false,
      camroom: "https://appear.in/" + Math.random().toString().slice(2,7),
      location: ""
    }

    return service;

    function setSelectedRecipient(recipient) {
      service.selections.recipient = recipient;
    }
  }
})();