(function () {
  'use strict';
  angular
    .module('com.module.entry')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.entry', {
          abstract: true,
          url: '/enties',
          templateUrl: 'modules/entry/views/main.html'
        })
        .state('app.entry.list', {
          url: '',
          templateUrl: 'modules/entry/views/list.html',
          controllerAs: 'ctrl',
          controller:'EntryCrtl',
          //   function (files) {
          //   this.files = files.data;
          // },

          resolve: {
            elections: [
              'ElectionsServiceForES',
              function (ElectionsServiceForES) {
                return ElectionsServiceForES.getElections();
              }
            ],
            currentElections: [
              'CurrentElectionsServiceForES',
              function (CurrentElectionsServiceForCandidate) {
                return CurrentElectionsServiceForCandidate.getCurrentElections();
              }
            ],
            divisions: function (DivisionsServiceForSeats) {
              return DivisionsServiceForSeats.getDivisions();
            },
            electionSeat: function () {
              return {};
            }
          }
        })

      ;
    });

})();
