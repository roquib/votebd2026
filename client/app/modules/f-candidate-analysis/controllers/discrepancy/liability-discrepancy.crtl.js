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
    // .module('com.module.fElectionAnalysis')
    .module('com.module.fCandidateAnalysis')
    .controller('LiabilityDiscrepancyCrtl', ["$scope", "$stateParams", "ElectionAnalysisService", function ($scope, $stateParams, ElectionAnalysisService) {

      $scope.$parent.ElectionExpenseReturnBasedAnalysis = 'Assets/Liability/Income/Expense Based Analysis - Estimated Annual expenditures of the same candidate';


      $scope.piDonation = {};
      // console.log("in EstimatedAnnualExpendituresOfTheSameCandidateCrtl");


      $scope.headingData = "crtl PfsePiFromDonationCrtl";
      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        ElectionAnalysisService.getDiscrepancy($scope.electionSeat, $scope.piDonation.limit, 'EstimatedAnnualExpendituresOfTheSameCandidateCrtl').then(function (candidates) {
          // console.log(candidates);
          $scope.assetChartData = candidates.data.c3data;
          $scope.pfseTotalIncomeExTableData = candidates.data.table;

        });
      };
      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child cases");
        $scope.loadChartData();
      });
      if (ElectionAnalysisService.verifyFilterData($scope.electionSeat)) {

      }
    }]);

})();
