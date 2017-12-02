app.controller('detailsCtrl', function($scope, $state, $ionicLoading, $ionicSlideBoxDelegate,dataShare) {
try{
   $scope.detailData =dataShare.getdetailShare("detaiOBJ");
}
catch(e){}
   $scope.detailData1 = JSON.parse($scope.detailData);

setTimeout(function(){
$scope.tempC = dataShare.geTemp("temp");
$scope.$apply();
 }, 2000);
});
