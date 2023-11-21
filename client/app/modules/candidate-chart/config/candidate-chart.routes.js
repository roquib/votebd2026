(function () {
  'use strict';
  angular
    .module('com.module.candidatechart')
    .config(function ($stateProvider) {
      $stateProvider
        .state('front.candidatechart', {
          abstract: true,
          url: '/candidate-chart',
          templateUrl: 'modules/candidate-chart/views/main.html',
          controller: 'CandidateChartCtrl',
          controllerAs: 'ctrl',
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

        .state('front.candidatechart.allchartanalysis', {
          url: '/chart-analysis',
          templateUrl: 'modules/candidate-chart/views/allChart.html',
          controller: 'CandidateChartAnalysisCtrl',
          controllerAs: 'ctrl'
        })

    });

})();
