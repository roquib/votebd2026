(function () {
  'use strict';
  angular
    .module('com.module.upazillas')
    .service('DistrictsServiceForUpazillas', function (CoreService, Division, District, gettextCatalog) {

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

      this.getDistrict = function (id) {
        return District.findOne({
          where: {
            id: id
          }
        }).$promise;
      };

    });

})();
