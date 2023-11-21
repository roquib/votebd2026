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
    .module('com.module.fPoliticalParty')
    .controller('PoliticalPartiesSpentMoneyForElectionCrtl', ["$scope", "$stateParams", "$rootScope", "ElectionAnalysisService", function ($scope, $stateParams, $rootScope, ElectionAnalysisService) {

      $scope.$parent.PoliticalPartySubTitle = 'Political Party Based Comparison - Political Parties spent money for election';

      $scope.piDonation = {};
      // console.log("in PoliticalPartiesSpentMoneyForElection");

      //$scope.piDonation.limit  = 2500000;
      $scope.headingData = "crtl PfsePiFromDonationCrtl";
      $scope.loadChartData = function () {
        // console.log("console.log(this.electionSeat)", $scope.electionSeat);
        ElectionAnalysisService.getPolitycalParty($scope.electionSeat, $scope.piDonation.limit, 'EstimatedAnnualExpendituresOfTheSameCandidateCrtl').then(function (ppdata) {
          if ($rootScope.locale.lang == "bn_BD") {
            for (var i = 0; i < ppdata.length; i++) {
              ppdata[i].politicalPartyNameEn = ppdata[i].politicalPartyNameBn;
            }
          }
          $scope.politicalPartyData = ppdata;
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
