'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ConflictSchema = new Schema({
  firtsIp: String,
  secondIp: String,
  name: String,
  extension: Number,
  timeStamp: Date,
  resolved: Boolean
});

module.exports = mongoose.model('Conflict', ConflictSchema);
