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
    .controller('AssetComparisonOfOwnDependentCrtl', ["$scope", "$stateParams", "ElectionAnalysisService", function ($scope, $stateParams, ElectionAnalysisService) {

      $scope.$parent.AffidavitBasedComparision="Affidavit Based Comparision - Asset comparison of own, dependent",

      $scope.piDonation = {};
      //console.log("in EstimatedAnnualExpendituresOfTheSameCandidateCrtl");

      $scope.totalAssetOwnOne=0;
      $scope.totalAssetDependentOne=0;
      $scope.totalAssetOne=0;
      $scope.totalAssetOwnTwo=0;
      $scope.totalAssetDependentTwo=0;
      $scope.totalAssetTwo=0;

      $scope.piDonation.limit  = 2500000;
      $scope.headingData = "crtl PfsePiFromDonationCrtl";
      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        ElectionAnalysisService.getCandidateAffidavitComparison($scope.electionSeat, $scope.piDonation.limit, 'AssetComparisonOfOwnDependentCrtl').then(function (candidates) {
          $scope.candidateList =candidates.data;
          for(var i=0; i<$scope.candidateList.candidateList.length; i++){
            $scope.totalAssetOwnOne+=$scope.candidateList.candidateList[i].one.assetOwn;
            $scope.totalAssetDependentOne+=$scope.candidateList.candidateList[i].one.assetDependent;
            $scope.totalAssetOne+=$scope.candidateList.candidateList[i].one.assetTotal;
            $scope.totalAssetOwnTwo+=$scope.candidateList.candidateList[i].two.assetOwn;
            $scope.totalAssetDependentTwo+=$scope.candidateList.candidateList[i].two.assetDependent;
            $scope.totalAssetTwo+=$scope.candidateList.candidateList[i].two.assetTotal;
          }
        });
      };
      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child cases");
        $scope.loadChartData();
      });
      if (ElectionAnalysisService.verifyFilterData($scope.electionSeat)) {
      }
    }]);

})();
