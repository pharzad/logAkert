'use strict';

angular.module('portOfAdvsApp')
    .controller('SearchCtrl', function ($scope, $http, socket, httpServices) {

 $scope.goSearch = function(){
 
     console.log($scope.search);
     
     for (var key in $scope.search) {
   if ($scope.search.hasOwnProperty(key)) {
       var obj = $scope.search[key];
        for (var prop in obj) {
          // important check that this is objects own property 
          // not from prototype prop inherited
          if(obj.hasOwnProperty(prop)){
            console.log(prop + ' = '+ obj[prop]);
          }
       }
    }
}
     
     
 
 };

        socket.socket.on('log:save', function (res) {
            if ($scope.liveMode) {
                if ($scope.liveLogs.length > 100)
                    $scope.liveLogs.shift();

                $scope.liveLogs.push(res);
                $scope.$apply();
            }
        });
    });