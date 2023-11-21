(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:CandidateSearchCtrl
   * @description Candidate Search controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.fCandidateSearch')
    //.controller('CandidateSearchCtrl', function($scope, $http, $timeout, $interval,CandidateSearchService) {
    .controller('CandidateSearchCtrl', function($scope,elections, currentElections,politicalParties,divisions,CandidateAnalysisService,CandidateSearchService,electionSeat,  $http, $timeout, $interval, Candidate) {

      this.currentElections = currentElections;
      this.electionSeat = electionSeat;
      $scope.candidates=[];

      this.formFields = CandidateAnalysisService.getFormFilter(elections,currentElections,politicalParties,divisions,electionSeat);
      this.formOptions = {};
      this.submit = function () {
        // console.log(this.electionSeat);
        CandidateSearchService.getCandidatesWhere(this.electionSeat).then(function (candidates) {
        //  console.log('candidates.length',candidates.length);
          $scope.candidatesss = candidates;

        });
      };

      //pagination
      //this.currentElections = currentElections;
      this.currentPage = 1;
      this.currentPage2 = 1;
      this.pageSize = 10;
      this.pageChangeHandler = function(num) {
        // console.log('page changed to ' + num);
      };


    //  candidate find

      //this.candidatesss = Candidate.find({
      //  filter:{
      //    fields:['id','candidateNameBnAF','fatherHusbandNameBnAF','motherNameBnAF','professionTypeBnAF','addressBnAF'],
      //    limit:10,
      //    skip:900
      //  }
      //});
      //console.log(this.candidatesss);

      //console.log(Candidate.find({
      //  filter:{
      //    limit:10,
      //    skip:900
      //  }
      //}));




      $scope.showHide=false;
      $scope.hideShow=false;
      $scope.mjhaddclass="col-sm-9";

      $scope.candidateData=function (hideShow) {

        $scope.hideShow=!$scope.hideShow;
        $scope.showHide=!$scope.showHide;
        //console.log($scope.showHide);

        if($scope.mjhaddclass==="col-sm-9"){
          $scope.mjhaddclass="col-sm-12";
        }else{
          $scope.mjhaddclass="col-sm-9";
        }
          // console.log($scope.mjhaddclass)

      };






    });

})();
