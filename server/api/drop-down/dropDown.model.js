'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DropDown = new Schema({
  agents: [String],
  errorsTypes: [String],
  logTypes: [String]

});

module.exports = mongoose.model('DropDown', DropDown);
