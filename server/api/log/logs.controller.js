
'use strict';

var _ = require('lodash');
var Logs = require('./logs.model');

// Get list of things
exports.index = function(req, res) {
  Logs.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(things);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Logs.findById(req.params.id, function (err, log) {
    if(err) { return handleError(res, err); }
    if(!log) { return res.status(404).send('Not Found'); }
    return res.json(log);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
    console.log(req.body);
  Logs.create(req.body, function(err, log) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(log);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Logs.findById(req.params.id, function (err, log) {
    if (err) { return handleError(res, err); }
    if(!log) { return res.status(404).send('Not Found'); }
    var updated = _.merge(log, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(log);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Logs.findById(req.params.id, function (err, log) {
    if(err) { return handleError(res, err); }
    if(!log) { return res.status(404).send('Not Found'); }
    log.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}