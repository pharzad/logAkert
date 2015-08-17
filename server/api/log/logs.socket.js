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
        var i = 0;
        if (errorTmp.length > 0) {
            for (var tmp in errorTmp) {
                socket.emit('log:error', tmp);
                errorTmp.splice(i, 1);
                i++;
            }
        }
    }, 3000);
};

function onSave(socket, doc, cb) {
    socket.emit('log:save', doc);
    if (doc.logType === 'Error') {
        errorHandel(doc);
    }
}

function onRemove(socket, doc, cb) {
    socket.emit('log:remove', doc);
}


function errorHandel(doc) {
    var res = 0;
    if (errorTmp.length > 0) {
        for (var tmp in errorTmp) {
            if (tmp.error === doc.error)
                res = 1;
        }
        if (res === 0)
            errorTmp.push(doc);
    } else
        errorTmp.push(doc);
}