(function() {
  'use strict';

  angular
    .module('app.profile',['theApp'])
    .controller('profileController', profileController)

    profileController.$inject = ['$scope', '$http', '$window'];

    function profileController ($scope, $http, $window) {
      $scope.getInfo = getInfo;
      $scope.deleteAccount = deleteAccount;

     function getInfo() {

      $.ajax({
        url: "/signup",
        type: "GET",
        success: function(results) {
          for(var i = 0; i < results.length; i++) {
            if(results[i].id == localStorage.getItem('userId')) {
              $scope.email = results[i].email;
              $scope.firstname = results[i].firstname;
              $scope.lastname = results[i].lastname;
              $scope.membersince = results[i].createdAt;
              $scope.$apply();
            }
          }
        },
        error: function(err) {
          console.log(err);
        }
      })
    }

    function deleteAccount() {
      var id = localStorage.getItem('userId');
       $http.delete('/destroy/'+id)
        .then(function() {
          $window.localStorage.clear();
          $window.sessionStorage.clear();
          $window.location.href="/"
        })
    }
  }
})();



