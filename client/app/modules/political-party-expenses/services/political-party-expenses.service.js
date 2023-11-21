(function () {
  'use strict';
  angular
    .module('com.module.politicalPartyExpenses')
    .service('PoliticalPartyExpensesService', function (CoreService, PoliticalPartyExpense, $filter,gettextCatalog) {

      this.getPoliticalPartyExpenses = function () {
        return PoliticalPartyExpense.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getPoliticalPartyExpense = function (id) {
        return PoliticalPartyExpense.findById({
          id: id
        }).$promise;
      };

      this.upsertPoliticalPartyExpense = function (politicalPartyExpense) {
        return PoliticalPartyExpense.upsert(politicalPartyExpense).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Political Party Expense saved'),
              gettextCatalog.getString('Your Political Party Expense is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Political Party Expense '),
              gettextCatalog.getString('This Political Party Expense could no be saved: ') + err
            );
          }
        );
      };

      this.deletePoliticalPartyExpense = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            PoliticalPartyExpense.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Political Party Expense deleted'),
                gettextCatalog.getString('Your Political Party Expense is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Political Party Expense'),
                gettextCatalog.getString('Your Political Party Expense is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function (currentElections,politicalParties) {
        var currentElectionOptions = currentElections.map(function (currentElection) {
          return {
            name: $filter('date')(currentElection.electionDate, "dd/MM/yyyy") + " - " +currentElection.election.nameBn + " - " +currentElection.currentElectionNameBn,
            value: currentElection.id
          };
        });
        var politicalPartyOptions = politicalParties.map(function (politicalParty) {
          return {
            name: politicalParty.partyNameBn + " - " +politicalParty.partyNameEn,
            value: politicalParty.id
          };
        });
        return [
          {
            key: 'currentElectionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Election'),
              required: true,
              options: currentElectionOptions
            }
          },
          {
            key: 'politicalPartyId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Political Party'),
              required: true,
              options: politicalPartyOptions
            }
          },
          {
            key: 'politicalPartyNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Political Party Name (Bangla)')
            }
          },
          {
            key: 'politicalPartyNameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Political Party Name (English)')
            }
          },
          {
            key: 'executiveDirectorName',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Executive Director Name (Bangla)')
            }
          },
          {
            key: 'executiveDirectorPost',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Executive Director Post (Bangla)')
            }
          },
          {
            key: 'politicalPartyAddressBn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Political Party Address (Bangla)')
            }
          },
          {
            key: 'submissionDate',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Submission Date')
            }
          },
          {
            key: 'pdfFilePath',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Pdf File Path')
            }
          },
          {
            key: 'isPublished',
            type: 'select',
            "defaultValue": true,
            templateOptions: {
              label: 'Publish',
              options: [
                {name: 'Publish', value: true},
                {name: 'Draft', value: false}
              ]
            }
          }
        ];
      };
    });

})();
