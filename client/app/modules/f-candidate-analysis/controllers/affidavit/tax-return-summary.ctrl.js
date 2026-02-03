(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:CandidateAnalysisTaxReturnSummaryCtrl
   * @description Tax Return Summary Analysis controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.fCandidateAnalysis')
    .controller('CandidateAnalysisTaxReturnSummaryCtrl', ["$scope", "$stateParams", "CandidateAnalysisService", function($scope, $stateParams, CandidateAnalysisService) {

      $scope.$parent.candidateAnalysisSubTitle="Affidavit Based Analysis - Tax Return Summary";

      $scope.loadChartData = function () {
        CandidateAnalysisService.getCandidatesTaxReturnSummaryWhere($scope.electionSeat).then(function (result) {
          $scope.taxSummaryData = result.data;
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
