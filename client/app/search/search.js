'use strict';

angular.module('portOfAdvsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search/:agent?',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });
