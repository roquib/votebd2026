(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .service('ElectionsServiceForCandidate', function (CoreService, Election) {

      this.getElections = function () {
        return Election.find({
          filter: {
            order: 'created DESC',
            include: [
              'electionSeats'
            ]
          }
        }).$promise;
      };

      this.getElection = function (id) {
        return Election.findOne({
          where: {
            id: id
          }
        }).$promise;
      };

    });

})();
