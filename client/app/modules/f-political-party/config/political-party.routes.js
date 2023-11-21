(function () {
  'use strict';
  angular
    .module('com.module.fPoliticalParty')
    .config(function ($stateProvider) {
      $stateProvider
         .state('front.politicalPartyBaseComparison', {
          abstract: true,
          url: '/political-party',
          templateUrl: 'modules/f-political-party/views/political-party-base-comparison.html',
          controller: 'CandidateAnalysisCtrl',
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

        .state('front.politicalParty', {
          abstract: true,
          url: '/political-party',
          templateUrl: 'modules/f-political-party/views/main.html',
          controller: 'PoliticalPartyCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.politicalParty.allParties', {
          url: '/all-parties',
          templateUrl: 'modules/f-political-party/views/all-parties.html',
          controller: 'PoliticalPartyAllPartiesCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.politicalParty.alliances', {
          url: '/alliances',
          templateUrl: 'modules/f-political-party/views/alliances.html',
          controller: 'PoliticalPartyAlliancesCtrl',
          controllerAs: 'ctrl'
        })



        .state('front.politicalPartyBaseComparison.Political-Parties-Spent-Money-For-Election', {
          url: '/Political-Parties-Spent-Money-For-Election',
          templateUrl: 'modules/f-political-party/views/political-party-base-comparison/Political-Parties-Spent-Money-For-Election.html',
          controller: 'PoliticalPartiesSpentMoneyForElectionCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.politicalPartyBaseComparison.Political-Party-Donations-To-Candidates', {
          url: '/Political-Party-Donations-To-Candidates',
          templateUrl: 'modules/f-political-party/views/political-party-base-comparison/Political-Party-Donations-To-Candidates.html',
          controller: 'PoliticalPartyDonationsToCandidatesCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.politicalPartyBaseComparison.Candidates-Got-Donations-By-Constituencies', {
          url: '/Candidates-Got-Donations-By-Constituencies',
          templateUrl: 'modules/f-political-party/views/political-party-base-comparison/Candidates-Got-Donations-By-Constituencies.html',
          controller: 'CandidatesGotDonationsByConstituenciesCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.politicalPartyBaseComparison.Head-Wise-Political-Parties-Expenses', {
          url: '/Head-Wise-Political-Parties-Expenses',
          templateUrl: 'modules/f-political-party/views/political-party-base-comparison/Head-Wise-Political-Parties-Expenses.html',
          controller: 'HeadWisePoliticalPartiesExpensesCrtl',
          controllerAs: 'ctrl'
        });
    }
  );

})();
