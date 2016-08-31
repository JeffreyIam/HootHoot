(function() {

  angular
    .module('commandController', ['theApp'])
    .controller('commandController', commandController)

  commandController.$inject = ['$scope','CommandService']

  function commandController($scope, CommandService) {
    var vm = this;

    $scope.createCommand = createCommand;

    function createCommand(command) {
      CommandService.createCommand(command);
    }
  }
})();
