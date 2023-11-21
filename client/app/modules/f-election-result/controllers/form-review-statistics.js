(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:ElectionResultAllElectionResultCtrl
   * @description Candidate Search controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.fElectionResult')
    .controller('ElectionResultFormReviewStatisticsCtrl', function ($scope, elections, currentElections, divisions, electionSeat, ElectionResultService) {
      $scope.sum = function(value){
        var total = {
          reviewAF: 0,
          reviewFSEE: 0,
          reviewALIE: 0,
          reviewEER: 0,
          reviewTR: 0
        };
        for (var i = 0; i < value.length; i++) {
          if(typeof value[i].reviewAF == "string" &&  value[i].reviewAF.length > 2){
            total.reviewAF++;

          }if(typeof value[i].reviewFSEE == "string" &&  value[i].reviewFSEE.length > 2){
            total.reviewFSEE++;

          }if(typeof value[i].reviewALIE == "string" &&  value[i].reviewALIE.length > 2){
            total.reviewALIE++;

          }if(typeof value[i].reviewEERR=="string" &&  value[i].reviewEER.length > 2){
            total.reviewEER++;

          }if(typeof value[i].reviewTR == "string" &&  value[i].reviewTR.length > 2){
            total.reviewTR++;

          }

        }
        return total;
      };
      $scope.piDonation = {};
      $scope.$parent.ElectionAnalysisSubTitle="See All Elected Candidate of Any Election - Candidate Form Submission Review";

      $scope.grandSum = {};
      $scope.loadChartData = function () {
        ElectionResultService.getCandidateFormReviewStatistics($scope.electionSeat, $scope.piDonation.limit, 'EstimatedAnnualExpendituresOfTheSameCandidateCrtl').then(function (ppdata) {
          $scope.grandSum = $scope.sum(ppdata.data);

          $scope.electedCandidates = ppdata.data;
          // console.log(ppdata.data);
        });
      };
      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child cases");
        $scope.loadChartData();
      });

    });

})();
