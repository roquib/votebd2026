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
    .controller('CandidateAnalysisOccupationAnalysisCtrl', [ "$scope", "$stateParams", "$timeout", "CandidateAnalysisService", "Candidate", function ($scope, $stateParams, $timeout, CandidateAnalysisService, Candidate) {

      $scope.$parent.candidateAnalysisSubTitle="Affidavit Based Analysis - Occupation";

      $scope.loadChartData = function () {
        CandidateAnalysisService.getCandidatesOccupationWhere($scope.electionSeat).then(function (candidates) {
          $scope.occupationData = candidates.data;

          // Use $timeout to ensure DOM is ready after ng-if renders
          $timeout(function() {
            // Current profession chart (বর্তমান পেশা)
            if ($scope.occupationData.current && document.getElementById('occupation-chart-current')) {
              c3.generate({
                data: {
                  columns: $scope.occupationData.current.all.c3data,
                  type: 'pie'
                },
                bindto: "#occupation-chart-current"
              });
            }

            // Previous profession chart (পূর্বতন পেশা)
            if ($scope.occupationData.previous && document.getElementById('occupation-chart-previous')) {
              c3.generate({
                data: {
                  columns: $scope.occupationData.previous.all.c3data,
                  type: 'pie'
                },
                bindto: "#occupation-chart-previous"
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
