'use strict'

var Conflict = require('./conflict.model');
var Logs = require('../log/logs.model');

exports.findConflict = function(payload) {
  Logs.find({
    'agent.extention': payload.agent.extention
  }).sort({
    timeStamp: -1
  }).limit(2).exec(function(err, result) {
    if (err)
      return false;

      console.log(payload.timeStamp);
      console.log(result[1].timeStamp);
      console.log(payload.agent.extention);

    if (result[1].agent.ip !== payload.agent.ip)
      console.log('FUCKKKKKKKKK');

    else {
      console.log('you are gooooooooood!');
    }
    return true
  })
}
