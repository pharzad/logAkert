'use strict';

angular.module('portOfAdvsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('conflicts', {
        url: '/conflicts',
        templateUrl: 'app/conflicts/conflicts.html',
        controller: 'ConflictsCtrl'
      });
  });
