'use strict';

angular.module('portOfAdvsApp')
  .controller('ConflictsCtrl', function($scope, httpServices) {
    httpServices.getConflicts().then(function(result) {
      console.log();
      if (result.status === 200)
      $scope.agents = result.data;
    })
  });
