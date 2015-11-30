'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogSchema = new Schema({
    agent: {
        name: String,
        ip: String,
        extention: Number
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
        code: String
    },
    status: {
        newStatus: String,
        statusDuration: Number,
        previewsStatus: String,
    },
    logType: String,
    uuId: String,
    freeSwitchAddress: String,
    timeStamp: Date,
    active: Boolean
});

module.exports = mongoose.model('Log', LogSchema);
