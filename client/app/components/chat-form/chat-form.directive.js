angular.module('chatformdirective', ['theApp']).directive('chatform', function () {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'app/components/chat-form/chat-form.html',

    controller: function($scope, currentUser, store, MessageService, Globals) {//declare and link up currentuser and main factory messageService!!!
      $scope.senderId = Globals.userId;
      $scope.selections = Globals.selections;

      $scope.messageText = '';

    // if ("geolocation" in navigator) {
    //   $('.js-geolocation').show();
    // } else {
    //   $('.js-geolocation').hide();
    // }

  /* Where in the world are you? */

      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
      });


      $scope.loadWeather = function(location, woeid) {
        $.simpleWeather({
          location: location,
          woeid: woeid,
          unit: 'f',
          success: function(weather) {
            html = '<h2 id="temp"><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';

            $("#weather").html(html);
          },
          error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
          }
        });
      }

      $scope.sendMessage = function() {

        if($scope.messageText.match(/\/weather/)) {
          $scope.messageText = document.getElementById("temp").innerHTML.split('</i> ')[1];
          // document.getElementById("weather").value
        }
        MessageService.sendMessage($scope.senderId, $scope.selections.recipient.id, $scope.messageText);
        $scope.messageText = '';
      }
    }
  };
});

