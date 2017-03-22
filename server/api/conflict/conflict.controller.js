'use strict'

var Conflict = require('./conflict.model');
var Logs = require('../log/logs.model');

exports.findConflict = function(payload) {
  Logs.find({
    'agent.extention': payload.agent.extention
  }).sort({
    timeStamp: -1
  }).limit(1).exec(function(err, result) {
    if (err)
      return false;

      console.log(payload.timeStamp);
      console.log(result[0].timeStamp);

    if (result[0].agent.ip !== payload.agent.ip)
      console.log('FUCKKKKKKKKK');

    else {
      console.log('you are gooooooooood!');
    }
    return true
  })
}
