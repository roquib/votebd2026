(function () {
  'use strict';
  angular
    .module('com.module.unions')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.unions', {
          abstract: true,
          url: '/unions-municipalities',
          templateUrl: 'modules/unions/views/main.html'
        })
        .state('app.unions.list', {
          url: '',
          templateUrl: 'modules/unions/views/list.html',
          controllerAs: 'ctrl',
          controller: function (upazillas) {
            this.upazillas = upazillas;
          },
          resolve: {
            upazillas: [
              'UpazillasServiceForUnions',
              function (UpazillasServiceForUnions) {
                return UpazillasServiceForUnions.getUpazillas();
              }
            ]
          }
        })
        .state('app.unions.add', {
          url: '/add/:upazillaId',
          templateUrl: 'modules/unions/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, UnionsService, upazillas, union) {
            this.upazillas = upazillas;
            this.union = union;
            this.formFields = UnionsService.getFormFields(upazillas);
            this.formOptions = {};
            this.submit = function () {
              UnionsService.upsertUnion(this.union).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            upazillas: function (UpazillasServiceForUnions) {
              return UpazillasServiceForUnions.getUpazillas();
            },
            union: function ($stateParams) {
              return {
                upazillaId: $stateParams.upazillaId
              };
            }
          }
        })
        .state('app.unions.edit', {
          url: '/:unionId/edit',
          templateUrl: 'modules/unions/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, UnionsService, upazillas, union) {
            this.upazillas = upazillas;
            this.union = union;
            this.formFields = UnionsService.getFormFields(upazillas);
            this.formOptions = {};
            this.submit = function () {
              UnionsService.upsertUnion(this.union).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            upazillas: function (UpazillasServiceForUnions) {
              return UpazillasServiceForUnions.getUpazillas();
            },
            union: function ($stateParams, UnionsService) {
              return UnionsService.getUnion($stateParams.unionId);
            }
          }
        })
        .state('app.unions.addupazilla', {
          url: '/addupazilla',
          templateUrl: 'modules/unions/views/upazillaform.html',
          controllerAs: 'ctrl',
          controller: function ($state, UpazillasServiceForUnions, upazilla,districts) {
            this.upazilla = upazilla;
            this.formFields = UpazillasServiceForUnions.getFormFields(districts);
            this.formOptions = {};
            this.submit = function () {
              UpazillasServiceForUnions.upsertUpazilla(this.upazilla).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            districts: function (UpazillasServiceForUnions) {
              return UpazillasServiceForUnions.getDistricts();
            },
            upazilla: function () {
              return {};
            }
          }
        })
        .state('app.unions.view', {
          url: '/:unionId',
          templateUrl: 'modules/unions/views/view.html',
          controllerAs: 'ctrl',
          controller: function (union) {
            this.union = union;
            // console.log(union);
          },
          resolve: {
            union: function ($stateParams, UnionsService) {
              return UnionsService.getUnion($stateParams.unionId);
            }
          }
        })
        .state('app.unions.editupazilla', {
          url: '/editupazilla/:upazillaId',
          templateUrl: 'modules/unions/views/upazillaform.html',
          controllerAs: 'ctrl',
          controller: function ($state, UpazillasServiceForUnions, upazilla) {
            this.upazilla = upazilla;
            this.formFields = UpazillasServiceForUnions.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              UpazillasServiceForUnions.upsertUpazilla(this.upazilla).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            upazilla: function ($stateParams, UpazillasServiceForUnions) {
              return UpazillasServiceForUnions.getUpazilla($stateParams.upazillaId);
            }
          }
        })
        .state('app.unions.deleteupazilla', {
          url: '/upazilla/:upazillaId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, UpazillasServiceForUnions, union) {
            UpazillasServiceForUnions.deleteUpazilla(union.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            union: function ($stateParams, UpazillasServiceForUnions) {
              return UpazillasServiceForUnions.getUpazilla($stateParams.upazillaId);
            }
          }
        })
        .state('app.unions.delete', {
          url: '/:unionId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, UnionsService, union) {
            UnionsService.deleteUnion(union.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            union: function ($stateParams, UnionsService) {
              return UnionsService.getUnion($stateParams.unionId);
            }
          }
        });
    });

})();
