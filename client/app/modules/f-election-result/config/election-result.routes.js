(function () {
  'use strict';
  angular
    .module('com.module.fElectionResult')
    .config(function ($stateProvider) {
      $stateProvider
        .state('front.electionResult', {
          abstract: true,
          url: '/election-result',
          templateUrl: 'modules/f-election-result/views/main.html',
          controller: 'ElectionResultCtrl',
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
            politicalParties:[
              'PoliticalPartiesService',
              function (PoliticalPartiesService) {
                return PoliticalPartiesService.getPoliticalParties();
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
        .state('front.electionResult.allElectionResult', {
          url: '/all-election-result',
          templateUrl: 'modules/f-election-result/views/all-election-result.html',
          controller: 'ElectionResultAllElectionResultCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.electionResult.allCandidateList', {
          url: '/all-candidate-list',
          templateUrl: 'modules/f-election-result/views/all-candidate-list.html',
          controller: 'ElectionResultAllCandidateListCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.electionResult.allCandidateInfo', {
          url: '/all-candidate-info',
          templateUrl: 'modules/f-election-result/views/all-candidate-info.html',
          controller: 'ElectionResultAllCandidateInfoCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.electionResult.CwCandidateList', {
          url: '/cw-candidate-list',
          templateUrl: 'modules/f-election-result/views/cw-candidate-list.html',
          controller: 'ElectionResultCwCandidateListCtrl',
          controllerAs: 'ctrl'
        }).state('front.electionResult.form-submission-status', {
          url: '/form-submission-status',
          templateUrl: 'modules/f-election-result/views/form-submit-statistics.html',
          controller: 'ElectionResultFormSubmitStatisticsCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.electionResult.form-entry-status', {
          url: '/form-entry-status',
          templateUrl: 'modules/f-election-result/views/form-entry-statistics.html',
          controller: 'ElectionResultFormEntryStatisticsCtrl',
          controllerAs: 'ctrl'
        }).state('front.electionResult.form-review-status', {
          url: '/form-review-status',
          templateUrl: 'modules/f-election-result/views/form-review-statistics.html',
          controller: 'ElectionResultFormReviewStatisticsCtrl',
          controllerAs: 'ctrl'
        })

        .state('front.electionResult.genderAnalysis', {
          url: '/gender-analysis',
          templateUrl: 'modules/f-election-result/views/gender-analysis.html',
          controller: 'CandidateAnalysisGenderAnalysisCtrl',
          controllerAs: 'ctrl'
        });
    }
  );

})();
