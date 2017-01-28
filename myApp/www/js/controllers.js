
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {})

.controller('MapController', function($scope) {
	var myLatlng;
	var posOptions = {
             enableHighAccuracy: true,
             timeout: 10000
         };
	navigator.geolocation.getCurrentPosition(successCallback, errorCallback, posOptions);
	function successCallback(pos) {
      		var myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        	var mapOptions  = {
                        center: myLatlng,
                        zoom: 16,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
        	};

        	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        	var marker = new google.maps.Marker({
                        	position: myLatlng,
                        	map: map
       		 });
        	$scope.map = map;
    	};
	function errorCallback(pos) {
                
		return null;
        };
});
