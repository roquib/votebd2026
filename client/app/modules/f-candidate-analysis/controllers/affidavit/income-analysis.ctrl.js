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
    .controller('CandidateAnalysisIncomeAnalysisCtrl', ["$scope", "$stateParams", "$timeout", "CandidateAnalysisService", function ($scope, $stateParams, $timeout, CandidateAnalysisService) {

      $scope.$parent.candidateAnalysisSubTitle="Affidavit Based Analysis - income";

      $scope.loadChartData = function () {
        CandidateAnalysisService.getCandidatesIncomeWhere($scope.electionSeat).then(function (candidates) {
          $scope.incomeData = candidates.data;

          // Use $timeout to ensure DOM is ready after ng-if renders
          $timeout(function() {
            // Domestic income chart
            if ($scope.incomeData.domestic && document.getElementById('income-chart-domestic')) {
              c3.generate({
                data: {
                  columns: $scope.incomeData.domestic.all.c3data,
                  type: 'pie'
                },
                bindto: "#income-chart-domestic"
              });
            }

            // Foreign income chart
            if ($scope.incomeData.foreign && document.getElementById('income-chart-foreign')) {
              c3.generate({
                data: {
                  columns: $scope.incomeData.foreign.all.c3data,
                  type: 'pie'
                },
                bindto: "#income-chart-foreign"
              });
            }
          }, 100);
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
