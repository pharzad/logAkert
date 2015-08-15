'use strict';

angular.module('portOfAdvsApp')
    .controller('SearchCtrl', function ($scope, $http, socket, httpServices) {

        $scope.goSearch = function () {

            console.log($scope.search);

            if (typeof $scope.search !== 'undefined') {
                if ($scope.search.date) {
                    if (($scope.search.date.from && $scope.search.date.to) && ($scope.search.date.from !== '' && $scope.search.date.to !== '')) {
                        $scope.search.$and = [{
                            timeStamp: {
                                $gte: $scope.search.date.from
                            }
                        }, {
                            timeStamp: {
                                $lte: $scope.search.date.to
                            }
                        }];
                    } else if ($scope.search.date.from && $scope.search.date.from !== '') {
                        $scope.search.timeStamp = {
                            $gte: $scope.search.date.from
                        };
                    } else if ($scope.search.date.to && $scope.search.date.to !== '') {
                        $scope.search.timeStamp = {
                            $lte: $scope.search.date.to
                        };
                    }
                    delete $scope.search.date;
                }
                if ($scope.search.agentExtension === '')
                    delete $scope.search.agentExtension;
                if ($scope.search.logType === '')
                    delete $scope.search.logType;
                if ($scope.search.number === '')
                    delete $scope.search.number;
                if ($scope.search.webSockectDuration === '')
                    delete $scope.search.webSockectDuration;
                
                console.log($scope.search);
            }
            //     for (var key in $scope.search) {
            //   if ($scope.search.hasOwnProperty(key)) {
            //       var obj = $scope.search[key];
            //       
            //        for (var prop in obj) {
            //          // important check that this is objects own property 
            //          // not from prototype prop inherited
            //          if(obj.hasOwnProperty(prop)){
            //            console.log(prop + ' = '+ obj[prop]);
            //          }
            //       }
            //    }
            //}
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