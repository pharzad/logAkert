'use strict';

angular.module('portOfAdvsApp')
  .controller('ConflictsCtrl', function($scope, httpServices) {
    httpServices.getConflicts().then(function(result) {
      console.log(result);
    })
  });
