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
    .controller('CandidateAnalysisCaseAnalysisCtrl', ["$scope", "$stateParams", "CandidateAnalysisService", function ($scope, $stateParams, CandidateAnalysisService) {

      $scope.$parent.candidateAnalysisSubTitle="Affidavit Based Analysis - Case";

      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        CandidateAnalysisService.getCandidatesCasesWhere($scope.electionSeat).then(function (candidates) {
          // console.log(candidates.data);
          $scope.casesData = candidates.data;
          //$scope.casesChartData = [];
          //candidates.data.table.forEach(function (val) {
          //  $scope.casesChartData.push([val.partyName, val.data.totalCases])
          //});
          var chart = c3.generate({
            data: {
              // iris data from R
              columns: $scope.casesData.c3data,
              type: 'pie'
            },
            bindto: "#cases-chart"
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
