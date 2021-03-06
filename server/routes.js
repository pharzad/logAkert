/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.get('/extension/:name', function(req, res, next) {

    console.log('hello');
    var options = {
      root: '../extension/',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

    var fileName = req.params.name;
    res.sendFile(fileName, options, function(err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      } else {
        console.log('Sent:', fileName);
      }
    });

  });
  app.use('/api/logs', require('./api/log'));

  app.use('/drop-down/', require('./api/drop-down'));

  app.use('/api/freshDesk/', require('./api/freshDesk'));

  app.use('/config/', require('./api/config'));

  app.use('/conflicts/', require('./api/conflict'));

  app.use('/api/agents/', require('./api/agents'));

  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
