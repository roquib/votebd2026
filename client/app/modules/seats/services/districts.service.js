(function () {
  'use strict';
  angular
    .module('com.module.seats')
    .service('DistrictsServiceForSeats', function (CoreService, District) {

      this.getDistricts = function () {
        return District.find({
          filter: {
            order: 'created DESC',
            include: [
              'upazillas'
            ]
          }
        }).$promise;
      };

      this.getDistrictsByDivision = function (divisionId) {
        return District.find({
          filter: {
            order: 'created DESC',
            where:{
              divisionId : divisionId
            }
          }
        }).$promise;
      };

      this.getDistrict = function (id) {
        return District.findOne({
          where: {
            id: id
          }
        }).$promise;
      };

    });

})();
