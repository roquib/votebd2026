(function () {
  'use strict';
  angular
    .module('com.module.divisions')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.divisions', {
          abstract: true,
          url: '/divisions',
          templateUrl: 'modules/divisions/views/main.html'
        })
        .state('app.divisions.list', {
          url: '',
          templateUrl: 'modules/divisions/views/list.html',
          controllerAs: 'ctrl',
          controller: function (divisions,$rootScope) {
            this.divisions = divisions;
          },
          resolve: {
            divisions: function (DivisionsService) {
              return DivisionsService.getDivisions();
            }
          }
        })
        .state('app.divisions.add', {
          url: '/add',
          templateUrl: 'modules/divisions/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, DivisionsService, division) {
            this.division = division;
            this.formFields = DivisionsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              DivisionsService.upsertDivision(this.division).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            division: function () {
              return {};
            }
          }
        })
        .state('app.divisions.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/divisions/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, DivisionsService, division) {
            this.division = division;
            this.formFields = DivisionsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              DivisionsService.upsertDivision(this.division).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            division: function ($stateParams, DivisionsService) {
              return DivisionsService.getDivision($stateParams.id);
            }
          }
        })
        .state('app.divisions.view', {
          url: '/:id',
          templateUrl: 'modules/divisions/views/view.html',
          controllerAs: 'ctrl',
          controller: function (division) {
            this.division = division;
          },
          resolve: {
            division: function ($stateParams, DivisionsService) {
              return DivisionsService.getDivision($stateParams.id);
            }
          }
        })
        .state('app.divisions.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, DivisionsService, division) {
            DivisionsService.deleteDivision(division.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            division: function ($stateParams, DivisionsService) {
              return DivisionsService.getDivision($stateParams.id);
            }
          }
        });
    });

})();
