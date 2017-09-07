'use strict';

angular.module('portOfAdvsApp')
  .controller('MainCtrl', function($scope, $http, $state, httpServices, dropDown) {

    $scope.selectAgent = function(agent) {
      $state.go('search', {
        agent: agent._id
      });
    }
    $scope.liveMode = false;
    $scope.agents = {};
    $scope.agents.status = [];
    $scope.liveLogs = [];
    $scope.menu = [{
      'title': 'Agents Status'
    }, {
      title: 'Fe Error'
    }, {
      title: 'All Errors'
    }];
    $scope.environments = [];
    dropDown.getDropDowns().then(function(drop) {
      $scope.dropdown = drop;
      angular.forEach(drop.env, function(env) {
        var tmp = env.split('.');
        if (tmp[0])
          $scope.environments.push(tmp[0]);
      });
    });

    $scope.updateEnv = function (env) {
      console.log(env);
      $scope.env = env;
    }

    $scope.changeLog = function(item) {
      $scope.liveLogs = [];
      $scope.agents.status = [];
      $scope.agentsStatus = [];
      $scope.liveMode = false;
      switch (item) {
        case 'Agents Status':
          httpServices.getLatestStatus().then(function(agentsStatus) {
            $scope.agentsStatus = agentsStatus.data;
          });
          break;
        case 'Latest Logs':
          httpServices.getLatestActivity().then(function(agentsStatus) {
            $scope.agentsStatus = agentsStatus.data;
          });
          break;
        case 'All Errors':
          httpServices.search({
            'error.errorType': {
              $exists: true
            }
          }).then(function(agentsStatus) {
            $scope.agents.status = agentsStatus.data;
          });
          break;
        case 'Fe Error':
          httpServices.search({
            'error.errorType': 'servicingBE'
          }).then(function(agentsStatus) {
            $scope.agents.status = agentsStatus.data;
          });
          break;
        case 'Live Logs':
          $scope.liveMode = true;

      }
    };

    httpServices.getLatestStatus().then(function(agentsStatus) {
      console.log(agentsStatus);
      $scope.agentsStatus = agentsStatus.data;
    });

    // socket.socket.on('log:save', function(res) {
    //   if ($scope.liveMode) {
    //     if ($scope.liveLogs.length > 100)
    //       $scope.liveLogs.shift();

    //     $scope.liveLogs.push(res);
    //     $scope.$apply();
    //   }
    // });

    // socket.socket.on('log:error', function(res) {
    //   console.warn(res);
    // });
  });
