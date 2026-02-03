(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:CandidateAnalysisAgeAnalysisCtrl
   * @description Age Analysis controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.fCandidateAnalysis')
    .controller('CandidateAnalysisAgeAnalysisCtrl', ["$scope", "$stateParams", "CandidateAnalysisService", function($scope, $stateParams, CandidateAnalysisService) {

      $scope.$parent.candidateAnalysisSubTitle="Affidavit Based Analysis - Age";

      $scope.loadChartData = function () {
        CandidateAnalysisService.getCandidatesAgeWhere($scope.electionSeat).then(function (candidates) {
          $scope.ageData = candidates.data;
          var chart = c3.generate({
            data: {
              columns: $scope.ageData.all.c3data,
              type: 'pie'
            },
            bindto: "#age-chart"
          });
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
