(function () {
  'use strict';
  angular
    .module('com.module.currentElections')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.currentElections', {
          abstract: true,
          url: '/currentElections',
          templateUrl: 'modules/current-elections/views/main.html'
        })
        .state('app.currentElections.list', {
          url: '',
          templateUrl: 'modules/current-elections/views/list.html',
          controllerAs: 'ctrl',
          controller: function (elections) {
            this.elections = elections;
          },
          resolve: {
            elections: [
              'ElectionsServiceForCE',
              function (ElectionsServiceForCE) {
                return ElectionsServiceForCE.getElections();
              }
            ]
          }
        })
        .state('app.currentElections.add', {
          url: '/add/:electionId',
          templateUrl: 'modules/current-elections/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, CurrentElectionsService, elections, currentElection) {
            this.elections = elections;
            this.currentElection = currentElection;
            this.formFields = CurrentElectionsService.getFormFields(elections);
            this.formOptions = {};
            this.submit = function () {
              if(this.currentElection.hasOwnProperty('electionDate') && this.currentElection.electionDate){
                this.currentElection.electionDate = new Date( this.currentElection.electionDate);
                this.currentElection.electionDateTimestamp = this.currentElection.electionDate.getTime();
              }
              CurrentElectionsService.upsertCurrentElection(this.currentElection).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            elections: function (ElectionsServiceForCE) {
              return ElectionsServiceForCE.getElections();
            },
            currentElection: function ($stateParams) {
              return {
                electionId: $stateParams.electionId
              };
            }
          }
        })
        .state('app.currentElections.edit', {
          url: '/:currentElectionId/edit',
          templateUrl: 'modules/current-elections/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, CurrentElectionsService, elections, currentElection) {
            this.elections = elections;
            this.currentElection = currentElection;
            this.formFields = CurrentElectionsService.getFormFields(elections);
            this.formOptions = {};
            this.submit = function () {
              if(this.currentElection.hasOwnProperty('electionDate') && this.currentElection.electionDate){
                this.currentElection.electionDate = new Date( this.currentElection.electionDate);
                this.currentElection.electionDateTimestamp = this.currentElection.electionDate.getTime();
              }
              CurrentElectionsService.upsertCurrentElection(this.currentElection).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            elections: function (ElectionsServiceForCE) {
              return ElectionsServiceForCE.getElections();
            },
            currentElection: function ($stateParams, CurrentElectionsService) {
              return CurrentElectionsService.getCurrentElection($stateParams.currentElectionId);
            }
          }
        })
        .state('app.currentElections.addelection', {
          url: '/addelection',
          templateUrl: 'modules/current-elections/views/electionform.html',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionsServiceForCE, election) {
            this.election = election;
            this.formFields = ElectionsServiceForCE.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ElectionsServiceForCE.upsertElection(this.election).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            election: function () {
              return {};
            }
          }
        })
        .state('app.currentElections.view', {
          url: '/:currentElectionId',
          templateUrl: 'modules/current-elections/views/view.html',
          controllerAs: 'ctrl',
          controller: function (currentElection,ElectionsServiceForCE) {
            this.currentElection = currentElection;
            this.election = ElectionsServiceForCE.getElection(currentElection.currentElectionId);
            //console.log(currentElection);
            //console.log(this.election);
          },
          resolve: {
            elections: function (ElectionsServiceForCE) {
              return ElectionsServiceForCE.getElections();
            },
            currentElection: function ($stateParams, CurrentElectionsService) {
              return CurrentElectionsService.getCurrentElection($stateParams.currentElectionId);
            }
          }
        })
        .state('app.currentElections.editelection', {
          url: '/editelection/:electionId',
          templateUrl: 'modules/current-elections/views/electionform.html',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionsServiceForCE, election) {
            this.election = election;
            this.formFields = ElectionsServiceForCE.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ElectionsServiceForCE.upsertElection(this.election).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            election: function ($stateParams, ElectionsServiceForCE) {
              return ElectionsServiceForCE.getElection($stateParams.electionId);
            }
          }
        })
        .state('app.currentElections.deleteelection', {
          url: '/election/:electionId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionsServiceForCE, currentElection) {
            ElectionsServiceForCE.deleteElection(currentElection.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            currentElection: function ($stateParams, ElectionsServiceForCE) {
              return ElectionsServiceForCE.getElection($stateParams.electionId);
            }
          }
        })
        .state('app.currentElections.delete', {
          url: '/:currentElectionId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, CurrentElectionsService, currentElection) {
            CurrentElectionsService.deleteCurrentElection(currentElection.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            currentElection: function ($stateParams, CurrentElectionsService) {
              return CurrentElectionsService.getCurrentElection($stateParams.currentElectionId);
            }
          }
        });
    });

})();
