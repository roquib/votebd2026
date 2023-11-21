(function () {
  'use strict';
  angular
    .module('com.module.districts')
    .service('DistrictsService', function (CoreService, District, gettextCatalog) {

      this.getDistricts = function () {
        return District.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getDistrict = function (id) {
        return District.findById({
          id: id
        }).$promise;
      };

      this.upsertDistrict = function (district) {
        return District.upsert(district).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('District saved'),
              gettextCatalog.getString('Your District is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Ccandidate Post '),
              gettextCatalog.getString('This District could no be saved: ') + err
            );
          }
        );
      };

      this.deleteDistrict = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            District.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('District deleted'),
                gettextCatalog.getString('Your District is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting District'),
                gettextCatalog.getString('Your District is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function (divisions) {
        var divisionOptions = divisions.map(function (division) {
          return {
            name: division.nameBn,
            value: division.id
          };
        });
        return [
          {
            key: 'oldId',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Old Id')
            }
          },
          {
            key: 'nameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name (Bangla)'),
              required: true
            }
          },
          {
            key: 'nameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name (English)'),
              required: true
            }
          },
          {
            key: 'districtCode',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('District Code (English)'),
              required: true
            }
          },
          {
            key: 'divisionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Division'),
              required: true,
              options: divisionOptions
            }
          },
          {
            key: 'infoBn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Info (Bangla)')
            }
          }
        ];
      };
    });

})();
