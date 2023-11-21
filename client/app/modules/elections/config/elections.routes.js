(function () {
  'use strict';
  angular
    .module('com.module.elections')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.elections', {
          abstract: true,
          url: '/elections',
          templateUrl: 'modules/elections/views/main.html'
        })
        .state('app.elections.list', {
          url: '',
          templateUrl: 'modules/elections/views/list.html',
          controllerAs: 'ctrl',
          controller: function (elections) {
            this.elections = elections;
          },
          resolve: {
            elections: function (ElectionsService) {
              return ElectionsService.getElections();
            }
          }
        })
        .state('app.elections.add', {
          url: '/add',
          templateUrl: 'modules/elections/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionsService, election) {
            this.election = election;
            this.formFields = ElectionsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ElectionsService.upsertElection(this.election).then(function () {
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
        .state('app.elections.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/elections/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionsService, election) {
            this.election = election;
            this.formFields = ElectionsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ElectionsService.upsertElection(this.election).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            election: function ($stateParams, ElectionsService) {
              return ElectionsService.getElection($stateParams.id);
            }
          }
        })
        .state('app.elections.view', {
          url: '/:id',
          templateUrl: 'modules/elections/views/view.html',
          controllerAs: 'ctrl',
          controller: function (election) {
            this.election = election;
          },
          resolve: {
            election: function ($stateParams, ElectionsService) {
              return ElectionsService.getElection($stateParams.id);
            }
          }
        })
        .state('app.elections.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionsService, election) {
            ElectionsService.deleteElection(election.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            election: function ($stateParams, ElectionsService) {
              return ElectionsService.getElection($stateParams.id);
            }
          }
        });
    });

})();
