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
    .module('com.module.fCandidateComparison')
    .controller('TheListOfCandidatesOfWhomExceedsTheSpendingLimitsToMeetElectionExpensesCrtl', ["$scope", "$stateParams", "ElectionAnalysisService", function ($scope, $stateParams, ElectionAnalysisService) {
      $scope.piDonation = {};
      // console.log("in EstimatedAnnualExpendituresOfTheSameCandidateCrtl");

      //$scope.piDonation.limit  = 2500000;
      $scope.headingData = "crtl PfsePiFromDonationCrtl";
      $scope.loadChartData = function () {
        ElectionAnalysisService.getCandidatePfseComparison($scope.electionSeat, $scope.piDonation.limit, 'AssetComparisonOfOwnDependentCrtl').then(function (candidates) {
          $scope.candidateList = candidates.data;
          // console.log($scope.candidateList);

        });
      };
      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child cases");
        $scope.loadChartData();
      });
      if (ElectionAnalysisService.verifyFilterData($scope.electionSeat)) {
        //$scope.loadChartData();
      }
    }]);

})();
