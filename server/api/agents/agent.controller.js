'use strict';
var Agent = require('./agent.model');

exports.addAgent = function (agent, callBack) {
    Agent.update({ extention: agent.extention }, agent, { overwrite: true, upsert:true }, function(err, result) {
        if (err) {
            console.log(err);
            return callBack(err);
        }

        callBack(err, result);
    });
}

exports.getAgents = function(req, res){
    Agent.find({}, function(err, result){
        if (err){
            return res.send(err);
        }

        res.json(result);
    });
}