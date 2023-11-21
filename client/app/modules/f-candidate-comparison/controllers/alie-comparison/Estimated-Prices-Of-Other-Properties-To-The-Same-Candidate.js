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
    .module('com.module.fCandidateComparison')
    .controller('EstimatedPricesOfOtherPropertiesToTheSameCandidateCrtl', ["$scope", "$stateParams", "ElectionAnalysisService", function ($scope, $stateParams, ElectionAnalysisService) {

      $scope.$parent.AssetsLiabilitiesIncomeExpensesBasedComparision="Assets/Liabilities/Income/Expenses Based Comparision - Estimated Prices of other properties to the same candidate",

      $scope.piDonation = {};      //console.log("in EstimatedPricesOfOtherPropertiesToTheSameCandidateCrtl");

      //$scope.piDonation.limit  = 2500000;
      $scope.headingData = "crtl PfsePiFromDonationCrtl";
      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        ElectionAnalysisService.getALIEComparison($scope.electionSeat, $scope.piDonation.limit, 'EstimatedPricesOfOtherPropertiesToTheSameCandidateCrtl').then(function (candidates) {
          // console.log(candidates);
          $scope.candidateList = candidates.data;

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
