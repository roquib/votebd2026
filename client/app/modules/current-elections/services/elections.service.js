(function () {
  'use strict';
  angular
    .module('com.module.currentElections')
    .service('ElectionsServiceForCE', function (CoreService, Election, gettextCatalog) {

      this.getElections = function () {
        return Election.find({
          filter: {
            order: 'id DESC',
            include: [
              'currentElections'
            ]
          }
        }).$promise;
      };

      this.getElection = function (id) {
        return Election.findOne({
          where: {
            id: id
          }
        });
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
            key: 'currentElectionNameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name (Bangla)'),
              required: true
            }
          },
          {
            key: 'currentElectionNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name (English)'),
              required: true
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
