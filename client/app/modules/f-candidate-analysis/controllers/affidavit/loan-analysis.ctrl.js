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
    .controller('CandidateAnalysisLoanAnalysisCtrl', ["$scope", "$stateParams", "CandidateAnalysisService", function ($scope, $stateParams, CandidateAnalysisService) {

      $scope.$parent.candidateAnalysisSubTitle="Affidavit Based Analysis - loan";

      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        CandidateAnalysisService.getCandidatesLoanWhere($scope.electionSeat).then(function (candidates) {
          // console.log(candidates);
          $scope.loanData = candidates.data;

          var chart = c3.generate({
            data: {
              // iris data from R
              columns: $scope.loanData.all.c3data,
              type: 'pie'
            },
            bindto: "#loan-chart"
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
