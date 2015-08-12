'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogSchema = new Schema({
    agentName: String,
    agentExtension: Number,
    logType: String,
    error:String,
    callDirection:String,
    callType:String,
    number:Number,
    callDuration:Number,
    ip:String,
    webSockectFunction:String,
    webSockectBody:String,
    webSockectDuration:Number,
    webSocketConfirmation:String,
    activieStatus:String,
    activeDuration:Number,
    uuId:String,
    freeSwitch:String,
    webSocket:String,
    previewsStatus:String,
    timeStamp:Date,
    active: Boolean
});

module.exports = mongoose.model('Log', LogSchema);