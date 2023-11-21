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
    .module('com.module.fElectionAnalysis')
    .controller('BetweenTheElectedMaleAndFemaleCandidatesOnAverageCampaignExpensesCrtl', ["$scope", "$stateParams", "ElectionAnalysisService", function ($scope, $stateParams, ElectionAnalysisService) {

      $scope.$parent.ElectionExpenseReturnBasedComparisonSubTitle='Election Expense Return Based Comparison - Between the elected male and female candidates on average campaign expenses';

      $scope.piDonation = {};
      $scope.piDonation.limit  = 2500000;
      $scope.headingData = "crtl PfsePiFromDonationCrtl";
      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        ElectionAnalysisService.getEERBComparisonGender($scope.electionSeat, $scope.piDonation.limit, 'CLNonComplianceSubmitReturnCrtl').then(function (candidates) {
          // console.log(candidates);
          $scope.assetChartData = candidates.data.c3data;//$scope.getC3DataIncome(candidates, "assetMaterialOwnTotalAF");
          $scope.pfseTotalIncomeExTableData = candidates.data.table;//$scope.getC3DataIncome(candidates, "assetMaterialOwnTotalAF");

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
