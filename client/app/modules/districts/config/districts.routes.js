(function () {
  'use strict';
  angular
    .module('com.module.districts')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.districts', {
          abstract: true,
          url: '/districts',
          templateUrl: 'modules/districts/views/main.html'
        })
        .state('app.districts.list', {
          url: '',
          templateUrl: 'modules/districts/views/list.html',
          controllerAs: 'ctrl',
          controller: function (divisions) {
            this.divisions = divisions;
          },
          resolve: {
            divisions: [
              'DivisionsServiceForDistrict',
              function (DivisionsServiceForDistrict) {
                return DivisionsServiceForDistrict.getDivisions();
              }
            ]
          }
        })
        .state('app.districts.add', {
          url: '/add/:divisionId',
          templateUrl: 'modules/districts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, DistrictsService, divisions, district) {
            this.divisions = divisions;
            this.district = district;
            this.formFields = DistrictsService.getFormFields(divisions);
            this.formOptions = {};
            this.submit = function () {
              DistrictsService.upsertDistrict(this.district).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            divisions: function (DivisionsServiceForDistrict) {
              return DivisionsServiceForDistrict.getDivisions();
            },
            district: function ($stateParams) {
              return {
                divisionId: $stateParams.divisionId
              };
            }
          }
        })
        .state('app.districts.edit', {
          url: '/:districtId/edit',
          templateUrl: 'modules/districts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, DistrictsService, divisions, district) {
            this.divisions = divisions;
            this.district = district;
            this.formFields = DistrictsService.getFormFields(divisions);
            this.formOptions = {};
            this.submit = function () {
              DistrictsService.upsertDistrict(this.district).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            divisions: function (DivisionsServiceForDistrict) {
              return DivisionsServiceForDistrict.getDivisions();
            },
            district: function ($stateParams, DistrictsService) {
              return DistrictsService.getDistrict($stateParams.districtId);
            }
          }
        })
        .state('app.districts.adddivision', {
          url: '/adddivision',
          templateUrl: 'modules/districts/views/divisionform.html',
          controllerAs: 'ctrl',
          controller: function ($state, DivisionsServiceForDistrict, division) {
            this.division = division;
            this.formFields = DivisionsServiceForDistrict.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              DivisionsServiceForDistrict.upsertDivision(this.division).then(function () {
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
        .state('app.districts.view', {
          url: '/:districtId',
          templateUrl: 'modules/districts/views/view.html',
          controllerAs: 'ctrl',
          controller: function (district) {
            this.district = district;
          //  console.log(district);
          },
          resolve: {
            district: function ($stateParams, DistrictsService) {
              return DistrictsService.getDistrict($stateParams.districtId);
            }
          }
        })
        .state('app.districts.editdivision', {
          url: '/editdivision/:divisionId',
          templateUrl: 'modules/districts/views/divisionform.html',
          controllerAs: 'ctrl',
          controller: function ($state, DivisionsServiceForDistrict, division) {
            this.division = division;
            this.formFields = DivisionsServiceForDistrict.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              DivisionsServiceForDistrict.upsertDivision(this.division).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            division: function ($stateParams, DivisionsServiceForDistrict) {
              return DivisionsServiceForDistrict.getDivision($stateParams.divisionId);
            }
          }
        })
        .state('app.districts.deletedivision', {
          url: '/division/:divisionId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, DivisionsServiceForDistrict, district) {
            DivisionsServiceForDistrict.deleteDivision(district.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            district: function ($stateParams, DivisionsServiceForDistrict) {
              return DivisionsServiceForDistrict.getDivision($stateParams.divisionId);
            }
          }
        })
        .state('app.districts.delete', {
          url: '/:districtId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, DistrictsService, district) {
            DistrictsService.deleteDistrict(district.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            district: function ($stateParams, DistrictsService) {
              return DistrictsService.getDistrict($stateParams.districtId);
            }
          }
        });
    });

})();
