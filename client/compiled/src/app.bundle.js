webpackJsonp([0,1],[function(t,e,n){n(1),n(2),n(3),n(4),n(5),n(6),n(7),n(8),n(9),n(10),t.exports=n(11)},function(t,e){angular.module("chatformdirective",["theApp"]).directive("chatform",function(){return{restrict:"E",replace:!0,templateUrl:"app/components/chat-form/chat-form.html",controller:function(t,e,n,o,r){t.senderId=r.userId,t.selections=r.selections,t.messageText="",navigator.geolocation.getCurrentPosition(function(e){t.loadWeather(e.coords.latitude+","+e.coords.longitude)}),t.loadWeather=function(t,e){$.simpleWeather({location:t,woeid:e,unit:"f",success:function(t){html='<h2 id="temp"><i class="icon-'+t.code+'"></i> '+t.temp+"&deg;"+t.units.temp+"</h2>",$("#weather").html(html)},error:function(t){$("#weather").html("<p>"+t+"</p>")}})},t.sendMessage=function(){t.messageText.match(/\/weather/)&&(t.messageText=document.getElementById("temp").innerHTML.split("</i> ")[1]),o.sendMessage(t.senderId,t.selections.recipient.id,t.messageText),t.messageText=""}}}})},function(t,e){angular.module("chatlistdirective",["theApp"]).directive("chatlist",function(){return{restrict:"E",replace:!0,templateUrl:"app/components/chat-list/chat-list.html",scope:{list:"=chatlist"},link:function(t,e){t.$watchCollection("list",function(){var t=e.find(".chatScroll"),n=t.prop("scrollHeight");t.prop("scrollTop",n)})},controller:function(t,e,n,o,r){e.chats=n.chats,e.selections=r.selections,e.getRecentMessages=function(){n.getRecentMessages()},e.filterById=function(t){if(r.selections.recipient){var e=r.selections.recipient.id;return t.recipientId===e||t.senderId===e}},o.on("get message",function(){e.$apply()}),o.on("get ride",function(){e.$apply()})}}})},function(t,e){angular.module("chatsingledirective",["theApp"]).directive("chatsingle",function(t){return{restrict:"E",templateUrl:"app/components/chat-single/chat-single.html",scope:{sender:"@",body:"@",date:"@",type:"@"}}})},function(t,e){angular.module("contactlistdirective",["theApp"]).directive("contactlist",function(){return{restrict:"E",templateUrl:"app/components/contact-list/contact-list.html",scope:{},controller:function(t,e,n,o){e.contacts=n.contacts,e.addContact=function(t){n.createContact(t)},e.getAllContacts=function(){n.getAllContacts()},e.deleteContact=function(t){n.deleteContact(t)},e.setSelectedRecipient=function(t){o.setSelectedRecipient(t)}}}})},function(t,e){angular.module("contactsingledirective",["theApp"]).directive("contactsingle",function(t){return{restrict:"E",templateUrl:"app/components/contact-single/contact-single.html",scope:{name:"@",channel:"@",isactive:"@"}}})},function(t,e){angular.module("grouplistdirective",["theApp"]).directive("grouplist",function(){return{restrict:"E",templateUrl:"app/components/group-list/group-list.html",controller:function(t,e,n){e.click=!1,e.groupFriends=[],e.searchGroupFriends=n.searchGroupFriends,e.showGroup=function(){e.click=!0},e.sendGroup=function(){n.sendGroup(e.addGroupNames,e.groupFriends)},e.createGroup=function(t){e.groupFriends.push(t)},e.findContacts=function(){n.findContacts()},e.AddContact=function(){n.AddContact()}}}})},function(t,e){angular.module("groupsingledirective",["theApp"]).directive("groupsingle",function(t){return{restrict:"E",templateUrl:"app/components/group-single/group-single.html",scope:{name:"@",channel:"@",status:"@"}}})},function(t,e){angular.module("services",[]).factory("socket",function(){return io.connect()}).factory("Globals",function(){var t=+localStorage.getItem("userId");console.log("id: ",t);var e={},n=function(t){e.recipient=t};return{selections:e,setSelectedRecipient:n,userId:t}}).factory("GroupService",["$http","$rootScope",function(t,e){var n=[{name:"Abby Diggity",isActive:!0,channel:"Facebook"},{name:"Forrest Labrum",isActive:!1,channel:"Skype"},{name:"Jeff Lam",isActive:!0,channel:"Gchat"}],o=window.sessionStorage.token,r=function(e,n){return t({method:"POST",url:"/contacts",headers:{"Content-Type":"application/json","x-access-token":o},data:{userOne:e,userTwo:n}}).then(function(t){console.log("SUCCESSS POST"+t.data),contacts.push(t.data)})["catch"](function(t){console.log("THIS IS AN ERROR"+JSON.stringify(t.data))})},i=function(t,e){};return{sendGroup:i,findContacts:r,searchGroupFriends:n}}]).factory("ContactService",["$http","$rootScope",function(t,e){var n=[],o=(window.localStorage.token,function(e){return t({method:"POST",url:"/contacts",headers:{"Content-Type":"application/json"},data:{newContactEmail:e}}).then(function(t){n.push(t.data)})["catch"](function(t){console.log("THIS IS AN ERROR"+JSON.stringify(t.data))})}),r=function(){return t({method:"GET",url:"/contacts",headers:{"Content-Type":"application/json"}}).then(function(t){for(var e=0;e<t.data.length;e++)n.push(t.data[e])})},i=function(e){return t({method:"DELETE",url:"/contacts",headers:{"Content-Type":"application/json"},data:{contact:e}}).then(function(t){for(var e=0;e<n.length;e++)if(n[e].id===t.data){n.splice(e,1);break}})};return{contacts:n,createContact:o,getAllContacts:r,deleteContact:i}}]).factory("MessageService",["$window","$timeout","$http","$rootScope","currentUser","socket",function(t,e,n,o,r,i,a){var c=[],l=function(){return n({method:"GET",url:"/message",headers:{"Content-Type":"application/json"}}).then(function(t){t.data.forEach(function(t){c.push(t)})})},s=function(e,n,o){if(o.search(/^\/yelp /)>-1){var r=o.replace(/^\/yelp /,"").split("around"),a=r[0].trim(),c=r[1].trim();t.open("https://www.yelp.com/search?find_desc="+a+"&find_loc="+c,"_blank")}if(o.search(/^\/wiki /)>-1){var l=o.replace(/^\/wiki /,"").replace(/ /gi,"_").trim();t.open("https://en.wikipedia.org/wiki/Special:Search/"+l,"_blank")}var s={senderId:e,recipientId:n,body:o,recipientType:"U"};i.emit("send message",s)};i.on("get message",function(t){c.push(t)});var u=function(t){return n({method:"POST",url:"/api/yelp",headers:{"Content-Type":"application/json"},data:{searchTerm:t}}).then(function(t){return t.data})["catch"](function(t){console.log("THIS IS AN ERROR"+JSON.stringify(t.data))})};return i.on("get ride",function(t){c.push(t)}),{sendMessage:s,searchYelp:u,getRecentMessages:l,chats:c}}])},function(t,e){var n=angular.module("theApp",["auth0","angular-storage","angular-jwt","ngRoute","loginController","signupController","chatformdirective","chatsingledirective","chatlistdirective","userpicdirective","contactsingledirective","contactlistdirective","groupsingledirective","grouplistdirective","services","mainCtrl"]);n.config(["$routeProvider","authProvider","$httpProvider","$locationProvider","jwtInterceptorProvider",function(t,e,n,o,r){t.when("/",{templateUrl:"login/login.html",controller:"loginController"}).when("/signup",{templateUrl:"signup/signup.html",controller:"signupController"}).when("/chat",{templateUrl:"app/views/chat.html",controller:"signupController"}),e.init({domain:"jeffreylamwork.auth0.com",clientID:"RdSGwryXzBL0bEHYoPasF9KX0hMwROjN",loginUrl:"/"}),e.on("loginSuccess",["$location","$http","profilePromise","idToken","store","socket",function(t,e,n,o,r,i){console.log("Login Success"),n.then(function(n){r.set("profile",n),r.set("token",o),t.path("/chat");var a=JSON.parse(window.localStorage.profile).name.split(" ");return e({method:"POST",url:"/auth",data:{email:JSON.parse(window.localStorage.profile).email,firstname:a[0],lastname:a[1]}}).then(function(e){e.data.token?(sessionStorage.setItem("token",e.data.token),localStorage.setItem("userId",e.data.id),i.emit("registered",localStorage.userId)):t.path("/")}).then(function(){t.path("/chat")})})}]),e.on("loginFailure",function(t){alert("Error"),t.path("/")}),n.interceptors.push("jwtInterceptor"),n.interceptors.push("AttachTokens")}]),angular.module("mainCtrl",["theApp"]).controller("mainCtrl",function(t,e,n){t.logout=function(){e.localStorage.removeItem("token"),e.sessionStorage.removeItem("token"),e.localStorage.removeItem("profile"),e.localStorage.removeItem("username"),e.localStorage.removeItem("userId"),e.localStorage.removeItem("recipient"),e.localStorage.removeItem("email"),e.location.href="/"}}),n.value("currentUser",Math.floor(1e6*Math.random())),n.factory("checker",function(t,e,n){var o=function(){return!!n.sessionStorage.getItem("token")};return{isAuth:o}}),n.factory("AttachTokens",function(t){var e={request:function(e){var n=t.sessionStorage.getItem("token");return n&&(e.headers["x-access-token"]=n),e.headers["Allow-Control-Allow-Origin"]="*",e}};return e}).run(function(t,e,n,o,r,i){var a=i.get("profile"),c=a?a.nickname:o.localStorage.getItem("userId");n.isAuth()&&r.emit("registered",c),t.$on("$routeChangeStart",function(t,o,r){"/"==e.path()||"/signup"==e.path()?console.log("This page does not need authentication"):n.isAuth()||(console.log("not authenticated"),e.path("/"))})}),n.run(["auth",function(t){t.hookEvents()}])},function(t,e){angular.module("loginController",["theApp"]).controller("loginController",["$scope","$http","auth","$location","$window","socket",function(t,e,n,o,r,i){t.auth=n,t.login=function(n,a){return e({method:"POST",url:"/",data:{email:n,password:a}}).then(function(e){e.data.token?(r.sessionStorage.setItem("token",e.data.token),r.localStorage.setItem("token",e.data.token),r.localStorage.setItem("userId",e.data.id),r.localStorage.setItem("email",e.data.email),t.id=r.localStorage.getItem("userId"),i.emit("registered",t.id),o.path("/chat")):o.path("/")})}}])},function(t,e){angular.module("signupController",["theApp"]).controller("signupController",function(t,e,n,o){t.signUp=function(t,e,n,r,i){o({method:"POST",url:"/signup",data:{firstname:t,lastname:e,email:r,password:i}}),console.log("sent post req from signup controller")}})}]);