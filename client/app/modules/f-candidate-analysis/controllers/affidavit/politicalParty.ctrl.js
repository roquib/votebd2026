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
    .module('com.module.fCandidateAnalysis')
    .controller('politicalPartyandCandidatectrl', [ "$scope", "$stateParams", "CandidateAnalysisService", "Candidate", function ($scope, $stateParams, CandidateAnalysisService, Candidate) {

      $scope.currentElectionId=$stateParams.currentElectionId;
      var currentElectionCriteria={};
      currentElectionCriteria.currentElectionId=$scope.currentElectionId;
      $scope.election=[];
      $scope.femaleCandidate=0;
      CandidateAnalysisService.getFeaturedElection($scope.currentElectionId).then(function(currentElection){
        $scope.election=currentElection;
      })

      $scope.loadChartData = function () {

        CandidateAnalysisService.getPoliticalPartyWhere(currentElectionCriteria).then(function (candidates) {
          $scope.politicalPartyData = candidates.data;
          var chart = c3.generate({
            data: {
              columns: $scope.politicalPartyData.all.c3data,
              type: 'pie'
            },
            bindto: "#politicalParty-chart"
          });
        });
      };

      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child education");
        $scope.loadChartData();
      });
      if($scope.currentElectionId){
        $scope.loadChartData();
      }

      $scope.partyNamesBn = [];
      $scope.databelowssc = [];
      $scope.datassc = [];
      $scope.labelssc = [];
      $scope.datahsc = [];
      $scope.databsc = [];
      $scope.datamsc = [];
      $scope.degreeTypesBn = [];
      $scope.options = {
        scales: {
          xAxes: [{
            stacked: false,
            beginAtZero: true,
            scaleLabel: {
                labelString: 'Month'
            },
            ticks: {
                stepSize: 1,
                min: 0,
                autoSkip: false
            }
        }]
        }
      };
     var politicalPartyCounts=[];
      CandidateAnalysisService.getCurrentElectionCandidate($scope.currentElectionId).then(function(candidates){
        for(var i=0; i<candidates.length; i++){
          if(candidates[i].politicalParty){
            if(candidates[i].politicalParty.partyNameBn in politicalPartyCounts==false){
              //// must initialize the sub-object, otherwise will get 'undefined' errors
              politicalPartyCounts[candidates[i].politicalParty.partyNameBn] = {};
              $scope.partyNamesBn.push(candidates[i].politicalParty.partyNameBn);
            }
           if(candidates[i].degreeTypeBnAF in politicalPartyCounts[candidates[i].politicalParty.partyNameBn]==false) {
               politicalPartyCounts[ candidates[i].politicalParty.partyNameBn ] [ candidates[i].degreeTypeBnAF ] = 1;
               $scope.degreeTypesBn.push( candidates[i].degreeTypeBnAF );
           } else {
                //console.log( politicalPartyCounts[ candidates[i].politicalParty.partyNameBn ] [ candidates[i].degreeTypeBnAF ] );
                politicalPartyCounts[ candidates[i].politicalParty.partyNameBn ] [ candidates[i].degreeTypeBnAF ]++;
           }
         }
        }
        for(var i=0; i<$scope.partyNamesBn.length; i++){
          $scope.databelowssc.push(politicalPartyCounts[$scope.partyNamesBn[i]]['এসএসসির নীচে']);
          $scope.datassc.push(politicalPartyCounts[$scope.partyNamesBn[i]].এসএসসি);
          //$scope.labelssc.push($scope.partyNamesBn[i]);
          //if (typeof politicalPartyCounts[$scope.partyNamesBn[i]].এইচএসস !== 'undefined'){
            $scope.datahsc.push(politicalPartyCounts[$scope.partyNamesBn[i]].এইচএসসি);
          // }else{
          //   $scope.datahsc.push(0);
          // }
          $scope.databsc.push(politicalPartyCounts[$scope.partyNamesBn[i]].স্নাতক);
          $scope.datamsc.push(politicalPartyCounts[$scope.partyNamesBn[i]].স্নাতকোত্তর);
        }
        for(var i=0; i<$scope.datahsc.length; i++){
            if (typeof $scope.datahsc[i] === 'undefined'){
               $scope.datahsc[i]=0;
            }
          //$scope.datamsc.push(politicalPartyCounts[$scope.partyNamesBn[i]].স্নাতকোত্তর);
        }


        // $scope.datassc.sort(function(a, b){return b - a});
        // console.log($scope.datahsc);
        // console.log(politicalPartyCounts);
      })

    }]);
})();
