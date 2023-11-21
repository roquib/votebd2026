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
    .controller('PfseBoWhoCommitsForDonationCrtl', ["$scope", "$stateParams", "CandidateAnalysisService", function ($scope, $stateParams, CandidateAnalysisService) {

      $scope.$parent.candidateAnalysisSubTitle="Probable Fund Source of Election Expenses Based Analysis - List of business organizations who commits for donation to the candidates";

      $scope.piDonation = {};
      $scope.headingData = "crtl PfsePiFromDonationCrtl";
      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        CandidateAnalysisService.getPfseCandidatesBusinessOrganization($scope.electionSeat, $scope.piDonation.limit).then(function (candidates) {
          // console.log(candidates);
          $scope.assetChartData = candidates.data.c3data;
          $scope.pfseBOTableData = candidates.data.table;
          $scope.totalCandidate = candidates.data.totalCandidate;

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
