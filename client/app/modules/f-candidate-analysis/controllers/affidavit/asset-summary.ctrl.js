(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:CandidateAnalysisAssetSummaryCtrl
   * @description Asset Summary Analysis controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.fCandidateAnalysis')
    .controller('CandidateAnalysisAssetSummaryCtrl', ["$scope", "$stateParams", "CandidateAnalysisService", function($scope, $stateParams, CandidateAnalysisService) {

      $scope.$parent.candidateAnalysisSubTitle="Affidavit Based Analysis - Asset Summary";

      $scope.loadChartData = function () {
        CandidateAnalysisService.getCandidatesAssetSummaryWhere($scope.electionSeat).then(function (result) {
          $scope.assetSummaryData = result.data;
        });
      };
      $scope.$on('handleBroadcast', function (event, args) {
        $scope.loadChartData();
      });
      if(CandidateAnalysisService.verifyFilterData($scope.electionSeat)){
        $scope.loadChartData();
      }
    }]);

})();
