(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .service('UnionsServiceForCandidate', function (CoreService, Union) {

      this.getUnions = function () {
        return Union.find({
          filter: {
            order: 'created DESC',
            include: [
              'unions'
            ]
          }
        }).$promise;
      };

      this.getUnionsByUpazilla = function (upazillaId) {
        return Union.find({
          filter: {
            order: 'created DESC',
            where:{
              upazillaId : upazillaId
            }
          }
        }).$promise;
      };

      this.getUnion = function (id) {
        return Union.findOne({
          where: {
            id: id
          }
        }).$promise;
      };

    });

})();
