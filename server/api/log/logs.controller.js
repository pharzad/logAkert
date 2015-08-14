'use strict';

var _ = require('lodash');
var Q = require('q');
var Logs = require('./logs.model');

function getLatestAgent(agents) {
    var statuses = [];
    agents.forEach(function (agent) {
        var deferred = Q.defer();
        Logs.findOne({
            agentExtension: agent
        }).sort({
            'timeStamp': -1
        }).exec(function (err, stste) {
            if (err) {
                return handleError(stste, err);
            }
            deferred.resolve(stste);
        });
        statuses.push(deferred.promise);
    });
    return Q.all(statuses);
}

// Get list of things
exports.index = function (req, res) {
    Logs.find(function (err, things) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(things);
    });
};

//test
exports.latestActivity = function (req, res) {

    Logs.distinct('agentExtension').exec(function (err, agents) {
        if (err) {
            return handleError(res, err);
        }
        getLatestAgent(agents).then(function (result) {
            return res.status(200).json(result);
        });
    });
    //    Logs.find().select('agentExtension').exec(function (err, stste) {
    //        if (err) {
    //            return handleError(res, err);
    //        }
    //        return res.status(200).json(stste);
    //    });
    //    Logs.aggregate([{
    //        $sort: {
    //            timeStamp: -1
    //        }
    //    }, {
    //        $group: {
    //            _id: '$agentExtension',
    //            event: {
    //                $first: '$logType'
    //            }
    //
    //        }
    //    }]).exec(function (err, stste) {
    //        if (err) {
    //            return handleError(res, err);
    //        }
    //        return res.status(200).json(stste);
    //    });
};

//test1
exports.latest = function (req, res) {
    //    var ststus = [];
    //  Logs.distinct ('agentExtension').exec(function (err, things) {
    //    if(err) { return handleError(res, err); }
    //      for (var i = 0; i<things.length; i++)
    //      {
    //          console.log(things[i]);
    //          Logs.findOne({logType: 'statusChanged', agentExtension:things[i]}).sort({'timeStamp':-1}).exec(function (err, stste) {
    //              if(err) { return handleError(res, err); }Z
    //              ststus.push(stste);
    //              });
    //      }
    //    return res.status(200).json(ststus);
    //  });

    Logs.aggregate([{
        $sort: {
            timeStamp: -1
        }
    }, {
        $match: {
            logType: 'statusChanged'
        }
    }, {
        $group: {
            _id: '$agentExtension',
            latetStatus: {
                $first: '$activieStatus'
            },
            agentName: {
                $first: '$agentName'
            }
        }
    }]).exec(function (err, stste) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(stste);
    });
};

// Search for logs
exports.search = function (req, res) {

    Logs.find(req.body, function (err, log) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(log);
    });
};

// Get a single thing
exports.show = function (req, res) {
    Logs.findById(req.params.id, function (err, log) {
        if (err) {
            return handleError(res, err);
        }
        if (!log) {
            return res.status(404).send('Not Found');
        }
        return res.json(log);
    });
};

// Creates a new thing in the DB.
exports.create = function (req, res) {
    console.log(req.body);
    Logs.create(req.body, function (err, log) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(log);
    });
};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Logs.findById(req.params.id, function (err, log) {
        if (err) {
            return handleError(res, err);
        }
        if (!log) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(log, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(log);
        });
    });
};

// Deletes a thing from the DB.
exports.destroy = function (req, res) {
    Logs.findById(req.params.id, function (err, log) {
        if (err) {
            return handleError(res, err);
        }
        if (!log) {
            return res.status(404).send('Not Found');
        }
        log.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}