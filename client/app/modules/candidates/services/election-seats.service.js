(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .service('ElectionSeatsServiceForCandidate', function (CoreService, ElectionSeat, Seat, CurrentElection, gettextCatalog, $filter) {

      this.getElectionSeats = function () {
        return ElectionSeat.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getElectionSeatsWhere = function (electionSeatCriteria) {
        var whereCriteria={};

        if(electionSeatCriteria.hasOwnProperty("currentElectionId") && electionSeatCriteria.currentElectionId)
          whereCriteria.currentElectionId = electionSeatCriteria.currentElectionId;

        if(electionSeatCriteria.hasOwnProperty("divisionId") && electionSeatCriteria.divisionId)
          whereCriteria.divisionId = electionSeatCriteria.divisionId;

        if(electionSeatCriteria.hasOwnProperty("districtId") && electionSeatCriteria.districtId)
          whereCriteria.districtId = electionSeatCriteria.districtId;

        if(electionSeatCriteria.hasOwnProperty("upazillaId") && electionSeatCriteria.upazillaId)
          whereCriteria.upazillaId = electionSeatCriteria.upazillaId;

        if(electionSeatCriteria.hasOwnProperty("unionId") && electionSeatCriteria.unionId)
          whereCriteria.unionId = electionSeatCriteria.unionId;

        return ElectionSeat.find({
          filter: {
            order: 'district.nameEn ASC',
            where: whereCriteria,
            include: ["currentElection","division","district","upazilla","union"]
          }
        }).$promise;
      };

      this.getElectionSeat = function (id) {
        return ElectionSeat.findById({
          id: id
        }).$promise;
      };

    });

})();
