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
    .controller('ElectionResultCtrl', function($scope,elections,currentElections,politicalParties,divisions,electionSeat,CandidateAnalysisService) {

      $scope.ElectionAnalysisSubTitle="";

      this.currentElections = currentElections;
      this.electionSeat = electionSeat;
      $scope.electionSeat = electionSeat;
      this.formFields = CandidateAnalysisService.getFormFilterForElection(elections, currentElections, politicalParties, divisions, electionSeat);
      this.formOptions = {};
      this.submit = function(){
        $scope.$broadcast('handleBroadcast');
      }
    });

})();
