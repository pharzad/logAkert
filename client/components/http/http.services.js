'use strict';

angular.module('portOfAdvsApp')
  .factory('httpServices', function($http, httpUrl) {

    var server = httpUrl.url();
    var http = {};

    http.getLatestStatus = function() {
      return $http.get(server + 'api/agents/');
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
