(function () {
  'use strict';
  angular
    .module('com.module.districts')
    .service('DivisionsServiceForDistrict', function (CoreService, Division, gettextCatalog) {

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

      this.upsertDivision = function (division) {
        return Division.upsert(division).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Division saved'),
              gettextCatalog.getString('Your division is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving division '),
              gettextCatalog.getString('This division could no be saved: ') + err
            );
          }
        );
      };

      this.deleteDivision = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Division.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Division deleted'),
                gettextCatalog.getString('Your division is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting division'),
                gettextCatalog.getString('Your division is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function () {
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
              label: gettextCatalog.getString('Name(Bangla)'),
              required: true
            }
          },
          {
            key: 'nameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name(English)'),
              required: true
            }
          },
          {
            key: 'info',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Info')
            }
          }
        ];
      };

    });

})();
