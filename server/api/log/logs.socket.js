/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var log = require('./logs.model');
var errorTmp = [];
exports.register = function (socket) {
    log.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    log.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });

    setInterval(function () {
        if (errorTmp.length > 0) {
            errorTmp = [];
        }
    }, 3000);
};

function onSave(socket, doc, cb) {
    //    socket.emit('log:save', doc);
    if (doc.logType === 'Error' || doc.logType === 'servicingError') {
        errorHandel(doc, socket);
    }
}

function onRemove(socket, doc, cb) {
    //    socket.emit('log:remove', doc);
}


function errorHandel(doc, socket) {
    var res = 0;
    if (errorTmp.length > 0) {
        for (var tmp in errorTmp) {
            if (tmp.error === doc.error)
                res = 1;
        }
        if (res === 0) {
            errorTmp.push(doc);
            socket.emit('log:error', doc);
        }
    } else {
        errorTmp.push(doc);
        socket.emit('log:error', doc);
    }
}