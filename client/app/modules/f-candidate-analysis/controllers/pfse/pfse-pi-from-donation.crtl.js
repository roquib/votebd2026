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
    .controller('PfsePiFromDonationCrtl', ["$scope", "$stateParams", "CandidateAnalysisService", function ($scope, $stateParams, CandidateAnalysisService) {

      $scope.$parent.candidateAnalysisSubTitle="Probable Fund Source of Election Expenses Based Analysis - Probable Income From Donation";

      $scope.piDonation = {};
      $scope.headingData = "crtl PfsePiFromDonationCrtl";
      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        CandidateAnalysisService.getPfseCandidatesDonation($scope.electionSeat, $scope.piDonation.limit).then(function (candidates) {
          // console.log(candidates);
          $scope.assetChartData = candidates.data.c3data;
          $scope.pfseDonationTableData = candidates.data.table;
          $scope.totalCandidate = candidates.data.totalCandidate;
          //var chart = c3.generate({
          //  data: {
          //    // iris data from R
          //    columns: $scope.assetChartData.c3data,
          //    type: 'pie'
          //  },
          //  bindto: "#asset-chart"
          //});
        });
      };
      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child cases");
        $scope.loadChartData();
      });
      if(CandidateAnalysisService.verifyFilterData($scope.electionSeat)){
        //$scope.loadChartData();
      }
    }]);

})();
