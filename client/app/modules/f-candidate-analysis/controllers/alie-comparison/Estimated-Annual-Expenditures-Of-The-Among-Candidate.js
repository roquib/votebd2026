(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:ElectionResultOccupationAnalysisCtrl
   * @description Candidate Search controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.fCandidateAnalysis')
    .controller('EstimatedAnnualExpendituresOfTheAmongCandidateCrtl', ["$scope", "$stateParams", "ElectionAnalysisService", function ($scope, $stateParams, ElectionAnalysisService) {

      $scope.$parent.ElectionExpenseReturnBasedAnalysis='Assets/Liability/Income/Expense Based Analysis - Estimated Annual expenditures of the same candidate';
    //console.log($scope.$parent.ElectionExpenseReturnBasedAnalysis);

      $scope.piDonation = {};
      // console.log("in EstimatedAnnualExpendituresOfTheSameCandidateCrtl");

      //$scope.piDonation.limit  = 2500000;
      $scope.headingData = "crtl PfsePiFromDonationCrtl";
      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        ElectionAnalysisService.getALIE($scope.electionSeat, $scope.piDonation.limit, 'EstimatedAnnualExpendituresOfTheSameCandidateCrtl').then(function (candidates) {
          // console.log(candidates);
          $scope.assetChartData = candidates.data.c3data;//$scope.getC3DataIncome(candidates, "assetMaterialOwnTotalAF");
          $scope.pfseTotalIncomeExTableData = candidates.data.table;//$scope.getC3DataIncome(candidates, "assetMaterialOwnTotalAF");
          $scope.totalCandidate = candidates.data.totalCandidate;

        });
      };
      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child cases");
        $scope.loadChartData();
      });
      if(ElectionAnalysisService.verifyFilterData($scope.electionSeat)){
        //$scope.loadChartData();
      }
    }]);

})();

//_1b_22_CampaignCostAmountEER --1
//_1b_22_ConveyanceCostAmountEER --2
//_1b_22_PublicMeetingCostAmountEER --3
//_1b_22_CampCostAmountEER --4
//_1b_22_AgentCostAmountEER --5
//_1b_22_AdministrationCostAmountEER --6
//_1b_22_ElectionCostAmountEER = this is total
