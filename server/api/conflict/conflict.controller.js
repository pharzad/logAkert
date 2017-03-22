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
        
      if (result[0].agent.ip !== payload.agent.ip) {
        Conflict.findOne({
          extension: payload.agent.extention
        }, function(err, conflict) {
          if (err)
            return
          if (!conflict) {
            var newPlayload = {
              firtsIp: result[0].agent.ip,
              secondIp: payload.agent.ip,
              timeStamp: new Date(),
              name: payload.agent.name,
              extension: payload.agent.extention,
              resolved: false
            }
            var newConflict = new Conflict(newPlayload);
            newConflict.save(function (err, newConflict) {
              console.log(newConflict);
            })
          }

        })
      } else {
        console.log('you are gooooooooood!');
      }
      return true
    })
}
