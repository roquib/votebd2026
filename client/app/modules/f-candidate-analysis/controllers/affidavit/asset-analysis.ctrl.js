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
    .controller('CandidateAnalysisAssetAnalysisCtrl', ["$scope", "$stateParams", "CandidateAnalysisService", function ($scope, $stateParams, CandidateAnalysisService, Candidate) {

      $scope.$parent.candidateAnalysisSubTitle="Affidavit Based Analysis - asset";

      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        CandidateAnalysisService.getCandidatesAssetWhere($scope.electionSeat).then(function (candidates) {
          // console.log(candidates);
          $scope.assetData = candidates.data
          var chart = c3.generate({
            data: {
              // iris data from R
              columns: $scope.assetData.all.c3data,
              type: 'pie'
            },
            bindto: "#asset-chart"
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
