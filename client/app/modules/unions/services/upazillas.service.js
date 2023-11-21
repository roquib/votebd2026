(function () {
  'use strict';
  angular
    .module('com.module.unions')
    .service('UpazillasServiceForUnions', function (CoreService, District, Upazilla, gettextCatalog) {

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

      this.getUpazilla = function (id) {
        return Upazilla.findOne({
          where: {
            id: id
          }
        }).$promise;
      };

    });

})();
