(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .service('CurrentElectionsServiceForCandidate', function (CoreService, CurrentElection) {

      this.getCurrentElections = function () {
        // console.log("aise ");
        return CurrentElection.find({
          filter: {
            order: 'electionDateTimestamp DESC',
            include: [
              'electionSeats',
              'election'
            ]
          }
        }).$promise;
      };

      this.getCurrentElectionsOnlyWithElection = function () {
        // console.log("aise ");
        return CurrentElection.find({
          filter: {
            order: 'electionDateTimestamp DESC',
            include: [
              'election'
            ]
          }
        }).$promise;
      };

      this.getCurrentElection = function (currentElectionId) {
        return CurrentElection.findOne({
          filter:{
            include:'election',
            where:{
              id : currentElectionId
            }
          }
        }).$promise;
      };

    });

})();
