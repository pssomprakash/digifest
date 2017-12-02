// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app =angular.module('starter', ['ionic','ngCordova']);



app.run(function($ionicPlatform, $ionicPopup, $state, $ionicHistory, $timeout,$cordovaSocialSharing, $rootScope, $ionicLoading) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)


        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            navigator.splashscreen.hide();
            try{
            cordova.exec(KeyboardSuccess, null, 'Keyboard', 'init', []);
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
            }
            catch(e){}

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
            try {
                if (device.platform == "Android") {

                } else if (device.platform == "iOS") {
                    ionic.Platform.fullScreen();
                }
            } catch (e) {

            }
        }

        $timeout(function() {
            //WL.App.hideSplashScreen();
        }, 3000);

        $ionicPlatform.registerBackButtonAction(function(event) {});
    });


    callLatLongFromNamtive = function (lat,longs){
            //alert(lat+"_"+longs);
            $cordovaSocialSharing
                            .share("Digifest\n", null, null, 'http://maps.google.com/maps?q='+lat+","+longs) // Share via native share sheet
                            .then(function(result) {
                              // Success!
                            }, function(err) {
                              // An error occured. Show a message to the user
                            });
        }

          $rootScope.sendMsg=function(){
                // Setup the loader
                  $ionicLoading.show({
                    content: 'Loading..',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                  });

                  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
                  $timeout(function () {
                    $ionicLoading.hide();
                    $scope.stooges = [{name: 'Moe'}, {name: 'Larry'}, {name: 'Curly'}];
                  }, 5000);

                tourApp.displayLocationSettingsRequest("share");
          };



          $rootScope.opentel=function(){
            window.open("tel:100","_blank");
          };
});


app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension|x-wmapp.?):|data:image\//); //for images
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/); //for href field
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

   $stateProvider
           .state('menuData', {
               url: '/menuData',
               abstract: true,
               templateUrl: 'templates/menu.html',
               controller: 'menuCtrl'
           })

       .state('home', {
               url: '/home',
               // cache: false,
               templateUrl: 'templates/home.html',
               controller: 'homeCtrl'

           })
           .state('menuData.resultList', {
               url: '/resultList',
               // cache: false,
               views: {
                   'menuContent': {
                       templateUrl: 'templates/resultList.html',
                       controller: 'resultListCtrl'
                   }
               }
           })
           .state('menuData.details', {
               url: '/details',
               // cache: false,
               views: {
                   'menuContent': {
                       templateUrl: 'templates/details.html',
                       controller: 'detailsCtrl'
                   }
               }
           })
           .state('menuData.map', {
               url: '/map',
               // cache: false,
               views: {
                   'menuContent': {
                       templateUrl: 'templates/map.html',
                       controller: 'mapCtrl'
                   }
               }
           });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

});




function googleLibExists(){
	return typeof(google) != "undefined" && google.maps;
}

function loadAsynchronousScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyCwgZEBFanxo70ykvSUg8tdxq3Sds3ybVE&sensor=false&libraries=places';
  document.body.appendChild(script);
}


function loadMapsApi () {
  try{
    if(navigator.connection.type === Connection.NONE) {
		  //alert('google maps library not loaded');
        return;
    }

	    loadAsynchronousScript();
  }catch(e){
    if(!googleLibExists()){
	    loadAsynchronousScript();
    }
  }
}

function onOnline () {
    loadMapsApi();
}

function onResume () {
    loadMapsApi();
}

document.addEventListener("deviceready",function(){
        document.addEventListener("online", onOnline, false);
        document.addEventListener("resume", onResume, false);
        loadMapsApi();
},false);
//app.initialize();



