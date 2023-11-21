(function () {
  'use strict';
  angular
    .module('com.module.electionSeats')
    .service('ElectionsServiceForES', function (CoreService, Election) {

      this.getElections = function () {
        return Election.find({
          filter: {
            order: 'created DESC',
            where:{isPublished:true},
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
