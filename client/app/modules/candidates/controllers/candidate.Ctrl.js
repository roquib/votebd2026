(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .controller('CandidateCrtl', ["$scope",'elections','currentElections','divisions','CandidatesService','CandidateAnalysisService','electionSeat', function ($scope,elections, currentElections, divisions, CandidatesService,CandidateAnalysisService, electionSeat) {
      this.currentElections = currentElections;

      this.electionSeat = electionSeat;

      $scope.candidates = [];
      this.formFields = CandidatesService.getFormFilter(elections,currentElections, divisions, electionSeat);
      this.formOptions = {};

      this.submit = function () {
        // console.log(this.electionSeat);

        CandidatesService.getCandidatesWhere(this.electionSeat).then(function (candidates) {
          //console.log(candidates);
          $scope.candidates = candidates;
        });
      };

      //pagination
      //this.currentElections = currentElections;
      this.currentPage = 1;
      this.currentPage2 = 1;
      this.pageSize = 10;
      this.pageChangeHandler = function (num) {
        // console.log('page changed to ' + num);
      };

    }]);

})();
