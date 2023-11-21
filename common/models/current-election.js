var Promise = require('bluebird');


module.exports = function(CurrentElection) {

  CurrentElection.getCurrentElectionsWithEelection = function(cb) {

    var response = [];
    CurrentElection.find({include:'election'}, function(err, currentElections) {
      response = currentElections;
      //console.log(response);

      cb(null, response);
    });
  };


  CurrentElection.remoteMethod(
    'getCurrentElectionsWithEelection',
    {
      http: {path: '/getCurrentElectionsWithEelection', verb: 'get'},
      returns: {arg: 'data', type: 'Array'}
    }
  );
};
