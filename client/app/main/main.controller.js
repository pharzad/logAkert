'use strict';

angular.module('portOfAdvsApp')
    .controller('MainCtrl', function ($scope, $http, socket, httpServices, dropDown) {

        $scope.liveMode = false;
        $scope.agents = {};
        $scope.agents.status = [];
        $scope.liveLogs = [];
        $scope.menu = [{
            'title': 'Agents Status'
    }, {
            'title': 'Latest Logs'
    }, {
            'title': 'Live Logs'
    }, {
            title: 'Fe Error'
        }, {
            title: 'All Errors'
}];
    
  var  bn = dropDown.getDropDowns();
    console.log(bn);
    console.log(dropDown.getDropDowns());

        $scope.changeLog = function (item) {
            $scope.liveLogs = [];
            $scope.agents.status = [];
            $scope.liveMode = false;
            switch (item) {
                case 'Agents Status':
                    httpServices.getLatestStatus().then(function (agentsStatus) {
                        $scope.agents.status = agentsStatus.data;
                    });
                    break;
                case 'Latest Logs':
                    httpServices.getLatestActivity().then(function (agentsStatus) {
                        $scope.agents.status = agentsStatus.data;
                    });
                    break;
                case 'All Errors':
                    httpServices.search({
                        'error.errorType': {
                            $exists: true
                        }
                    }).then(function (agentsStatus) {
                        $scope.agents.status = agentsStatus.data;
                    });
                    break;
                     case 'Fe Error':
                    httpServices.search({
                        'error.errorType': 'servicingBE'
                    }).then(function (agentsStatus) {
                        $scope.agents.status = agentsStatus.data;
                    });
                    break;
                case 'Live Logs':
                    $scope.liveMode = true;

            }
        };

        httpServices.getLatestStatus().then(function (agentsStatus) {
            $scope.agents.status = agentsStatus.data;
        });

        socket.socket.on('log:save', function (res) {
            if ($scope.liveMode) {
                if ($scope.liveLogs.length > 100)
                    $scope.liveLogs.shift();

                $scope.liveLogs.push(res);
                $scope.$apply();
            }
        });

        socket.socket.on('log:error', function (res) {
            console.warn(res);
        });
    });
