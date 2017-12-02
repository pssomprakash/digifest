app.controller('mapCtrl', function($scope, $state, $ionicLoading, $ionicSlideBoxDelegate,$ionicActionSheet) {
    $scope.lat=parseFloat(localStorage.getItem("lat"));
    $scope.lng=parseFloat(localStorage.getItem("lng"));
    $scope.bookCab = function(){
        // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
    buttons: [
      { text: '<b>Book Private Taxi</b>' },
      { text: '<b>Book Ola</b>' },
      { text: '<b>Book Uber</b>' }
    ],

    titleText: '<b>Book Taxi Services</b>',
    cancelText: 'Cancel',
    cancel: function() {
         // add cancel code..
       },
    buttonClicked: function(index) {
        if(index==0){
            alert("Please contact to local taxi service provider.")
        }
        else if(index==2){
            tourApp.openUber("com.ubercab");
        }
        else if(index==1){
            tourApp.openUber("com.olacabs.customer");
        }
      return true;
    }
  });

  // For example's sake, hide the sheet after two seconds
  $timeout(function() {
    hideSheet();
  }, 2000);


    };

      $scope.initMap=function(lat,longs) {

        var markers = [
                  {
                    "title": 'Distination',
                    "lat": $scope.lat,
                    "lng": $scope.lng,
                    "description":"Distination"
                },{
                  "title": 'Source',
                  "lat": lat,
                  "lng": longs,
                  "description":"Source"
              }];
        var mapOptions = {
            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var path = new google.maps.MVCArray();
        var service = new google.maps.DirectionsService();

        var infoWindow = new google.maps.InfoWindow();
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var poly = new google.maps.Polyline({ map: map, strokeColor: '#FF8200' });
        var lat_lng = new Array();
        for (i = 0; i < markers.length; i++) {
            var data = markers[i]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            lat_lng.push(myLatlng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title
            });
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent(data.description);
                    infoWindow.open(map, marker);
                });
            })(marker, data);
        }
        for (var i = 0; i < lat_lng.length; i++) {
            if ((i + 1) < lat_lng.length) {
                var src = lat_lng[i];
                var des = lat_lng[i + 1];
                path.push(src);
                poly.setPath(path);
                service.route({
                    origin: src,
                    destination: des,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
            }
        }
    };

    callLatLongFromNamtiveformap = function (lat,longs){
        //$scope.initMap(lat,longs);
        angular.element(document.getElementById('map-view')).scope().initMap(lat,longs);
    };

    tourApp.displayLocationSettingsRequest("map");


    $scope.showNavigation=function(){
        tourApp.OpenMapNavigation($scope.lat,$scope.lng);
    };

});
    

      