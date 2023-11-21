(function () {
  'use strict';
  angular
    .module('com.module.electionCandidatePosts')
    .service('CurrentElectionServiceForECP', function (CoreService, CurrentElection, gettextCatalog) {

      this.getCurrentElections = function () {
        return CurrentElection.find({
          filter: {
            order: 'electionDateTimestamp DESC',
            include: [
              'electionCandidatePosts',
              'election'
            ]
          }
        }).$promise;
      };

      this.getCurrentElectionsWithEelection = function () {
        return CurrentElection.getCurrentElectionsWithEelection().$promise;
      };

      this.getCurrentElection = function (id) {
        return CurrentElection.findOne({
          filter:{
            include:'election',
            where: {
              id: id
            }
          }
        }).$promise;
      };

      this.upsertCurrentElection = function (election) {
        return CurrentElection.upsert(election).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Current Election saved'),
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

      this.deleteCurrentElection = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            CurrentElection.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Current Election deleted'),
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
              label: 'CurrentElection Type',
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
