'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DropDown = new Schema({
  agents: ['string'],
  errors: ['string'],
  logTypes: ['string']
});

module.exports = mongoose.model('DropDown', DropDown);
