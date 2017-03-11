
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ContactsCtrl', function($scope) {
	$scope.contacts = [];
	var options = new ContactFindOptions();
        options.filter="";          // empty search string returns all contacts
        options.multiple=true;      // return multiple results
        filter = ["name"];   // return contact.displayName field

        navigator.contacts.find(filter, onSuccess, onError, options);

    	function onSuccess(contacts) {
	$scope.$apply(function(){
		$scope.contacts =  contacts;
	});
    	};

    function onError(contactError) {
        alert('onError!');
    };
})

.controller('MapController', function($scope, $http) {

	var markers = [];
	$scope.$on('$ionicView.enter', function(){
	var myLatlng;
	$scope.lat = 0;
	$scope.long = 0;
	var posOptions = {
             enableHighAccuracy: true,
             timeout: 10000
         };
	$scope.longmapClicked = true;

	var iconBase = 'http://maps.google.com/mapfiles/ms/micons/';
                var icons = {
                        iconCustom: {
                                icon: iconBase + 'grn-pushpin.png'
                        }
                        /*
                        ,
                        library: {
                                icon: iconBase + 'library_maps.png'
                        },
                        info:   {
                                icon: iconBase + 'info-i_maps.png'
                        }*/
                };

	$scope.deleteMarkers = function() {
                for (var i = 0; i < markers.length; i++) {
                        markers[i].setMap(null);
                }
                markers = [];
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

		//post
		$scope.lat = pos.coords.latitude;
		$scope.long = pos.coords.longitude;

		var url = "http://72.88.211.80:3000/post/userlocation/today/rachel/"+$scope.lat+"/"+$scope.long;
        	$http.get(url)
                .success(function (data) {
                        console.log(data);
                }).error(function(err){
                        console.error('ERR', err);
                });

		//set all previous markers
		for (var i = 0; i < markers.length; i++) {
          		markers[i].setMap(map);
        	}
                map.addListener('mouseup', function(event) {
                        $scope.longmapClicked = false;
												//alert("up"+$scope.longmapClicked);
                });
								map.addListener('dragstart', function(event) {
                        $scope.longmapClicked = false;
                        //alert("up"+$scope.longmapClicked);
                });
                map.addListener('dragend', function(event) {
                        $scope.longmapClicked = false;
                        //alert("up"+$scope.longmapClicked);
                });
                map.addListener('zoom_changed', function(event) {
                        $scope.longmapClicked = false;
                        //alert("up"+$scope.longmapClicked);
                });
		//Add event listeners for custom markers
		map.addListener('mousedown', function(event) {
			$scope.longmapClicked = true;
			setTimeout(function() {
			if($scope.longmapClicked){
				customMarker(map,event);
			}
			}, 2000 );
        	});
        	$scope.map = map;
    	};
	function errorCallback(pos) {
		return null;
        };

	function customMarker(map,event){
		//alert("Hello, World."+$scope.longmapClicked);
												var marker = new google.maps.Marker({
																position: event.latLng,
																icon: icons['iconCustom'].icon,
																map: map
												});
                        var infowindow = new google.maps.InfoWindow({
                                content: "<input type='text' autofocus> "+
					  															"<button onclick=\"deleteSingleMarker("+event.latLng.lat()+","+event.latLng.lng()+")\">BUTTON</button>",
                                maxWidth: 200
                        });
												longmarkerClicked = true;
                        marker.addListener('click', function() {
                                infowindow.open(map, marker);
                        });
												// marker.addListener('dblclick', function() {
                        //         deleteSingleMarker(event.latLng.lat(),event.latLng.lng());
                        // });
												marker.addListener('mouseup', function(event) {
				                        longmarkerClicked = false;
				                });
												marker.addListener('mousedown', function() {
														longmarkerClicked = true;
														setTimeout(function() {
															if(longmarkerClicked)
															{
																	deleteSingleMarker(event.latLng.lat(),event.latLng.lng());
															}
														}, 2000 );
										    });
											function errorCallback(pos) {
												return null;
										        };
                        markers.push(marker);
	};
	function deleteSingleMarker(lat,lng) {
				for (var i = 0; i < markers.length; i++) {
					//alert("Inside For "+ lat + ":" +lng + "stored" +markers[i].position);
					if(markers[i].position.lat()==lat && markers[i].position.lng()==lng)
					{
								//alert("inside if");
								markers[i].setMap(null);
					}
				}
	};

});//ionic vew enter
});
