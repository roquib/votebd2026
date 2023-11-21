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
    .controller('ElectionResultCwCandidateListCtrl', function ($scope, elections, currentElections, divisions, electionSeat, ElectionResultService) {

      $scope.$parent.ElectionAnalysisSubTitle="See All Elected Candidate of Any Election - Number of Candidates by Constituency";

      $scope.piDonation = {};
      $scope.sum = function(traveler, Amount){
        var total = 0;
        for (var i = 0; i < traveler.length; i++) {
          total = total + traveler[i]['state'][Amount];
        }
        return total;
      };
      $scope.grandSum = {};
      $scope.loadChartData = function () {
        ElectionResultService.getElectedCandidateByCw($scope.electionSeat, $scope.piDonation.limit, 'EstimatedAnnualExpendituresOfTheSameCandidateCrtl').then(function (ppdata) {

          $scope.grandSum.possible = $scope.sum(ppdata.data, 'possible');
          $scope.grandSum.eligible = $scope.sum(ppdata.data, 'eligible');
          $scope.grandSum.withdrawn = $scope.sum(ppdata.data, 'withdrawn');
          $scope.grandSum.elected = $scope.sum(ppdata.data, 'elected');
          $scope.grandSum.other = $scope.sum(ppdata.data, 'other');
          $scope.grandSum.totalCandidate = $scope.sum(ppdata.data, 'totalCandidate');
          $scope.grandSum.male = $scope.sum(ppdata.data, 'male');
          $scope.grandSum.female = $scope.sum(ppdata.data, 'female');

          $scope.electedCandidates = ppdata.data;
          // console.log(ppdata.data);

        });
      };$scope.objSum = function (array, field) {
        return array.objSum(field);
      };
      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child cases");
        $scope.loadChartData();
      });

    });

})();
