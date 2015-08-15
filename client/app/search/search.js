'use strict';

angular.module('portOfAdvsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search',
        templateUrl: 'app/main/search.html',
        controller: 'MainCtrl'
      });
  });