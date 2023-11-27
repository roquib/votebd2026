(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:ElectionResultEducationAnalysisCtrl
   * @description Candidate Search controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.candidatechart')
    .controller('CandidateChartAnalysisCtrl', ["$scope", "$stateParams","elections","currentElections","divisions","electionSeat", "CandidateChartAnalysisService",  function($scope, $stateParams,elections,currentElections, divisions, electionSeat, CandidateChartAnalysisService) {


      $scope.loadChartData = function () {

        CandidateChartAnalysisService.getCandidatesEducationWhere($scope.electionSeat).then(function (candidates) {
          //console.log(candidates);
          $scope.educationData = candidates.data;
          $scope.educationChartBelowSscCount = $scope.educationData.all.c3data[0][1];
          var chart = c3.generate({
            data: {
              // iris data from R
              columns: $scope.educationData.all.c3data,
              type: 'pie'
            },
            bindto: "#education-chart"
          });
        });

        CandidateChartAnalysisService.getCandidatesOccupationWhere($scope.electionSeat).then(function (candidates) {
          //console.log(candidates);
          $scope.occupationData = candidates.data;
          $scope.occupationChartBusinessmenCount = $scope.occupationData.all.c3data[1][1];
          var chart = c3.generate({
            data: {
              columns: $scope.occupationData.all.c3data,
              type: 'pie'
            },
            bindto: "#occupationChart"
          });
        });

        CandidateChartAnalysisService.getCandidatesCasesWhere($scope.electionSeat).then(function (candidates) {
          //console.log(candidates);
          $scope.casesData = candidates.data;
          $scope.pastCandidate302Case=$scope.casesData.all.pastCandidate302;
          $scope.presentCandidate302Case = $scope.casesData.all.presentCandidate302;
          var chart = c3.generate({
            data: {
              columns: $scope.casesData.c3data,
              type: 'pie'
            },
            bindto: "#casesChart"
          });
        });


        CandidateChartAnalysisService.getCandidatesIncomeWhere($scope.electionSeat).then(function (candidates) {
          //console.log(candidates);
          $scope.incomeData = candidates.data;
          $scope.incomeChartBelow2Lac   = $scope.incomeData.all.c3data[0][1];
          $scope.incomeChartAbove1Crore = $scope.incomeData.all.c3data[5][1];
          var chart = c3.generate({
            data: {
              columns: $scope.incomeData.all.c3data,
              type: 'pie'
            },
            bindto: "#incomeChart"
          });
        });

        //chart-5-asset
        //console.log("console.log(this.electionSeat)", $scope.electionSeat);
        CandidateChartAnalysisService.getCandidatesAssetWhere($scope.electionSeat).then(function (candidates) {
          //console.log(candidates.data);
          $scope.assetData = candidates.data;
          $scope.assetChartBelow5Lac = $scope.assetData.all.c3data[0][1];
          $scope.assetChartAbove5Lac = $scope.assetData.all.c3data[1][1]+$scope.assetData.all.c3data[2][1]+$scope.assetData.all.c3data[3][1]+
                                       $scope.assetData.all.c3data[4][1]+$scope.assetData.all.c3data[5][1];
          var chart = c3.generate({
            data: {
              columns: $scope.assetData.all.c3data,
              type: 'pie'
            },
            bindto: "#assetChart"
          });
        });

        //chart-6-loan
        CandidateChartAnalysisService.getCandidatesLoanWhere($scope.electionSeat).then(function (candidates) {
          //console.log(candidates);
          $scope.loanData = candidates.data;
          $scope.loanChartAbove5Crore = $scope.loanData.all.c3data[5][1];
          var chart = c3.generate({
            data: {
              columns: $scope.loanData.all.c3data,
              type: 'pie'
            },
            bindto: "#loanChart"
          });
        });

        //chart-6-liability
        CandidateChartAnalysisService.getCandidatesLiabilityWhere($scope.electionSeat).then(function (candidates) {
          //console.log(candidates);
          $scope.liabilityData = candidates.data;
          $scope.liabilityChartAbove5Crore = $scope.liabilityData.all.c3data[5][1];
          var chart = c3.generate({
            data: {
              columns: $scope.liabilityData.all.c3data,
              type: 'pie'
            },
            bindto: "#liabilityChart"
          });
        });

        //chart-7 Tax
        CandidateChartAnalysisService.getCandidatesTaxWhere($scope.electionSeat).then(function (candidates) {
          //console.log(candidates);
          $scope.taxData = candidates.data;
          $scope.taxChartAbove10Lac = $scope.taxData.all.c3data[6][1];
          var chart = c3.generate({
            data: {
              columns: $scope.taxData.all.c3data,
              type: 'pie'
            },
            bindto: "#taxChart"
          });
        });

        //chart-8 Gender
        CandidateChartAnalysisService.getCandidatesGenderWhere($scope.electionSeat).then(function (candidates) {
          //console.log(candidates);
          $scope.genderData = candidates.data;
          $scope.genderChartFemaleCount = $scope.genderData.all.c3data[1][1];
          var chart = c3.generate({
            data: {
              columns: $scope.genderData.all.c3data,
              type : 'pie'
            },
            bindto: "#genderChart"
          });
        });
        CandidateChartAnalysisService.getCurrentElectionWhere(this.electionSeat).then(function (currentElection) {
          $scope.election = currentElection;
          //console.log($scope.election);
        });
      };//loadchartdata

      $scope.$on('handleBroadcast', function (event, args) {
        $scope.loadChartData();
      });
      if(CandidateChartAnalysisService.verifyFilterData($scope.electionSeat)){
        $scope.loadChartData();
      }
    }]);



})();
