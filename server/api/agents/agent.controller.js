'use strict';
var Agent = require('./agent.model');

exports.addAgent = function (agent, callBack) {
    Agent.update({ extention: agent.extention }, agent, { overwrite: true }, function(err, result) {
        if (err) {
            console.log(err);
            return callBack(err);
        }

        callBack(err, result);
    })

}