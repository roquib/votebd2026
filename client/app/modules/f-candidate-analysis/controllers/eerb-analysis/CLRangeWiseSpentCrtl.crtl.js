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
    .controller('CLRangeWiseSpentCrtl', ["$scope", "$stateParams", "ElectionAnalysisService", function ($scope, $stateParams, ElectionAnalysisService) {

      $scope.$parent.ElectionExpenseReturnBasedComparisonSubTitle='Election Expense Return Based Analysis - Range wise money spent by the candidates for campaigning';

      $scope.piDonation = {};
      $scope.piDonation.limit  = 2500000;
      $scope.headingData = "crtl PfsePiFromDonationCrtl";
      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        ElectionAnalysisService.getEERBRangeWiseMoneySpent($scope.electionSeat, $scope.piDonation.limit, 'CLRangeWiseSpentCrtl').then(function (candidates) {
          // console.log(candidates);
          $scope.spentData = candidates.data;
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
