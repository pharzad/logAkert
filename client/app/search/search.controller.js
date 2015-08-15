'use strict';

angular.module('portOfAdvsApp')
    .controller('SearchCtrl', function ($scope, $http, socket, httpServices) {

 $scope.goSearch = function(){
 
     console.log($scope.search);
 
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