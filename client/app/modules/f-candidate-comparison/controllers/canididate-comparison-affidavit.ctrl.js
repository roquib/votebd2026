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
    .module('com.module.fCandidateAnalysis')
    .controller('CandidateComparisonAffidavitCtrl', ["$scope", "elections", "currentElections", "politicalParties", "divisions", "CandidateAnalysisService", "electionSeat", function ($scope, elections, currentElections, politicalParties, divisions, CandidateAnalysisService, electionSeat) {
      $scope.candidateAnalysisTitle ="";
      $scope.AffidavitBasedComparision="",
      $scope.ProbableFundSourceforElectionExpenseBasedComparision="",
      $scope.AssetsLiabilitiesIncomeExpensesBasedComparision="",

      this.currentElections = currentElections;
      this.electionSeat = electionSeat;
      $scope.electionSeat = electionSeat;
      $scope.candidates = [];
      this.formFields = CandidateAnalysisService.getFormFilterForComparison(elections, currentElections, politicalParties, divisions, electionSeat);
      this.formOptions = {};
      this.submit = function () {
        $scope.$broadcast('handleBroadcast');

      };

    }])

})();
