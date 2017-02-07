var DropDown = require('./dropDown.model');
var Logs = require('../log/logs.model');

exports.getDropDown = function(callback) {
  DropDown.findOne({}, function(err, result) {
    if (err)
      callback(err);
    callback(result);
  });
}
exports.createDrop = function(callback) {
  Logs.distinct('agent.name').sort().exec(function(err, agents) {
    if (err) {
      return handleError(res, err);
    }
    Logs.distinct('error.errorType').sort().exec(function(err, error) {
      if (err) {
        return handleError(res, err);
      }
      Logs.distinct('logType').sort().exec(function(err, logType) {
        if (err) {
          return handleError(res, err);
        }
        var fields = {
          agents: agents,
          errorsTypes: error,
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
