(function () {
  'use strict';
  angular
    .module('com.module.electionSeats')
    .service('CurrentElectionsServiceForCA', function (CoreService, CurrentElection) {

      this.getCurrentElections = function (electionId) {
        return CurrentElection.find({
          filter: {
            order: 'electionDateTimestamp DESC',
            where: {electionId:electionId}
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
