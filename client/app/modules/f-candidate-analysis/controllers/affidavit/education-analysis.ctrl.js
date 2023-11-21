(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:ElectionResultEducationAnalysisCtrl
   * @description Candidate Search controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.fCandidateAnalysis')
    .controller('CandidateAnalysisEducationAnalysisCtrl', ["$scope", "$stateParams", "CandidateAnalysisService",  function($scope, $stateParams, CandidateAnalysisService) {

      $scope.$parent.candidateAnalysisSubTitle="Affidavit Based Analysis - education";

      $scope.loadChartData = function () {

        CandidateAnalysisService.getCandidatesEducationWhere($scope.electionSeat).then(function (candidates) {
          // console.log(candidates);
          $scope.educationData = candidates.data;
          var chart = c3.generate({
            data: {
              // iris data from R
              columns: $scope.educationData.all.c3data,
              type: 'pie'
            },
            bindto: "#education-chart"
          });
        });
      };
      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child education");
        $scope.loadChartData();
      });
      if(CandidateAnalysisService.verifyFilterData($scope.electionSeat)){
        $scope.loadChartData();
      }
    }]);



})();
