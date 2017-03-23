'use strict';

angular.module('portOfAdvsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('conflicts', {
        url: '/conflict/',
        templateUrl: 'app/conflicts/conflicts.html',
        controller: 'ConflictsCtrl'
      });
  });
