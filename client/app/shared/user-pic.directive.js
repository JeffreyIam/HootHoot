(function() {
  'use strict';

  angular
    .module('userpicdirective', ['theApp'])
    .directive('userpic', userpic);

  function userpic() {
    var directive = {
      restrict: "E",
      template: '<span class="user-pic"><img src="app/images/personMale.png" alt="{{senderId}}" class="circle userpic"></span>',
      controller: userpicController
    };
    return directive;
  }

  userpicController.$inject = ['$scope', 'store'];

  function userpicController($scope, store) {
   $scope.userPicUrl = localStorage.getItem('picUrl') || 'app/images/personMale.png';
  }
})();