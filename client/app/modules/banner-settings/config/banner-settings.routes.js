(function () {
  angular
    .module('com.module.bannerSettings')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.bannerSettings', {
          abstract: true,
          url: '/bannerSettings',
          templateUrl: 'modules/banner-settings/views/main.html'
        })
        .state('app.bannerSettings.add', {
          url: '/add/:electionId',
          templateUrl: 'modules/banner-settings/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, BannerSettingService, elections, currentElection) {
            this.elections = elections;
            this.currentElection = currentElection;
            this.formFields = BannerSettingService.getFormFields(elections);
            console.log(this.currentElection);
            this.formOptions = {};
            this.submit = function () {
              if(this.elections.hasOwnProperty('electionDate') && this.elections.electionDate){
                this.currentElection.electionDate = new Date( this.currentElection.electionDate);
                this.currentElection.electionDateTimestamp = this.currentElection.electionDate.getTime();
              }
              BannerSettingService.upsertBannerSetting(this.currentElection).then(function () {
                $state.go('^.add');
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
        .state('app.bannerSettings.edit', {
          url: '/:currentElectionId/edit',
          templateUrl: 'modules/banner-settings/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, BannerSettingService, elections, currentElection) {
            this.elections = elections;
            this.currentElection = currentElection;
            this.formFields = BannerSettingService.getFormFields(elections, currentElection);
            console.log(this.formFields);
            this.formOptions = {};
            this.submit = function () {
              BannerSettingService.upsertBannerSetting(this.currentElection).then(function () {
                $state.go('^.add');
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
    });

})();
