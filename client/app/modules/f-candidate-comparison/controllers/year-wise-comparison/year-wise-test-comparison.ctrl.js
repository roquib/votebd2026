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
    .controller('YearWiseTestComparisonCrtl', ["$scope", "$state", "$stateParams", "ElectionAnalysisService", function ($scope, $state, $stateParams, ElectionAnalysisService) {

      $scope.$parent.AssetsLiabilitiesIncomeExpensesBasedComparision="Assets/Liabilities/Income/Expenses Based Comparision - Estimated Annual income of the same candidate",

      $scope.piDonation = {};
      // console.log("in EstimatedAnnualIncomeOfTheSameCandidateCrtl");

      //$scope.piDonation.limit  = 2500000;
      $scope.headingData = "crtl PfsePiFromDonationCrtl";
      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        ElectionAnalysisService.getCandidateUnionPerson($scope.electionSeat, $scope.piDonation.limit, 'EstimatedAnnualIncomeOfTheSameCandidateCrtl').then(function (candidates) {
          // console.log(candidates);
          $scope.candidateList = candidates.data;

        });
      };

      $scope.getReport = function (row) {
        $state.go('front.candidateComparisonYearWise.details',{pid:row.personId,
          cid1:row.one.candidateId,
          eid1:row.one.currentElectionId,
          cid2:row.two.candidateId,
          eid2:row.two.currentElectionId
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
