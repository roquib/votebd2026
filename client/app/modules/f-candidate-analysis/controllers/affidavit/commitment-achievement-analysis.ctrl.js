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
          CandidateAnalysisService.getCandidatesOccupationWhere(
            $scope.electionSeat
          ).then(function (candidates) {
            // console.log(candidates.data);
            $scope.occupationData = candidates.data;
            var chart = c3.generate({
              data: {
                // iris data from R
                columns: $scope.occupationData.all.c3data,
                type: "pie",
              },
              bindto: "#occupation-chart",
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
