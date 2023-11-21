(function () {
  'use strict';
  angular
    .module('com.module.politicalPartyExpenses')
    .service('CurrentElectionsServiceForPPE', function (CoreService, CurrentElection) {

      this.getCurrentElections = function () {
        return CurrentElection.find({
          filter: {
            order: 'electionDateTimestamp DESC',
            include: [
              'politicalPartyExpenses','election'
            ]
          }
        }).$promise;
      };

      this.getCurrentElection = function (id) {
        return CurrentElection.findOne({
          where: {
            id: id
          }
        }).$promise;
      };
    });

})();
