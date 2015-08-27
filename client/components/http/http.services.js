'use strict';

angular.module('portOfAdvsApp')
    .factory('httpServices', function ($http) {

        var server = 'http://10.248.251.240/';
        var http = {};

        http.getLatestStatus = function () {
            return $http.get(server + 'api/logs/getLatestStatus');
        };

        http.getLatestActivity = function () {
            return $http.get(server + 'api/logs/getLatestActivity');
        };

        http.search = function (search) {
            return $http.post(server + 'api/logs/search', search);
        };

        return http;
    });