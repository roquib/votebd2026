(function () {
  'use strict';
  angular
    .module('com.module.currentElections')
    .service('CurrentElectionsService', function (CoreService, CurrentElection, gettextCatalog) {

      this.getCurrentElections = function () {
        return CurrentElection.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getCurrentElection = function (id) {
        return CurrentElection.findById({
          id: id
        }).$promise;
      };

      this.upsertCurrentElection = function (currentElection) {
        return CurrentElection.upsert(currentElection).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Current Election saved'),
              gettextCatalog.getString('Your Current Election is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Current Election '),
              gettextCatalog.getString('This Current Election could no be saved: ') + err
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
                gettextCatalog.getString('Your Current Election is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Current Election'),
                gettextCatalog.getString('Your Current Election is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function (elections) {
        var electionOptions = elections.map(function (election) {
          return {
            name: election.nameBn,
            value: election.id
          };
        });
        return [
          {
            key: 'currentElectionNameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Current Election Name (English)'),
              required: true
            }
          },
          {
            key: 'currentElectionNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Current Election Name (Bangla)'),
              required: true
            }
          },
          {
            key: 'electionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Election'),
              required: true,
              options: electionOptions
            }
          },
          {
            key: 'totalVoter',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Total Voter'),
              required: true
            }
          },
          {
            key: 'maleVoter',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Male Voter'),
              required: true
            }
          },
          {
            key: 'femaleVoter',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Female Voter'),
              required: true
            }
          },
          {
            key: 'hijraVoter',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Third Gender Voter')
            }
          },
          {
            key: 'electionDescBn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Election Description (Bangla)')
            }
          },
          {
            key: 'isFeatured',
            type: 'select',
            templateOptions: {
              label: 'isFeatured',
              options: [
                {name: 'Yes', value: '1'},
                {name: 'No', value: '0'}
              ]
            }
          },
          {
            key: 'displayType',
            type: 'select',
            templateOptions: {
              label: 'Display Type',
              options: [
                {name: 'Private', value: 'private'},
                {name: 'Public', value: 'public'}
              ]
            }
          },
          {
            key: 'electionDate',
            type: 'datepicker',
            templateOptions: {
              label: 'Election Date',
              type: 'text',
              datepickerPopup: 'dd-MMMM-yyyy',
              datepickerOptions: {
                format: 'dd-MMMM-yyyy'
              }
            }
          }
        ];
      };
    });

})();
