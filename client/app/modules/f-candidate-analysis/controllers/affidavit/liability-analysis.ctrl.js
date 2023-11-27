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
    .controller('CandidateAnalysisLiabilityAnalysisCtrl', ["$scope", "$stateParams", "CandidateAnalysisService", function ($scope, $stateParams, CandidateAnalysisService) {

      $scope.$parent.candidateAnalysisSubTitle="Affidavit Based Analysis - liability";

      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        CandidateAnalysisService.getCandidatesLiabilityWhere($scope.electionSeat).then(function (candidates) {
          // console.log(candidates);
          $scope.liabilityData = candidates.data;

          var chart = c3.generate({
            data: {
              // iris data from R
              columns: $scope.liabilityData.all.c3data,
              type: 'pie'
            },
            bindto: "#liability-chart"
          });
        });
      };
      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child cases");
        $scope.loadChartData();
      });
      if(CandidateAnalysisService.verifyFilterData($scope.electionSeat)){
        $scope.loadChartData();
      }
    }]);

})();
