'use strict';

var _ = require('lodash');
var Q = require('q');
var Logs = require('./logs.model');

function getLatestAgent(agents) {
  var statuses = [];
  agents.forEach(function(agent) {
    var deferred = Q.defer();
    Logs.findOne({
      'agent.extension': agent.extention
    }).sort({
      'timeStamp': -1
    }).exec(function(err, stste) {
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
exports.index = function(req, res) {
  Logs.find(function(err, things) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(things);
  });
};

//test
exports.latestActivity = function(req, res) {

  Logs.find({}).limit(400).sort({
    timeStamp: -1
  }).exec(function(err, agents) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(agents);
  });
};

exports.dropDownFields = function(req, res) {
  Logs.distinct('agent.name').exec(function(err, agents) {
    if (err) {
      return handleError(res, err);
    }
    Logs.distinct('error.errorType').exec(function(err, error) {
      if (err) {
        return handleError(res, err);
      }
      Logs.distinct('logType').exec(function(err, logType) {
        if (err) {
          return handleError(res, err);
        }
        Logs.distinct('freeSwitchAddress').exec(function(err, env) {
          if (err) {
            return handleError(res, err);
          }
          var fields = {
            agents: agents,
            errors: error,
            logTypes: logType,
            env: env
          };
          return res.status(200).json(fields);
        });
      });
    });
  });
};

//Latest Status
exports.latest = function(req, res) {
  Logs.aggregate([{
    $match: {
      logType: 'statusChanged'
    }
  }, {
    $sort: {
      timeStamp: -1
    }
  }, {
    $group: {
      _id: '$agent.extention',
      latetStatus: {
        $first: '$status.newStatus'
      },
      agentName: {
        $first: '$agent.name'
      }
    }
  }]).allowDiskUse(true).exec(function(err, stste) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(stste);
  });
};

// Search for logs
exports.search = function(req, res) {
  console.log(req.body);
  Logs.find(req.body).limit(400).sort({
    timeStamp: -1
  }).exec(function(err, log) {
    if (err) {
      return handleError(res, err);
    }
    console.log(log);
    return res.status(201).json(log);
  });
};

// Get a single log
exports.show = function(req, res) {
  Logs.findById(req.params.id, function(err, log) {
    if (err) {
      return handleError(res, err);
    }
    if (!log) {
      return res.status(404).send('Not Found');
    }
    return res.json(log);
  });
};

// Count logs
exports.count = function(req, res) {
  Logs.find({}).count().exec(function(err, log) {
    if (err) {
      return handleError(res, err);
    }
    if (!log) {
      return res.status(404).send('Not Found');
    }
    return res.json(log);
  });
};

// Creates a new Log in the DB.
exports.create = function(req, res) {
  if (req.body) {
    req.body.agent.ip = req.ip;
  }
  //    console.log(req.body);
  Logs.create(req.body, function(err, log) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(log);
  });
};

// Empty log collection
exports.empty = function(req, res) {
  Logs.remove(req.body, function(err) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).send('document successfully removed');
  });
};

// Updates an existing log in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Logs.findById(req.params.id, function(err, log) {
    if (err) {
      return handleError(res, err);
    }
    if (!log) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(log, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(log);
    });
  });
};

// Deletes a log from the DB.
exports.destroy = function(req, res) {
  Logs.findById(req.params.id, function(err, log) {
    if (err) {
      return handleError(res, err);
    }
    if (!log) {
      return res.status(404).send('Not Found');
    }
    log.remove(function(err) {
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
