'use strict';

angular.module('portOfAdvsApp')
    .controller('SearchCtrl', function ($scope, $http, socket, httpServices, dropDown) {

        $scope.searchResult = [];
        $scope.search = {};

        dropDown.getDropDowns().then(function (drop) {
            console.log(drop);
            $scope.dropdown = drop;
        });

        $scope.goSearch = function () {

            var search = angular.copy($scope.search);
            var stringSeach = '';
            console.log(search);

            if (search.freeSwitchAddress)
                stringSeach = stringSeach + '{"freeSwitchAddress":"' + search.freeSwitchAddress + '"},';
            if (search.logTypes)
                stringSeach = stringSeach + '{"logTypes":"' + search.logTypes + '"},';
            if (search.webSocket)
                stringSeach = stringSeach + '{"webSocket.duration":"' + search.webSocket + '"},';
            if (search.name)
                stringSeach = stringSeach + '{"agent.name":"' + search.name + '"},';
            if (search.number === null)
                stringSeach = stringSeach + '{"callInfo.number":"' + search.number + '"},';
            if (typeof $scope.search !== 'undefined') {
                if (search.webSocket)
                    search.webSocket.duration = {
                        $gte: search.webSocket.duration
                    };
                if (search.date) {
                    if ((search.date.from && search.date.to) && (search.date.from !== '' && search.date.to !== '')) {
                        search.$and = [{
                            timeStamp: {
                                $gte: search.date.from
                            }
                                    }, {
                            timeStamp: {
                                $lte: search.date.to
                            }
                                    }];
                    } else if (search.date.from && search.date.from !== '') {
                        search.timeStamp = {
                            $gte: search.date.from
                        };
                    } else if (search.date.to && search.date.to !== '') {
                        search.timeStamp = {
                            $lte: search.date.to
                        };
                    }
                    delete search.date;
                }

                console.log(stringSeach);

                var tmpLast = stringSeach.charAt(stringSeach.length - 1);
                if(tmpLast===',')
                stringSeach = stringSeach.slice(0,stringSeach.length - 2);
                httpServices.search(stringSeach).then(function (res) {

                    if (res.status === 201 || res.status === 200) {
                        $scope.searchResult = res.data;
                    }
                    console.log(res);

                });
            }
            //            for (var key in $scope.search) {
            //                if ($scope.search.hasOwnProperty(key)) {
            //                    var obj = $scope.search[key];
            //
            //                    for (var prop in obj) {
            //                        // important check that this is objects own property 
            //                        // not from prototype prop inherited
            //                        if (obj.hasOwnProperty(prop)) {
            //                            console.log(prop + ' = ' + obj[prop]);
            //                        }
            //                    }
            //                }
            //            }
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
