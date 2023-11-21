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
    .controller('ElectionResultAllCandidateListCtrl', function ($scope, elections, currentElections, divisions, electionSeat, ElectionResultService) {

      $scope.$parent.ElectionAnalysisSubTitle="See All Elected Candidate of Any Election - Election Candidate List";

      $scope.piDonation = {};
      $scope.loadChartData = function () {
        ElectionResultService.getCandidateList($scope.electionSeat, $scope.piDonation.limit, 'EstimatedAnnualExpendituresOfTheSameCandidateCrtl').then(function (ppdata) {
          $scope.electedCandidates = ppdata.data;
        });
      };
      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child cases");
        $scope.loadChartData();
      });

    });

})();
