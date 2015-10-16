'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogSchema = new Schema({
    agent: {
        name: String,
        ip: String,
        extention: Number
    },
    error: {
        errorType: String,
        errorMessage: String,
        line: String
    },
    webSocket: {
        function: String,
        body: String,
        duration: Number,
        confirmation: String,
    },
    freeSwitch: {
        duration: Number
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
