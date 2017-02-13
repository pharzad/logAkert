'use strict';

angular.module('portOfAdvsApp')
  .controller('SearchCtrl', function($scope, $http, $stateParams, socket, httpServices, dropDown) {

    $scope.searchResult = [];
    $scope.search = {};
    $scope.goSearch = goSearch;

    if ($stateParams.agent) {
      $scope.search.extention = $stateParams.agent;
      goSearch();
    }

    dropDown.getDropDowns().then(function(drop) {
      $scope.dropdown = drop;
    });

    function goSearch() {
      var search = angular.copy($scope.search);
      var stringSeach = '{';

      if (search.logTypes)
        stringSeach = stringSeach + '"logType":"' + search.logTypes + '",';
      if (search.uuId)
        stringSeach = stringSeach + '"uuId":"' + search.uuId + '",';
      if (search.name)
        stringSeach = stringSeach + '"agent.name":"' + search.name + '",';
      if (search.extention)
        stringSeach = stringSeach + '"agent.extention":"' + search.extention + '",';
      if (search.number === null)
        stringSeach = stringSeach + '"callInfo.number":"' + search.number + '",';
      if (search.duration)
        stringSeach = stringSeach + '"webSocket.duration" : { "$gte":' + search.duration + '},';
      if (search.date) {
        if ((search.date.from && search.date.to) && (search.date.from !== '' && search.date.to !== '')) {
          stringSeach = stringSeach + '"$and":[{"timeStamp" : { "$gte":"' + new Date(search.date.from).toUTCString() + '"}},{"timeStamp" : { "$lte":"' + new Date(search.date.to).toUTCString() + '"}}]';
        } else if (search.date.from && search.date.from !== '') {
          stringSeach = stringSeach + '"timeStamp" : { "$gte":"' + new Date(search.date.from).toUTCString() + '"},';
        } else if (search.date.to && search.date.to !== '') {
          stringSeach = stringSeach + '"timeStamp" : { "$lte":"' + new Date(search.date.to).toUTCString() + '"},';
        }
      }
      var tmpLast = stringSeach.charAt(stringSeach.length - 1);
      if (tmpLast === ',') {
        stringSeach = stringSeach.slice(0, stringSeach.length - 1);
      }
      if (!$scope.search.ping) {
        if (stringSeach !== '{')
          stringSeach = stringSeach + ','
        stringSeach = stringSeach + '"webSocket.webSocketFunction":{ "$not": { "$eq": "KEEP_ALIVE" } }';
      }

      stringSeach = stringSeach + '}';
      console.log(stringSeach);

      var tmp = JSON.parse(stringSeach);
      httpServices.search(tmp).then(function(res) {
        if (res.status === 201 || res.status === 200) {
          $scope.searchResult = res.data;
        }
      });
    };

    socket.socket.on('log:save', function(res) {
      if ($scope.liveMode) {
        if ($scope.liveLogs.length > 100)
          $scope.liveLogs.shift();

        $scope.liveLogs.push(res);
        $scope.$apply();
      }
    });

    socket.socket.on('log:error', function(res) {
      console.error(JSON.parse(res));
    });
  });
