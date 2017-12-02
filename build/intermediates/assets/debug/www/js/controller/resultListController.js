/*app.controller('resultListCtrl', function($scope, $state, $ionicLoading, $ionicSlideBoxDelegate) {
    $scope.showDetails = function(){
        $state.go('menuData.details');
    }

    $scope.viewONMap = function(lat,lng){
        localStorage.setItem("lat",lat);
        localStorage.setItem("lng",lng);
        $state.go('menuData.map');
    }

    
});*/

app.controller('resultListCtrl', function($scope, $state, $ionicLoading, $ionicSlideBoxDelegate,dataShare,$http) {
    $scope.showDetails = function(data){
    //alert(data.Des);
    dataShare.detailShare("detaiOBJ",JSON.stringify(data));
    $ionicLoading.show({
                     template: '<p>Loading.....</p>'
                   });
                   var lat_Long = data.Lat.split("_")[0]+','+data.Lat.split("_")[1];
                    lat_Long = "("+lat_Long+") and u=c";
                    var urls = "http://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text='"+lat_Long+"' ) &format=json";
    $http({
      method: 'GET',
      url: urls
    }).then(function successCallback(response) {
    $ionicLoading.hide();
       console.log(response);
     $scope.temdegreeC =  (parseInt(response.data.query.results.channel.item.condition.temp)-32) / .5556;
     dataShare.setTemp("temp",$scope.temdegreeC);
       $state.go('menuData.details');
      }, function errorCallback(response) {
        $ionicLoading.hide();
         console.log(response);
      });

       // $state.go('menuData.details');
    }
    //$scope.dataArray = dataShare.getdata("data");
    $scope.dataArray = localStorage.getItem("data");
var datourArr = $scope.dataArray.split("`");
var myObject = [];
 for(var i=0;i<datourArr.length;i++){
  var datTourArraycol = datourArr[i].split("~");
var Myobject= {};

Myobject.ID = datTourArraycol[0]
Myobject.City = datTourArraycol[1]
Myobject.Entity = datTourArraycol[2]
Myobject.Type = datTourArraycol[3]
Myobject.Lat = datTourArraycol[4]+"_"+datTourArraycol[5]
Myobject.Long = datTourArraycol[5]
Myobject.Des = datTourArraycol[6]
Myobject.Img = datTourArraycol[7]
Myobject.rating = datTourArraycol[8]
Myobject.others = datTourArraycol[9]
myObject.push(Myobject);
  }

  $scope.dataPlace = myObject;
    $scope.viewONMap = function(latLong){
    //alert(latLong.Lat);
    var position=latLong.Lat.split("_");

        localStorage.setItem("lat",position[0]);
        localStorage.setItem("lng",position[1]);
        $state.go('menuData.map');
    }

});
