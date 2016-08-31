(function() {
  'use strict';

  angular
    .module('contactsdirective', ['theApp'])
    .directive('contacts', contacts);

    function contacts(MessageService) {
      var directive = {
        restrict: "E",
        templateUrl: 'app/components/contacts/contacts.html',
        scope: {
        }
      }
      return directive;
    }
})();