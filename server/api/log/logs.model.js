'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LogSchema = new Schema({
  agent: {
    name: String,
    ip: String,
    extention: Number,
    version: String
  },
  callInfo: {
    Calldirection: String,
    number: Number,
    duration: Number,
    callType: String
  },
  error: {
    errorType: String,
    errorMessage: String,
    line: String
  },
  webSocket: {
    webSocketFunction: String,
    webSocketBody: String,
    duration: Number,
    confirmation: String,
  },
  freeSwitch: {
    duration: Number,
    code: String,
    reason: String
  },
  status: {
    newStatus: String,
    statusDuration: Number,
    previewsStatus: String,
    triggered: String
  },
  system: {
    cpu: {
      idle: Number,
      modelName: String,
      numOfProcessors: Number,
      total: Number
    },
    memory: {
      availableCapacity: Number,
      capacity: Number
    }
  },
  logType: String,
  uuId: String,
  freeSwitchAddress: String,
  timeStamp: Date,
  active: Boolean
});

module.exports = mongoose.model('Log', LogSchema);
