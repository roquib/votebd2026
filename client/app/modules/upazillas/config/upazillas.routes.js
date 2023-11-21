(function () {
  'use strict';
  angular
    .module('com.module.upazillas')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.upazillas', {
          abstract: true,
          url: '/upazillas-citycorporations-municipalities',
          templateUrl: 'modules/upazillas/views/main.html'
        })
        .state('app.upazillas.list', {
          url: '',
          templateUrl: 'modules/upazillas/views/list.html',
          controllerAs: 'ctrl',
          controller: function (districts) {
            this.districts = districts;
          },
          resolve: {
            districts: [
              'DistrictsServiceForUpazillas',
              function (DistrictsServiceForUpazillas) {
                return DistrictsServiceForUpazillas.getDistricts();
              }
            ]
          }
        })
        .state('app.upazillas.add', {
          url: '/add/:districtId',
          templateUrl: 'modules/upazillas/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, UpazillasService, districts, upazilla) {
            this.districts = districts;
            this.upazilla = upazilla;
            this.formFields = UpazillasService.getFormFields(districts);
            this.formOptions = {};
            this.submit = function () {
              UpazillasService.upsertUpazilla(this.upazilla).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            districts: function (DistrictsServiceForUpazillas) {
              return DistrictsServiceForUpazillas.getDistricts();
            },
            upazilla: function ($stateParams) {
              return {
                districtId: $stateParams.districtId
              };
            }
          }
        })
        .state('app.upazillas.edit', {
          url: '/:upazillaId/edit',
          templateUrl: 'modules/upazillas/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, UpazillasService, districts, upazilla) {
            this.districts = districts;
            this.upazilla = upazilla;
            this.formFields = UpazillasService.getFormFields(districts);
            this.formOptions = {};
            this.submit = function () {
              UpazillasService.upsertUpazilla(this.upazilla).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            districts: function (DistrictsServiceForUpazillas) {
              return DistrictsServiceForUpazillas.getDistricts();
            },
            upazilla: function ($stateParams, UpazillasService) {
              return UpazillasService.getUpazilla($stateParams.upazillaId);
            }
          }
        })
        .state('app.upazillas.view', {
          url: '/:upazillaId',
          templateUrl: 'modules/upazillas/views/view.html',
          controllerAs: 'ctrl',
          controller: function (upazilla) {
            this.upazilla = upazilla;
            // console.log(upazilla);
          },
          resolve: {
            upazilla: function ($stateParams, UpazillasService) {
              return UpazillasService.getUpazilla($stateParams.upazillaId);
            }
          }
        })
        .state('app.upazillas.delete', {
          url: '/:upazillaId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, UpazillasService, upazilla) {
            UpazillasService.deleteUpazilla(upazilla.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            upazilla: function ($stateParams, UpazillasService) {
              return UpazillasService.getUpazilla($stateParams.upazillaId);
            }
          }
        });
    });

})();
