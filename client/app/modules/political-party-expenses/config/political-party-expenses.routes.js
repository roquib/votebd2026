(function () {
  'use strict';
  angular
    .module('com.module.politicalPartyExpenses')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.politicalPartyExpenses', {
          abstract: true,
          url: '/politicalPartyExpenses',
          templateUrl: 'modules/political-party-expenses/views/main.html'
        })
        .state('app.politicalPartyExpenses.list', {
          url: '',
          templateUrl: 'modules/political-party-expenses/views/list.html',
          controllerAs: 'ctrl',
          controller: function (currentElections) {
            //console.log(currentElections);
            this.currentElections = currentElections;
          },
          resolve: {
            currentElections: [
              'CurrentElectionsServiceForPPE',
              function (CurrentElectionsServiceForPPE) {
                return CurrentElectionsServiceForPPE.getCurrentElections();
              }
            ]
          }
        })
        .state('app.politicalPartyExpenses.add', {
          url: '/add/:currentElectionId',
          templateUrl: 'modules/political-party-expenses/views/form.html',
          controllerAs: 'ctrl',
          controller: "PoliticalPartyExpenseAddCtrl",
          resolve: {
            currentElections: [
              'CurrentElectionsServiceForPPE',
              function (CurrentElectionsServiceForPPE) {
                return CurrentElectionsServiceForPPE.getCurrentElections();
              }
            ],
            politicalParties: [
              'PoliticalPartiesServiceForPPE',
              function (PoliticalPartiesServiceForPPE) {
                return PoliticalPartiesServiceForPPE.getPoliticalParties();
              }
            ],
            politicalPartyExpense: function ($stateParams) {
              return {
                currentElectionId: $stateParams.currentElectionId
              };
            }
          }
        })
        .state('app.politicalPartyExpenses.edit', {
          url: '/:politicalPartyExpenseId/edit',
          templateUrl: 'modules/political-party-expenses/views/form.html',
          controllerAs: 'ctrl',
          controller: "PoliticalPartyExpenseEditCtrl",
          resolve: {
            currentElections: [
              'CurrentElectionsServiceForPPE',
              function (CurrentElectionsServiceForPPE) {
                return CurrentElectionsServiceForPPE.getCurrentElections();
              }
            ],
            politicalParties: [
              'PoliticalPartiesServiceForPPE',
              function (PoliticalPartiesServiceForPPE) {
                return PoliticalPartiesServiceForPPE.getPoliticalParties();
              }
            ],
            politicalPartyExpense: function ($stateParams, PoliticalPartyExpensesService) {
              return PoliticalPartyExpensesService.getPoliticalPartyExpense($stateParams.politicalPartyExpenseId);
            }
          }
        })

        .state('app.politicalPartyExpenses.view', {
          url: '/:politicalPartyExpenseId',
          templateUrl: 'modules/political-party-expenses/views/view.html',
          controllerAs: 'ctrl',
          controller: function (politicalPartyExpense) {
            this.politicalPartyExpense = politicalPartyExpense;
            // console.log(politicalPartyExpense);
          },
          resolve: {
            politicalPartyExpense: function ($stateParams, PoliticalPartyExpensesService) {
              return PoliticalPartyExpensesService.getPoliticalPartyExpense($stateParams.politicalPartyExpenseId);
            }
          }
        })
        .state('app.politicalPartyExpenses.delete', {
          url: '/:politicalPartyExpenseId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, PoliticalPartyExpensesService, politicalPartyExpense) {
            PoliticalPartyExpensesService.deletePoliticalPartyExpense(politicalPartyExpense.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            politicalPartyExpense: function ($stateParams, PoliticalPartyExpensesService) {
              return PoliticalPartyExpensesService.getPoliticalPartyExpense($stateParams.politicalPartyExpenseId);
            }
          }
        });
    });

})();
