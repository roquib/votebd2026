(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:ElectionResultCommitmentAchievementAnalysisCtrl
   * @description Candidate Search controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module("com.module.fCandidateAnalysis")
    .controller("CandidateCommitmentAchievementAnalysisCtrl", [
      "$scope",
      "$stateParams",
      "CandidateAnalysisService",
      "Candidate",
      function ($scope, $stateParams, CandidateAnalysisService, Candidate) {
        $scope.$parent.candidateAnalysisSubTitle =
          "Affidavit Based Analysis - Commitment Achievement";

        $scope.piDonation = {};
        $scope.loadChartData = function () {
          // console.log("console.log(this.electionSeat)", $scope.electionSeat);
          CandidateAnalysisService.getCandidatesCommitmentsAchievementsWhere(
            $scope.electionSeat,
            $scope.piDonation.limit
          ).then(function (candidates) {
            $scope.commitmentsAndAchievementsData = candidates.data;
          });
        };

        $scope.$on("handleBroadcast", function (event, args) {
          // console.log("in child occupation");
          $scope.loadChartData();
        });
      },
    ]);

})();
