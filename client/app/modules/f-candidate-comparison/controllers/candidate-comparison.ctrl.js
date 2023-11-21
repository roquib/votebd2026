/**
 * Created by mahfuz on 1/28/16.
 */
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
    .module('com.module.fCandidateComparison')
    .controller('CandidateComparisonCtrl', ["$scope","elections", "currentElections", "divisions", "CandidateComparisonService", "CandidateAnalysisService","electionSeat", function ($scope,elections, currentElections, divisions, CandidateComparisonService, CandidateAnalysisService,electionSeat) {
      console.log("ekhane aise")
      this.currentElections = currentElections;
      this.electionSeat = electionSeat;
      $scope.electionSeat = electionSeat;
      $scope.candidates = [];
      this.formFields = CandidateAnalysisService.getFormFilterForComparisonTable(elections,currentElections, divisions, electionSeat);
      this.formOptions = {};
      $scope.showImg = true;
      this.submit = function () {
        CandidateComparisonService.getCandidatesWhere(this.electionSeat).then(function (candidates) {
          //console.table(candidates);

          $scope.candidateComparisonData = candidates;

        });
      };
      $scope.exportDoc = function (id,name) {
        var clone = $("#exportedTable").clone();
        clone.find(".edit-link").remove();
        var blob = new Blob([clone.html()]);
        saveAs(blob, (name || "export")+'.doc');
      };
    }]);

})();
