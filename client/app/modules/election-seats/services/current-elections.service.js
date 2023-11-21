(function () {
  'use strict';
  angular
    .module('com.module.electionSeats')
    .service('CurrentElectionsServiceForES', function (CoreService, CurrentElection) {

      this.getCurrentElections = function () {
        //console.log("ethekona aise");
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
