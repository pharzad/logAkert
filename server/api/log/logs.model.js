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
    callInfo: {
        Calldirection: String,
        number: Number,
        duration: Number,
        type: String
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

{
    "stack": "Error\n    at MongooseError.ValidationError (/var/server/logAkert/node_modules/mongoose/lib/error/validation.js:22:16)\n    at model.Document.invalidate (/var/server/logAkert/node_modules/mongoose/lib/document.js:1162:32)\n    at model.Document.set (/var/server/logAkert/node_modules/mongoose/lib/document.js:605:10)\n    at model.Document.set (/var/server/logAkert/node_modules/mongoose/lib/document.js:500:18)\n    at model.Document (/var/server/logAkert/node_modules/mongoose/lib/document.js:62:10)\n    at model.Model (/var/server/logAkert/node_modules/mongoose/lib/model.js:45:12)\n    at new model (/var/server/logAkert/node_modules/mongoose/lib/model.js:2741:11)\n    at /var/server/logAkert/node_modules/mongoose/lib/model.js:1616:8\n    at /var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:570:21\n    at /var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:249:17\n    at /var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:125:13\n    at Array.forEach (native)\n    at _each (/var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:46:24)\n    at async.each (/var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:124:9)\n    at _asyncMap (/var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:248:13)\n    at Object.map (/var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:219:23)",
    "message": "Log validation failed",
    "name": "ValidationError",
    "errors": {
        "call": {
            "stack": "Error\n    at MongooseError.CastError (/var/server/logAkert/node_modules/mongoose/lib/error/cast.js:18:16)\n    at model.Document.set (/var/server/logAkert/node_modules/mongoose/lib/document.js:606:7)\n    at model.Document.set (/var/server/logAkert/node_modules/mongoose/lib/document.js:500:18)\n    at model.Document (/var/server/logAkert/node_modules/mongoose/lib/document.js:62:10)\n    at model.Model (/var/server/logAkert/node_modules/mongoose/lib/model.js:45:12)\n    at new model (/var/server/logAkert/node_modules/mongoose/lib/model.js:2741:11)\n    at /var/server/logAkert/node_modules/mongoose/lib/model.js:1616:8\n    at /var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:570:21\n    at /var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:249:17\n    at /var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:125:13\n    at Array.forEach (native)\n    at _each (/var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:46:24)\n    at async.each (/var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:124:9)\n    at _asyncMap (/var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:248:13)\n    at Object.map (/var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:219:23)\n    at _parallel (/var/server/logAkert/node_modules/mongoose/node_modules/async/lib/async.js:568:20)",
            "message": "Cast to String failed for value \"[object Object]\" at path \"call\"",
            "name": "CastError",
            "kind": "String",
            "value": {
                "callDirection": "",
                "number": 0,
                "duration": 0,
                "type": ""
            },
            "path": "call"
        }
    }
}
