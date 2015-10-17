'use strict';

angular.module('portOfAdvsApp')
    .factory('dropDown', function (httpServices) {

        var dropDown = {};
        var object = {};

        function dropDownLoader() {
            httpServices.getDropDowns().then(function (drop) {
                dropDown = drop.data;
                return drop.data;
            });
        }

        object.getDropDowns = function () {
            if (_.isEmpty(dropDown)) {
                return dropDownLoader();
            } else
                return dropDown;
        };

        return object;
        dropDownLoader();
    });
