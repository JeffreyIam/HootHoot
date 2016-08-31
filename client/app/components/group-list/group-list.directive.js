(function() {
  'use strict';

  angular
    .module('grouplistdirective', ['theApp'])
    .directive('grouplist', grouplist);

    function grouplist() {
      var directive = {
        restrict: "E",
        templateUrl: 'app/components/group-list/group-list.html',
        controller: grouplistController
      };
      return directive;
    }
  grouplistController.$inject = ['$rootScope', '$scope', 'GroupService'];

  function grouplistController($rootScope, $scope, GroupService) {
    $scope.sendGroup = sendGroup;
    $scope.createGroup = createGroup;
    $scope.findContacts = findContacts;
    $scope.AddContact = addContact;

    function sendGroup() {
      GroupService.sendGroup($scope.addGroupNames, $scope.groupFriends);
    };
    function createGroup() {
      $scope.groupFriends.push(name);
    };
    function findContacts(name) {
      GroupService.findContacts();
    };
    function AddContact() {
      GroupService.AddContact();
    }
  }
})();