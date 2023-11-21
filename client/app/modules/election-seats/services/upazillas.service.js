(function () {
  'use strict';
  angular
    .module('com.module.electionSeats')
    .service('UpazillasServiceForES', function (CoreService, Upazilla) {

      this.getUpazillas = function () {
        return Upazilla.find({
          filter: {
            order: 'created DESC',
            include: [
              'unions'
            ]
          }
        }).$promise;
      };

      this.getUpazillasByDistrict = function (districtId) {
        return Upazilla.find({
          filter: {
            order: 'created DESC',
            where:{
              districtId : districtId
            }
          }
        }).$promise;
      };

      this.getUpazilla = function (id) {
        return Upazilla.findOne({
          where: {
            id: id
          }
        }).$promise;
      };
    });

})();
