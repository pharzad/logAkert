'use strict';

angular.module('portOfAdvsApp')
    .factory('httpServices', function ($http) {

        var http = {};

        http.getLatestStatus = function () {
            return $http.get('http://localhost:9000/api/logs/getLatestStatus');
        };

        http.getLatestActivity = function () {
            return $http.get('http://localhost:9000/api/logs/getLatestActivity');
        };
        return http;
    });