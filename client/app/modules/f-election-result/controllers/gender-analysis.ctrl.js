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
    .module('com.module.fElectionResult')
    .controller('CandidateAnalysisGenderAnalysisCtrl',["$scope", "$stateParams", "CandidateAnalysisService", "$rootScope", function($scope, $stateParams, CandidateAnalysisService, $rootScope) {

      $scope.$parent.ElectionAnalysisSubTitle="See All Elected Candidate of Any Election - gender";

      $scope.loadChartData = function(){
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        CandidateAnalysisService.getCandidatesGenderWhere($scope.electionSeat).then(function (candidates) {
          // console.log(candidates);
          $scope.genderData = candidates.data;
          var chart = c3.generate({
            data: {
              // iris data from R
              columns: $scope.genderData.all.c3data,
              type : 'pie'
            },
            bindto: "#gender-chart"
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
