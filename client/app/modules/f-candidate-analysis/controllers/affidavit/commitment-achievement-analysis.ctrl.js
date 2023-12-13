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

        $scope.loadChartData = function () {
          // console.log("console.log(this.electionSeat)", $scope.electionSeat);
          CandidateAnalysisService.getCandidatesCommitmentsAchievementsWhere(
            $scope.electionSeat
          ).then(function (candidates) {
            // console.log(candidates.data);
            $scope.commitmentsAndAchievementsData = candidates.data;
            var chart = c3.generate({
              data: {
                // iris data from R
                columns: $scope.commitmentsAndAchievementsData.all.c3data,
                type: "pie",
              },
              bindto: "#commitment-achievement-chart",
            });
          });
        };

        $scope.$on("handleBroadcast", function (event, args) {
          // console.log("in child occupation");
          $scope.loadChartData();
        });
        if (CandidateAnalysisService.verifyFilterData($scope.electionSeat)) {
          $scope.loadChartData();
        }
      },
    ]);

})();
