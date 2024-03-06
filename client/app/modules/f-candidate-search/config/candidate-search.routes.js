(function () {
  'use strict';
  angular
    .module('com.module.fCandidateSearch')
    .config(function ($stateProvider) {
      $stateProvider
        .state('front.candidateSearch', {
          url: '/candidates',
          templateUrl: 'modules/f-candidate-search/views/main.html',
          controller: 'CandidateSearchCtrl',
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
        .state('front.candidateSearch.affidavit', {
          url: '/affidavit/:id',
          templateUrl: 'modules/f-candidate-search/views/affidavit/view.html',
          controller: 'CandidateSearchAffidavitCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateSearch.fsee', {
          url: '/probable-fund-source-of-election-expense/:id',
          templateUrl: 'modules/f-candidate-search/views/fsee/view.html',
          controller: 'CandidateSearchFSEECtrl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateSearch.alie', {
          url: '/assets-liability-income-expense/:id',
          templateUrl: 'modules/f-candidate-search/views/alie/view.html',
          controller: 'CandidateSearchALIECtrl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateSearch.eer', {
          url: '/election-expense-return/:id',
          templateUrl: 'modules/f-candidate-search/views/eer/view.html',
          controller: 'CandidateSearchEERCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateSearch.eer-murdhanno', {
          url: '/election-expense-return-murdhanno/:id',
          templateUrl: 'modules/f-candidate-search/views/eer-murdhanno/view.html',
          controller: 'CandidateSearchEERMurdhannoCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateSearch.taxreturn', {
          url: '/tax-return/:id',
          templateUrl: 'modules/f-candidate-search/views/tax-return/view.html',
          controller: 'CandidateSearchTaxRerurnCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateSearch.taxreturn2024', {
          url: '/tax-return-2024/:id',
          templateUrl: 'modules/f-candidate-search/views/tax-return-2024/view.html',
          controller: 'CandidateSearchTaxReturn2024Ctrl',
          controllerAs: 'ctrl'
        });
    }
  );

})();
