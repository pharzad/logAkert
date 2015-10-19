'use strict';

angular.module('portOfAdvsApp')
    .controller('SearchCtrl', function ($scope, $http, socket, httpServices, dropDown) {

        $scope.searchResult = [];
        $scope.search.agent = {};
        $scope.search.websocket = {};
        $scope.search.callInfo = {};

        dropDown.getDropDowns().then(function (drop) {
            $scope.dropdown = drop;
        });

        $scope.goSearch = function () {

            console.log($scope.search);

//            if (typeof $scope.search !== 'undefined') {
//
//                if ($scope.search.webSockectDuration && $scope.search.webSockectDuration !== '')
//                    $scope.search.webSockectDuration = {
//                        $gte: $scope.search.webSockectDuration
//                    };
//
//                if ($scope.search.$and)
//                    delete $scope.search.$and;
//
//                if ($scope.search.timeStamp)
//                    delete $scope.search.timeStamp;
//
//                if ($scope.search.date) {
//                    if (($scope.search.date.from && $scope.search.date.to) && ($scope.search.date.from !== '' && $scope.search.date.to !== '')) {
//                        $scope.search.$and = [{
//                            timeStamp: {
//                                $gte: $scope.search.date.from
//                            }
//                        }, {
//                            timeStamp: {
//                                $lte: $scope.search.date.to
//                            }
//                        }];
//                    } else if ($scope.search.date.from && $scope.search.date.from !== '') {
//                        $scope.search.timeStamp = {
//                            $gte: $scope.search.date.from
//                        };
//                    } else if ($scope.search.date.to && $scope.search.date.to !== '') {
//                        $scope.search.timeStamp = {
//                            $lte: $scope.search.date.to
//                        };
//                    }
//                    delete $scope.search.date;
//                }
//
//                if ($scope.search.agentExtension === '')
//                    delete $scope.search.agentExtension;
//
//                if ($scope.search.logType === '')
//                    delete $scope.search.logType;
//
//                if ($scope.search.number === '')
//                    delete $scope.search.number;
//
//                if ($scope.search.webSockectDuration === '')
//                    delete $scope.search.webSockectDuration;
//
//                console.log($scope.search);
//                httpServices.search($scope.search).then(function (res) {
//
//                    if (res.status === 201 || res.status === 200) {
//                        $scope.searchResult = res.data;
//                    }
//                    console.log(res);
//
//                });
//            }
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

        socket.socket.on('log:error', function (res) {
            console.error(JSON.parse(res));
        });
    });
