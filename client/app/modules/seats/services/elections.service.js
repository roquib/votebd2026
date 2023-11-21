(function () {
  'use strict';
  angular
    .module('com.module.seats')
    .service('ElectionsServiceForSeats', function (CoreService, Election) {

      this.getElections = function () {
        return Election.find({
          filter: {
            order: 'created DESC',
            include: [
              'seats'
            ],
            where:{isPublished:true}
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
