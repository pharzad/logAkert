'use strict'

var Conflict = require('./conflict.model');
var Logs = require('../log/logs.model');

exports.findConflict = function(payload) {

  if (payload.agent.extention === 1003)
    Logs.find({
      'agent.extention': payload.agent.extention
    }).sort({
      timeStamp: -1
    }).limit(2).exec(function(err, result) {
      if (err)
        return false;

console.log(result[1].agent.ip);
console.log(payload.agent.ip);
      if (result[1].agent.ip !== payload.agent.ip)
        console.log('FUCKKKKKKKKK');

      else {
        console.log('you are gooooooooood!');
      }
      return true
    })
}
