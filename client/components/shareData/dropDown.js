'use strict';

angular.module('portOfAdvsApp')
    .factory('dropDown', function (httpServices, $q) {

        var dropDown = {};
        var object = {};
        var def = $q.defer();

        function dropDownLoader() {
            return httpServices.getDropDowns().then(function (drop) {
                dropDown = drop.data;
                return drop.data;
            });
        }

        object.getDropDowns = function () {
            if (_.isEmpty(dropDown)) {
                return dropDownLoader();
            } else {
                def.resolve(dropDown);
                return def.promise();
            }
        };
    
        dropDownLoader();
        return object;
    });
