'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AgentSchema = new Schema({
    name: String,
    ip: String,
    extention: Number,
    version: String,
    logType: String,
    freeSwitchAddress: String,
    timeStamp: Date,
    status: String
});

module.exports = mongoose.model('Agent', AgentSchema);
