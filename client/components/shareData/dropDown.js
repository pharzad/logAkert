'use strict';

angular.module('portOfAdvsApp')
    .factory('dropDown', function (httpServices) {

        var dropDown = {};
        var object = {};

        function dropDownLoader() {
            return httpServices.getDropDowns().then(function (drop) {
                dropDown = drop.data;
            });
        }

        object.getDropDowns = function () {
            if (_.isEmpty(dropDown)) {
                return dropDownLoader();
            } else {
                return dropDown;
            }
        };

        return object;
        dropDownLoader();
    });
