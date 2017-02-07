var DropDown = require('./dropDown.model');
var Logs = require('../log/logs.model');

exports.createDrop = function(callback) {
  Logs.distinct('agent.name').exec(function(err, agents) {
    if (err) {
      return handleError(res, err);
    }
    Logs.distinct('error.errorType').exec(function(err, error) {
      if (err) {
        return handleError(res, err);
      }
      Logs.distinct('logType').exec(function(err, logType) {
        if (err) {
          return handleError(res, err);
        }
        var fields = {
          agents: agents,
          errors: error,
          logTypes: logType
        };
        DropDown.remove({}, function() {
          var newDrop = new DropDown(fields);
          newDrop.save(function(err, result) {
            if (err)
              return err;
            console.log(result)
            callback(result);
          });
        });
      });
    });
  });
}
