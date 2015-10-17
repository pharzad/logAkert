'use strict';

angular.module('portOfAdvsApp')
    .factory('dropDown', function (httpServices) {

        var dropDown = {};
        httpServices.getDropDowns().then(function (drop) {
            dropDown = drop
        });
        var object = {};

        object.getDropDowns = function () {
            return dropDown;
        };

        return object;
    });