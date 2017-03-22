'use strict'

var Conflict = require('./conflict.model');
var Logs = require('../log/logs.model');

exports.findConflict = function(payload) {
  console.log(payload.agent.extention);
  Logs.find({
    'agent.extention': payload.agent.extention
  }).sort({
    timeStamp: -1
  }).limit(1).exec(function(err, result) {
    if (err)
      return false;

    console.log(result.agent);
    return true
  })
}
