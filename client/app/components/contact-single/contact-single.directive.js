(function() {
  'use strict';

  angular
    .module('contactsingledirective', ['theApp'])
    .directive('contactsingle', contactsingle);

  function contactsingle(ContactService) {
    var directive = {
      restrict: "E",
      templateUrl: 'app/components/contact-single/contact-single.html',
      scope: {
        name: '@',
        channel: '@',
        isactive: '@',
        unread: '@'
      }
    }
  return directive;
  }
})();