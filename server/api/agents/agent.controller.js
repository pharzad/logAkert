'use strict';
var Agent = require('./agent.model');

exports.addAgent = function (agent, callBack) {
    Agent.replaceOne({ extention: agent.extention }, agent, { upsert: true }, function(err, result) {
        if (err) {
            console.log(err);
            return callBack(err);
        }

        callBack(err, result);
    })

}