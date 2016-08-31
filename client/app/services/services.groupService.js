.factory('GroupService', ['$http', '$rootScope',
    function GroupServiceFactory ($http, $rootScope) {

    var results = window.sessionStorage.token;
    var findContacts = function(userOne, userTwo) {

      return $http({
        method: 'POST',
        url: '/contacts',
        headers: {'Content-Type': 'application/json', 'x-access-token': results},
        data: {userOne: userOne, userTwo:userTwo}
      })
      .then(function (resp){
        console.log('SUCCESSS POST' + resp.data);
        contacts.push(resp.data);
      })
      .catch(function(resp){
        console.log("THIS IS AN ERROR" + JSON.stringify(resp.data));
      });
    };
    var sendGroup = function(groupName, groupMembers) {
      /*var results = window.localStorage.token;
      return $http({
        method: 'POST',
        url: '/groupRoom',
        headers: {'Content-Type': 'application/json', 'x-access-token': results},
        data: {groupName: groupName, groupMembers:groupMembers}
      })
      .then(function (resp){
        console.log('SUCCESSS POST' + resp.data);
        contacts.push(resp.data);
      })
      .catch(function(resp){
        console.log("THIS IS AN ERROR" + JSON.stringify(resp.data));
      });*/
    };
      return {
        sendGroup: sendGroup,
        findContacts:findContacts,
        searchGroupFriends:searchGroupFriends
      };
    }
  ])