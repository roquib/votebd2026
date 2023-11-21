(function () {
  'use strict';
  angular
    .module('com.module.electionCandidatePosts')
    .service('ElectionsServiceForECP', function (CoreService, Election, gettextCatalog) {

      this.getElections = function () {
        return Election.find({
          filter: {
            order: 'id DESC',
            include: [
              'currentElections'
            ]
          }
        }).$promise;
      };

      this.getElection = function (id) {
        return Election.findOne({
          where: {
            id: id
          }
        });
      };
    });

})();
