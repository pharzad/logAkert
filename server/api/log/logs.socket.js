/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var log = require('./logs.model');

exports.register = function(socket) {
  log.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  log.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('log:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('log:remove', doc);
}