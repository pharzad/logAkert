'use strict';

angular.module('portOfAdvsApp')
    .controller('SearchCtrl', function ($scope, $http, socket, httpServices, dropDown) {

        $scope.searchResult = [];
        $scope.search = {};
        $scope.search.agent = {};
        $scope.search.webSocket = {};
        $scope.search.callInfo = {};

        dropDown.getDropDowns().then(function (drop) {
            console.log(drop);
            $scope.dropdown = drop;
        });

        $scope.goSearch = function () {

            var search = angular.copy($scope.search);
            console.log(search);

            if (search.freeSwitchAddress === null)
                delete search.freeSwitchAddress;
            if (search.logTypes === null)
                delete search.logTypes;
            if (search.webSocket.duration === null)
                delete search.webSocket;
            if (search.agent.name === null)
                delete search.agent.name;


            if (typeof $scope.search !== 'undefined') {

                if (search.webSocket.duration && search.webSocket.duration !== '')
                    search.webSocket.duration = {
                        $gte: search.webSocket.duration
                    };

                if (search.$and)
                    delete search.$and;

                if (search.timeStamp)
                    delete search.timeStamp;

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
                        $scope.search.timeStamp = {
                            $gte: $scope.search.date.from
                        };
                    } else if (search.date.to && search.date.to !== '') {
                        search.timeStamp = {
                            $lte: search.date.to
                        };
                    }
                    delete search.date;
                }

                if (search.agentExtension === '')
                    delete search.agentExtension;

                if (search.logType === '')
                    delete search.logType;

                if (search.number === '')
                    delete search.number;

                if (search.webSocket.duration === '')
                    delete search.webSocket.duration;

                console.log(search);
                httpServices.search($scope.search).then(function (res) {

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
