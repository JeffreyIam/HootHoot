(function() {
  'use strict';

  angular
    .module('groupsingledirective', ['theApp'])
    .directive('groupsingle', groupsingle);

    function groupsingle() {
      var directive = {
        restrict: "E",
        templateUrl: 'app/components/group-single/group-single.html',
        scope: {
          name: '@',
          channel: '@',
          status: '@'
        }
      }
    }
})();