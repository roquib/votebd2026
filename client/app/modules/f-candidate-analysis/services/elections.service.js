(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .service('ElectionsServiceForCA', function (CoreService, Election) {

      this.getElections = function () {
        return Election.find({
          filter: {
            order: 'created DESC',
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
