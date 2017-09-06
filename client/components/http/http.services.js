'use strict';

angular.module('portOfAdvsApp')
  .factory('httpServices', function($http) {

    var server = 'http://10.253.0.5/';
    var http = {};

    http.getLatestStatus = function() {
      return $http.get(server + 'api/logs/getLatestStatus');
    };

    http.getLatestActivity = function() {
      return $http.get(server + 'api/logs/getLatestActivity');
    };

    http.search = function(search) {
      return $http.post(server + 'api/logs/search', search);
    };

    http.getDropDowns = function() {
      return $http.get(server + 'drop-down');
    };

    http.getConflicts = function() {
      return $http.get(server + 'conflicts');
    };
    return http;
  });
