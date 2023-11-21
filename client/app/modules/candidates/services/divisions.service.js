(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .service('DivisionsServiceForCandidate', function (CoreService, Division) {

      this.getDivisions = function () {
        return Division.find({
          filter: {
            order: 'created DESC',
            include: [
              'districts'
            ]
          }
        }).$promise;
      };

      this.getDivision = function (id) {
        return Division.findOne({
          where: {
            id: id
          }
        }).$promise;
      };

    });

})();
