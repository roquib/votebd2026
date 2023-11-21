(function () {
  'use strict';
  angular
    .module('com.module.electionSeats')
    .service('SeatsServiceForES', function (CoreService, Seat, gettextCatalog) {

      this.getSeats = function () {
        return Seat.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      //this.getSeatsForElectionSeat = function (filterItem) {
      //  return Seat.find({
      //    filter: {
      //      order: 'created DESC'
      //    }
      //  }).$promise;
      //};

      this.getSeatsWhere = function (seatCriteria) {
        var whereCriteria={};

        if(seatCriteria.hasOwnProperty("electionId") && seatCriteria.electionId)
          whereCriteria.electionId = seatCriteria.electionId;

        if(seatCriteria.hasOwnProperty("divisionId") && seatCriteria.divisionId)
          whereCriteria.divisionId = seatCriteria.divisionId;

        if(seatCriteria.hasOwnProperty("districtId") && seatCriteria.districtId)
          whereCriteria.districtId = seatCriteria.districtId;

        if(seatCriteria.hasOwnProperty("upazillaId") && seatCriteria.upazillaId)
          whereCriteria.upazillaId = seatCriteria.upazillaId;

        if(seatCriteria.hasOwnProperty("unionId") && seatCriteria.unionId)
          whereCriteria.unionId = seatCriteria.unionId;

        return Seat.find({
          filter: {
            order: 'created DESC',
            where: whereCriteria,
            include:["election","division","district","upazilla","union"]
          }
        }).$promise;
      };

      this.getSeat = function (id) {
        return Seat.findById({
          id: id
        }).$promise;
      };

    })
  ;

})();
