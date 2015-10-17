'use strict';

angular.module('portOfAdvsApp')
    .factory('dropDown', function (httpServices) {

        var dropDown = {};
    
    function dropDownLoader()
    {
        httpServices.getDropDowns().then(function (drop) {
            dropDown = drop.data;
            return dropDown;
        });
    }
    dropDownLoader();
        var object = {};

        object.getDropDowns = function () {
            if (_.isEmpty(dropDown))
                {
                  return  dropDownLoader();
                }
            else
            return dropDown;
        };

        return object;
    });