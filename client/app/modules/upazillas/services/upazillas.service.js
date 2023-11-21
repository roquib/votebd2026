(function () {
  'use strict';
  angular
    .module('com.module.upazillas')
    .service('UpazillasService', function (CoreService, Upazilla, gettextCatalog) {

      this.getUpazillas = function () {
        return Upazilla.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getUpazilla = function (id) {
        return Upazilla.findById({
          id: id
        }).$promise;
      };

      this.upsertUpazilla = function (upazilla) {
        return Upazilla.upsert(upazilla).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Upazilla/city corporation/municipality saved'),
              gettextCatalog.getString('Your upazilla/city corporation/municipality is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving upazilla/city corporation/municipality '),
              gettextCatalog.getString('This upazilla/city corporation/municipality could no be saved: ') + err
            );
          }
        );
      };

      this.deleteUpazilla = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Upazilla.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Upazilla/city corporation/municipality deleted'),
                gettextCatalog.getString('Your upazilla/city corporation/municipality is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting upazilla/city corporation/municipality'),
                gettextCatalog.getString('Your upazilla/city corporation/municipality is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function (districts) {
        var catOptions = districts.map(function (district) {
          return {
            name: district.nameBn,
            value: district.id
          };
        });
        return [
          {
            key: 'nameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name (English)'),
              required: true
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
            key: 'districtId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('District'),
              required: true,
              options: catOptions
            }
          },
          {
            key: 'descriptionBn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('description (Bangla)')
            }
          },
          {
            key: 'regionType',
            type: 'select',
            defaultValue : 'upazilla',
            templateOptions: {
              label: 'Region Type',
              options: [
                {name: 'Upazilla', value: 'upazilla'},
                {name: 'Municipality', value: 'municipality'},
                {name: 'City Corporation', value: 'citycorporation'}
              ]
            }
          }
        ];
      };
    });

})();
