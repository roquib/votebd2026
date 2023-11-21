(function () {
  'use strict';
  angular
    .module('com.module.constituencies')
    .service('electionSeatcandidateServiceForES', function (CoreService, ElectionSeat, CurrentElection, PoliticalParty, $filter, gettextCatalog) {
      this.getElectionSeatCandidate = function (id) {
          return ElectionSeat.findById({
            id:id,
            filter: {
              include: [
                {candidates:'politicalParty'},
                'currentElection'
              ]
            }
          }).$promise;
      };
      this.getElectionSeatId=function(electionId, name){
        return ElectionSeat.findOne({
          filter: {
            where:{seatNameEn:name, currentElectionId:electionId},
            fields: {id: true},
          }
        }).$promise;
      };
    });
})();
