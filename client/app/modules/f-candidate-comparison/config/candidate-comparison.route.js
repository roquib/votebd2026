(function () {
  'use strict';
  angular
    .module('com.module.fCandidateComparison')
    .config( function ($stateProvider) {
      $stateProvider
        .state('front.candidateComparisonTable', {
          url: '/candidate-comparison-table',
          templateUrl: 'modules/f-candidate-comparison/views/main.html',
          controller: 'CandidateComparisonCtrl',
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

        .state('front.candidateComparisonAffidavit', {
          abstract: true,
          url: '/candidate-comparison-affidavit',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-affidavit-main.html',
          controller: 'CandidateComparisonAffidavitCtrl',
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

        .state('front.candidateComparisonFSEE', {
          abstract: true,
          url: '/candidate-comparison-fsee',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-fsee-main.html',
          controller: 'CandidateComparisonAffidavitCtrl',
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

        .state('front.candidateComparisonSame', {
          abstract: true,
          url: '/candidate-comparison-same',
          templateUrl: 'modules/f-candidate-comparison/views/alie-main-same.html',
          controller: 'CandidateComparisonAffidavitCtrl',
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

        .state('front.candidateComparisonYearWise', {
          abstract: true,
          url: '/candidate-comparison-year-wise',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-main-year-wise.html',
          controller: 'CandidateComparisonAffidavitCtrl',
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
















       .state('front.candidateComparisonAffidavit.Different-Election-Participate-Candidate', {
        url: '/Different-Election-Participate-Candidate',
        templateUrl: 'modules/f-candidate-comparison/views/Different-Election-Participate-Candidate.html',
        controller: 'DifferentElectionParticipateCandidateCtrl',
        controllerAs: 'ctrl'
       })
       .state('front.candidateComparisonAffidavit.Asset-Comparison-Of-Own-Dependent', {
          url: '/Asset-Comparison-Of-Own-Dependent',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-affidavit/Asset-Comparison-Of-Own-Dependent.html',
          controller: 'AssetComparisonOfOwnDependentCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonAffidavit.Candidate-Comparision-At-A-Glance', {
           url: '/Candidate-Comparison-At-A-Glance',
           templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-affidavit/Candidate-Comparison-At-A-Glance.html',
           controller: 'CandidateComparisonAtAGlanceCrtl',
           controllerAs: 'ctrl'
         })
        .state('front.candidateComparisonAffidavit.Income-Comparison-Of-Own-Dependent', {
          url: '/Income-Comparison-Of-Own-Dependent',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-affidavit/Income-Comparison-Of-Own-Dependent.html',
          controller: 'IncomeComparisonOfOwnDependentCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonAffidavit.Candidate-Income-Tax-And-Family-Expense', {
          url: '/Candidate-Income-Tax-And-Family-Expense',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-affidavit/Candidate-Income-Tax-And-Family-Expense.html',
          controller: 'CandidateIncomeTaxAndFamilyExpenseCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonAffidavit.Liability-Comparison-Of-Own-Dependent', {
          url: '/Liability-Comparison-Of-Own-Dependent',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-affidavit/Liability-Comparison-Of-Own-Dependent.html',
          controller: 'LiabilityComparisonOfOwnDependentCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonAffidavit.Loan-Comparison-Of-Own-Dependent', {
          url: '/Loan-Comparison-Of-Own-Dependent',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-affidavit/Loan-Comparison-Of-Own-Dependent.html',
          controller: 'LoanComparisonOfOwnDependentCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonAffidavit.Neat-Asset-Comparison-Of-Own-Dependent', {
          url: '/Neat-Asset-Comparison-Of-Own-Dependent',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-affidavit/Neat-Asset-Comparison-Of-Own-Dependent.html',
          controller: 'NeatAssetComparisonOfOwnDependentCrtl',
          controllerAs: 'ctrl'
        })

       .state('front.candidateComparisonFSEE.Total-Probable-Income-Including-All-Sources-To-Meet-Election-Expenses-With-Same-Candidate', {
          url: '/Total-Probable-Income-Including-All-Sources-To-Meet-Election-Expenses-With-Same-Candidate',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-fsee/Total-Probable-Income-Including-All-Sources-To-Meet-Election-Expenses-With-Same-Candidate.html',
          controller: 'TotalProbableIncomeIncludingAllSourcesToMeetElectionExpensesWithSameCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonFSEE.Total-Probable-Income-From-Donation-To-Meet-Election-Expenses-With-The-Same-Candidate', {
          url: '/Total-Probable-Income-From-Donation-To-Meet-Election-Expenses-With-The-Same-Candidate',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-fsee/Total-Probable-Income-From-Donation-To-Meet-Election-Expenses-With-The-Same-Candidate.html',
          controller: 'TotalProbableIncomeFromDonationToMeetElectionExpensesWithTheSameCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonFSEE.All-The-Probable-Income-From-Loans-To-Meet-Election-Expenses-With-The-Same-Candidate', {
          url: '/All-The-Probable-Income-From-Loans-To-Meet-Election-Expenses-With-The-Same-Candidate',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-fsee/All-The-Probable-Income-From-Loans-To-Meet-Election-Expenses-With-The-Same-Candidate.html',
          controller: 'AllTheProbableIncomeFromLoansToMeetElectionExpensesWithTheSameCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonFSEE.The-List-Of-Candidates-Of-Whom-Exceeds-The-Spending-Limits-To-Meet-Election-Expenses', {
          url: '/The-List-Of-Candidates-Of-Whom-Exceeds-The-Spending-Limits-To-Meet-Election-Expenses',
          templateUrl: 'modules/f-candidate-comparison/views/candidate-comparison-fsee/The-List-Of-Candidates-Of-Whom-Exceeds-The-Spending-Limits-To-Meet-Election-Expenses.html',
          controller: 'TheListOfCandidatesOfWhomExceedsTheSpendingLimitsToMeetElectionExpensesCrtl',
          controllerAs: 'ctrl'
        })

        .state('front.candidateComparisonSame.Estimated-Prices-Of-Immoveable-Properties-To-The-Same-Candidate', {
          url: '/Estimated-Prices-Of-Immoveable-Properties-To-The-Same-Candidate',
          templateUrl: 'modules/f-candidate-comparison/views/alie-comparison/Estimated-Prices-Of-Immoveable-Properties-To-The-Same-Candidate.html',
          controller: 'EstimatedPricesOfImmoveablePropertiesToTheSameCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonSame.Estimated-Prices-Of-Dwelling-Houses-To-The-Same-Candidate', {
          url: '/Estimated-Prices-Of-Dwelling-Houses-To-The-Same-Candidate',
          templateUrl: 'modules/f-candidate-comparison/views/alie-comparison/Estimated-Prices-Of-Dwelling-Houses-To-The-Same-Candidate.html',
          controller: 'EstimatedPricesOfDwellingHousesToTheSameCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonSame.Estimated-Prices-Of-Other-Properties-To-The-Same-Candidate', {
          url: '/Estimated-Prices-Of-Other-Properties-To-The-Same-Candidate',
          templateUrl: 'modules/f-candidate-comparison/views/alie-comparison/Estimated-Prices-Of-Other-Properties-To-The-Same-Candidate.html',
          controller: 'EstimatedPricesOfOtherPropertiesToTheSameCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonSame.Estimated-Annual-Liabilities-Of-The-Same-Candidate', {
          url: '/Estimated-Annual-Liabilities-Of-The-Same-Candidate',
          templateUrl: 'modules/f-candidate-comparison/views/alie-comparison/Estimated-Annual-Liabilities-Of-The-Same-Candidate.html',
          controller: 'EstimatedAnnualLiabilitiesOfTheSameCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonSame.Estimated-Annual-Income-Of-The-Same-Candidate', {
          url: '/Estimated-Annual-Income-Of-The-Same-Candidate',
          templateUrl: 'modules/f-candidate-comparison/views/alie-comparison/Estimated-Annual-Income-Of-The-Same-Candidate.html',
          controller: 'EstimatedAnnualIncomeOfTheSameCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonSame.Estimated-Annual-Expenditures-Of-The-Same-Candidate', {
          url: '/Estimated-Annual-Expenditures-Of-The-Same-Candidate',
          templateUrl: 'modules/f-candidate-comparison/views/alie-comparison/Estimated-Annual-Expenditures-Of-The-Same-Candidate.html',
          controller: 'EstimatedAnnualExpendituresOfTheSameCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonSame.Estimated-Price-Of-All-Properties-Of-The-Same-Candidate', {
          url: '/Estimated-Price-Of-All-Properties-Of-The-Same-Candidate',
          templateUrl: 'modules/f-candidate-comparison/views/alie-comparison/Estimated-Price-Of-All-Properties-Of-The-Same-Candidate.html',
          controller: 'EstimatedPriceOfAllPropertiesOfTheSameCandidateCrtl',
          controllerAs: 'ctrl'
        })

       .state('front.candidateComparisonYearWise.test', {
          url: '/test',
          templateUrl: 'modules/f-candidate-comparison/views/year-wise-comparison/test.html',
          controller: 'YearWiseTestComparisonCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparisonYearWiseDetails', {
          url: '/candidate-comparison-year-wise/details/:pid/:cid1/:cid2/:eid1/:eid2',
          templateUrl: 'modules/f-candidate-comparison/views/year-wise-comparison/details.html',
          controller: 'YearWiseDetailsComparisonCrtl',
          controllerAs: 'ctrl'
        })

    }
  );

})();
