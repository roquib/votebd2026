(function () {
  'use strict';
  angular
    .module('com.module.candidatePosts')
    .service('ElectionsServiceForCP', function (CoreService, Election, gettextCatalog) {

      this.getElections = function () {
        return Election.find({
          filter: {
            order: 'created DESC',
            include: [
              'candidatePosts'
            ]
          }
        }).$promise;
      };

      this.getElection = function (id) {
        return Election.findOne({
          where: {
            id: id
          }
        }).$promise;
      };

      this.upsertElection = function (election) {
        return Election.upsert(election).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Election saved'),
              gettextCatalog.getString('Your election is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving election '),
              gettextCatalog.getString('This election could not be saved: ') + err
            );
          }
        );
      };

      this.deleteElection = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Election.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Election deleted'),
                gettextCatalog.getString('Your election is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting election'),
                gettextCatalog.getString('Your election is not deleted! ') + err);
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
            key: 'detail',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Destription'),
              required: true
            }
          },
          {
            key: 'history',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('History'),
              required: true
            }
          },
          {
            key: 'electionType',
            type: 'select',
            templateOptions: {
              label: 'Election Type',
              options: [
                {name: 'Local', value: 'local'},
                {name: 'National', value: 'national'}
              ]
            }
          }
        ];
      };

    });

})();
