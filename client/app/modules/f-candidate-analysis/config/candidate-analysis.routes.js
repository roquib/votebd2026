(function () {
  'use strict';
  angular
    .module('com.module.fCandidateAnalysis')
    .config(function ($stateProvider) {
      $stateProvider
        .state('front.candidateAnalysis', {
          abstract: true,
          url: '/candidate-analysis',
          templateUrl: 'modules/f-candidate-analysis/views/main.html',
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
        .state('front.candidateComparison', {
          abstract: true,
          url: '/candidate-analysis',
          templateUrl: 'modules/f-candidate-analysis/views/alie-main-among.html',
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
        .state('front.electionAnalysis', {
          abstract: true,
          url: '/candidate-analysis',
          templateUrl: 'modules/f-candidate-analysis/views/eerb-analysis.html',
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




        .state('front.candidate-form-discrepancy-comparison', {
          abstract: true,
          url: '/candidate-analysis',
          templateUrl: 'modules/f-candidate-analysis/views/candidate-form-discrepancy-comparison-main.html',
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

        .state('front.politicalPartyandCandidates', {
          url: '/politicalParty/:currentElectionId',
          templateUrl: 'modules/f-candidate-analysis/views/affidavit/politicalParty.html',
          controllerAs: 'ctrl',
          controller: 'politicalPartyandCandidatectrl'
        })


        .state('front.candidateAnalysis.affidavit', {
          url: '/all-candidate-analysis',
          templateUrl: 'modules/f-candidate-analysis/views/affidavit/all-candidate-analysis.html',
          controller: 'CandidateAnalysisAllCandidateAnalysisCtrl',
          controllerAs: 'ctrl'
        })


        // .state('front.candidateAnalysis.genderAnalysis', {
        //   url: '/gender-analysis',
        //   templateUrl: 'modules/f-candidate-analysis/views/affidavit/gender-analysis.html',
        //   controller: 'CandidateAnalysisGenderAnalysisCtrl',
        //   controllerAs: 'ctrl'
        // })
        //

        .state('front.candidateAnalysis.occupationAnalysis', {
          url: '/occupation-analysis',
          templateUrl: 'modules/f-candidate-analysis/views/affidavit/occupation-analysis.html',
          controller: 'CandidateAnalysisOccupationAnalysisCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateAnalysis.educationAnalysis', {
          url: '/education-analysis',
          templateUrl: 'modules/f-candidate-analysis/views/affidavit/education-analysis.html',
          controller: 'CandidateAnalysisEducationAnalysisCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateAnalysis.caseAnalysis', {
          url: '/case-analysis',
          templateUrl: 'modules/f-candidate-analysis/views/affidavit/case-analysis.html',
          controller: 'CandidateAnalysisCaseAnalysisCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateAnalysis.assetAnalysis', {
          url: '/asset-analysis',
          templateUrl: 'modules/f-candidate-analysis/views/affidavit/asset-analysis.html',
          controller: 'CandidateAnalysisAssetAnalysisCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateAnalysis.incomeAnalysis', {
          url: '/income-analysis',
          templateUrl: 'modules/f-candidate-analysis/views/affidavit/income-analysis.html',
          controller: 'CandidateAnalysisIncomeAnalysisCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateAnalysis.loanAnalysis', {
          url: '/loan-analysis',
          templateUrl: 'modules/f-candidate-analysis/views/affidavit/loan-analysis.html',
          controller: 'CandidateAnalysisLoanAnalysisCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateAnalysis.taxAnalysis', {
          url: '/tax-analysis',
          templateUrl: 'modules/f-candidate-analysis/views/affidavit/tax-analysis.html',
          controller: 'CandidateAnalysisTaxAnalysisCtrl',
          controllerAs: 'ctrl'
        })

        .state('front.candidateAnalysis.pfse-bo-who-commits-for-donation', {
          url: '/pfse-bo-who-commits-for-donation',
          templateUrl: 'modules/f-candidate-analysis/views/pfse/pfse-bo-who-commits-for-donation.html',
          controller: 'PfseBoWhoCommitsForDonationCrtl',
          controllerAs: 'ctrl'
        }).state('front.candidateAnalysis.pfse-pi-from-loan', {
          url: '/pfse-pi-from-loan',
          templateUrl: 'modules/f-candidate-analysis/views/pfse/pfse-pi-from-loan.html',
          controller: 'PfsePiFromLoanCrtl',
          controllerAs: 'ctrl'
        }).state('front.candidateAnalysis.pfse-pi-from-donation', {
          url: '/pfse-pi-from-donation',
          templateUrl: 'modules/f-candidate-analysis/views/pfse/pfse-pi-from-donation.html',
          controller: 'PfsePiFromDonationCrtl',
          controllerAs: 'ctrl'
        }).state('front.candidateAnalysis.pfse-pi-which-exceeds-spending-limits', {
          url: '/pfse-pi-which-exceeds-spending-limits',
          templateUrl: 'modules/f-candidate-analysis/views/pfse/pfse-pi-which-exceeds-spending-limits.html',
          controller: 'PfsePiWhichExceedsSpendingLimitsCrtl',
          controllerAs: 'ctrl'
        }).state('front.candidateAnalysis.pfse-pi-to-meet-election-expense', {
          url: '/pfse-pi-to-meet-election-expense',
          templateUrl: 'modules/f-candidate-analysis/views/pfse/pfse-pi-to-meet-election-expense.html',
          controller: 'PfsePiToMeetElectionExpenseCrtl',
          controllerAs: 'ctrl'
        }).state('front.candidateAnalysis.pfse-cw-candidate-list', {
          url: '/pfse-cw-candidate-list',
          templateUrl: 'modules/f-candidate-analysis/views/pfse/pfse-cw-candidate-list.html',
          controller: 'PfseCwCandidateListCrtl',
          controllerAs: 'ctrl'
        }).state('front.candidateAnalysis.pfse-cw-candidate-count', {
          url: '/pfse-cw-candidate-count',
          templateUrl: 'modules/f-candidate-analysis/views/pfse/pfse-cw-candidate-count.html',
          controller: 'PfseCwCandidateCountCrtl',
          controllerAs: 'ctrl'
        })

        .state('front.candidateComparison.Estimated-Prices-Of-Immoveable-Properties-To-The-Among-Candidate', {
          url: '/Estimated-Prices-Of-Immoveable-Properties-To-The-Among-Candidate',
          templateUrl: 'modules/f-candidate-analysis/views/alie-comparison/Estimated-Prices-Of-Immoveable-Properties-To-The-Among-Candidate.html',
          controller: 'EstimatedPricesOfImmoveablePropertiesToTheAmongCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparison.Estimated-Prices-Of-Dwelling-Houses-To-The-Among-Candidate', {
          url: '/Estimated-Prices-Of-Dwelling-Houses-To-The-Among-Candidate',
          templateUrl: 'modules/f-candidate-analysis/views/alie-comparison/Estimated-Prices-Of-Dwelling-Houses-To-The-Among-Candidate.html',
          controller: 'EstimatedPricesOfDwellingHousesToTheAmongCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparison.Estimated-Prices-Of-Other-Properties-To-The-Among-Candidate', {
          url: '/Estimated-Prices-Of-Other-Properties-To-The-Among-Candidate',
          templateUrl: 'modules/f-candidate-analysis/views/alie-comparison/Estimated-Prices-Of-Other-Properties-To-The-Among-Candidate.html',
          controller: 'EstimatedPricesOfOtherPropertiesToTheAmongCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparison.Estimated-Annual-Liabilities-Of-The-Among-Candidate', {
          url: '/Estimated-Annual-Liabilities-Of-The-Among-Candidate',
          templateUrl: 'modules/f-candidate-analysis/views/alie-comparison/Estimated-Annual-Liabilities-Of-The-Among-Candidate.html',
          controller: 'EstimatedAnnualLiabilitiesOfTheAmongCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparison.Estimated-Annual-Income-Of-The-Among-Candidate', {
          url: '/Estimated-Annual-Income-Of-The-Among-Candidate',
          templateUrl: 'modules/f-candidate-analysis/views/alie-comparison/Estimated-Annual-Income-Of-The-Among-Candidate.html',
          controller: 'EstimatedAnnualIncomeOfTheAmongCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparison.Estimated-Annual-Expenditures-Of-The-Among-Candidate', {
          url: '/Estimated-Annual-Expenditures-Of-The-Among-Candidate',
          templateUrl: 'modules/f-candidate-analysis/views/alie-comparison/Estimated-Annual-Expenditures-Of-The-Among-Candidate.html',
          controller: 'EstimatedAnnualExpendituresOfTheAmongCandidateCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidateComparison.Estimated-Price-Of-All-Properties-Of-The-Among-Candidate', {
          url: '/Estimated-Price-Of-All-Properties-Of-The-Among-Candidate',
          templateUrl: 'modules/f-candidate-analysis/views/alie-comparison/Estimated-Price-Of-All-Properties-Of-The-Among-Candidate.html',
          controller: 'EstimatedPriceOfAllPropertiesOfTheAmongCandidateCrtl',
          controllerAs: 'ctrl'
        })

        .state('front.electionAnalysis.Candidate-List-who-did-not-submit-the-return-of-election-expenses', {
          url: '/Candidate-List-who-did-not-submit-the-return-of-election-expenses',
          templateUrl: 'modules/f-candidate-analysis/views/eerb-analysis/Candidate-List-who-did-not-submit-the-return-of-election-expenses.html',
          controller: 'CLNotSubmitReturnCrtl',
          controllerAs: 'ctrl'
        }).state('front.electionAnalysis.Candidate-List-who-have-submitted-not-submitted-Election-Expenses-Return', {
          url: '/Candidate-List-who-have-submitted-not-submitted-Election-Expenses-Return',
          templateUrl: 'modules/f-candidate-analysis/views/eerb-analysis/Candidate-List-who-have-submitted-not-submitted-Election-Expenses-Return.html',
          controller: 'CLSubmitReturnCrtl',
          controllerAs: 'ctrl'
        }).state('front.electionAnalysis.Case-list-by-ECB-for-non-compliance-of-submitting-the-election-expenses-return', {
          url: '/Case-list-by-ECB-for-non-compliance-of-submitting-the-election-expenses-return',
          templateUrl: 'modules/f-candidate-analysis/views/eerb-analysis/Case-list-by-ECB-for-non-compliance-of-submitting-the-election-expenses-return.html',
          controller: 'CLNonComplianceSubmitReturnCrtl',
          controllerAs: 'ctrl'
        }).state('front.electionAnalysis.Constituency-wise-money-spent-by-the-candidates-for-campaigning', {
          url: '/Constituency-wise-money-spent-by-the-candidates-for-campaigning',
          templateUrl: 'modules/f-candidate-analysis/views/eerb-analysis/Constituency-wise-money-spent-by-the-candidates-for-campaigning.html',
          controller: 'CWMoneySpentCrtl',
          controllerAs: 'ctrl'
        }).state('front.electionAnalysis.List-of-candidates-of-those-who-spent-more-than-spending-limits', {
          url: '/List-of-candidates-of-those-who-spent-more-than-spending-limits',
          templateUrl: 'modules/f-candidate-analysis/views/eerb-analysis/List-of-candidates-of-those-who-spent-more-than-spending-limits.html',
          controller: 'CLMoreThanSpendingCrtl',
          controllerAs: 'ctrl'
        }).state('front.electionAnalysis.Range-wise-money-spent-by-the-candidates-for-campaigning', {
          url: '/Range-wise-money-spent-by-the-candidates-for-campaigning',
          templateUrl: 'modules/f-candidate-analysis/views/eerb-analysis/Range-wise-money-spent-by-the-candidates-for-campaigning.html',
          controller: 'CLRangeWiseSpentCrtl',
          controllerAs: 'ctrl'
        })

        .state('front.candidate-form-discrepancy-comparison.asset', {
          url: '/asset',
          templateUrl: 'modules/f-candidate-analysis/views/discrepancy/asset.html',
          controller: 'AssetDiscrepancyCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidate-form-discrepancy-comparison.expense', {
          url: '/expense',
          templateUrl: 'modules/f-candidate-analysis/views/discrepancy/expense.html',
          controller: 'ExpenseDiscrepancyCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidate-form-discrepancy-comparison.income', {
          url: '/income',
          templateUrl: 'modules/f-candidate-analysis/views/discrepancy/income.html',
          controller: 'IncomeDiscrepancyCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidate-form-discrepancy-comparison.liability', {
          url: '/liability',
          templateUrl: 'modules/f-candidate-analysis/views/discrepancy/liability.html',
          controller: 'LiabilityDiscrepancyCrtl',
          controllerAs: 'ctrl'
        })
        .state('front.candidate-form-discrepancy-comparison.net-asset', {
          url: '/net-asset',
          templateUrl: 'modules/f-candidate-analysis/views/discrepancy/net-asset.html',
          controller: 'NetAssetDiscrepancyCrtl',
          controllerAs: 'ctrl'
        });
    }
  );

})();
