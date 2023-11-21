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
    .controller('PfseCwCandidateCountCrtl', ["$scope", "$stateParams", "CandidateAnalysisService", function ($scope, $stateParams, CandidateAnalysisService) {

      $scope.$parent.candidateAnalysisSubTitle="Probable Fund Source of Election Expenses Based Analysis - Constituency wise Candidates Count which Exceeds Probable Income Spending Limits";

      $scope.piDonation = {};
      $scope.piDonation.limit  = 2500000;
      $scope.headingData = "crtl PfseCwCandidateListCrtl";
      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        CandidateAnalysisService.getPfseCandidates5($scope.electionSeat,  $scope.piDonation.limit).then(function (candidates) {
          // console.log(candidates);
          $scope.assetChartData = candidates.data.c3data;
          $scope.pfseIncomeTableData = candidates.data.table;
          $scope.totalCandidate = candidates.data.totalCandidate;

        });
      };
      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child cases");
        $scope.loadChartData();
      });
      //if(CandidateAnalysisService.verifyFilterData($scope.electionSeat)){
      //  $scope.loadChartData();
      //}
    }]);

})();
