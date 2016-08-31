(function() {
  'use strict';

  angular
    .module('chat', ['theApp'])
    .controller('chatController', chatController)

  chatController.$inject = ['$scope', 'Globals', '$sce'];

  function chatController($scope, Globals, $sce) {
    $scope.$watch(function() { return Globals.webcam; }, function(val) {
      $scope.webcam = Globals.webcam;
    }, true);

    $scope.$watch(function() { return Globals.camroom; }, function(val) {
      $scope.camroom = $sce.trustAsResourceUrl(Globals.camroom);
    })


    $scope.$watch(function() { return Globals.selections.frame; }, function(val) {
      $scope.frame = $sce.trustAsResourceUrl(Globals.selections.frame) || '../../info.html';
    }, true);
  }
})();
