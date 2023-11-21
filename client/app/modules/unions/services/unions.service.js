(function () {
  'use strict';
  angular
    .module('com.module.unions')
    .service('UnionsService', function (CoreService, Union, gettextCatalog) {

      this.getUnions = function () {
        return Union.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getUnion = function (id) {
        return Union.findById({
          id: id
        }).$promise;
      };

      this.upsertUnion = function (union) {
        return Union.upsert(union).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Union/Municipality saved'),
              gettextCatalog.getString('Your union/municipality is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving union/municipality '),
              gettextCatalog.getString('This union/municipality could no be saved: ') + err
            );
          }
        );
      };

      this.deleteUnion = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Union.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Union/municipality deleted'),
                gettextCatalog.getString('Your union/municipality is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting union/municipality'),
                gettextCatalog.getString('Your union/municipality is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function (upazillas) {
        var catOptions = upazillas.map(function (upazilla) {
          return {
            name: upazilla.nameBn,
            value: upazilla.id
          };
        });
        return [
          {
            key: 'nameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('name (English)'),
              required: true
            }
          },
          {
            key: 'nameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('name (Bangla)'),
              required: true
            }
          },
          {
            key: 'upazillaId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Upazilla'),
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
            defaultValue : 'union',
            templateOptions: {
              label: 'Region Type',
              options: [
                {name: 'Union', value: 'union'},
                {name: 'Municipality', value: 'municipality'}
              ]
            }
          }
        ];
      };
    });

})();
