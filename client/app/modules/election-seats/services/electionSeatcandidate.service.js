(function () {
  'use strict';
  angular
    .module('com.module.electionSeats')
    .service('electionSeatcandidateServiceForES', function (CoreService, ElectionSeat, $filter, gettextCatalog) {
      this.getElectionSeatCandidate = function (id) {
        return ElectionSeat.findById({
          id:id,
          filter: {
            include: [
              'candidates',
              'currentElection'
            ]
          }
        }).$promise;
      };
    });
})();
