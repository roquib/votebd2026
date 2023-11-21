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
    .controller('CandidateAnalysisCtrl', ["$scope", "elections", "currentElections", "politicalParties", "divisions", "CandidateAnalysisService", "electionSeat", function ($scope, elections, currentElections, politicalParties, divisions, CandidateAnalysisService, electionSeat) {
      $scope.candidateAnalysisTitle ="";

      $scope.ElectionExpenseReturnBasedAnalysis ="";

      $scope.PoliticalPartySubTitle="";

      $scope.ElectionExpenseReturnBasedComparisonSubTitle="";

      //$scope.ElectionAnalysisElectionExpenseReturnSubTitle="",

      this.currentElections = currentElections;
      this.electionSeat = electionSeat;
      $scope.electionSeat = electionSeat;
      $scope.candidates = [];
      $scope.showUnionsSelectBox=false;
      this.formFields = CandidateAnalysisService.getFormFilter(elections, currentElections, politicalParties, divisions, electionSeat);
      this.formOptions = {};
      this.submit = function () {
        $scope.$broadcast('handleBroadcast');
        //console.log(this.electionSeat);
        //CandidateAnalysisService.getCandidatesEducationWhere(this.electionSeat).then(function (candidates) {
        //  console.log(candidates);
        //  $scope.candidatesss =$scope.getC3Data(candidates, "highestDegreeBnAF");
        //  var chart = c3.generate({
        //    data: {
        //      // iris data from R
        //      columns: $scope.candidatesss,
        //      type : 'pie'
        //    },
        //    bindto: "#education-chart"
        //  });
        //});
      };
      $scope.getC3Data = function (value, key) {
        var array = [];
        for (var i = 0; i < value.length; i++) {
          if (value[i][key])
            array.push(value[i][key]);
        }
        var uniqueArray = array.filter(function (value, index) {
          return array.indexOf(value) === index;
        });
        var c3data = [];
        for (var i = 0; i < uniqueArray.length; i++) {
          c3data[i] = [];
          var total = 0;
          for (var j = 0; j < array.length; j++) {
            if (uniqueArray[i] === array[j]) {
              total++;
            }
          }
          c3data[i].push(uniqueArray[i]);
          c3data[i].push(total);
        }
        return c3data;
      };

      $scope.getC3DataIncome = function (value, key) {
        var income = [
          {
            title: "Less then 10,000",
            titleBn: "১০,০০০ থেকে কম",
            total: 0
          },
          {
            title: "10,000 to 50,000",
            titleBn: "১০,০০০ থেকে ৫০,০০০",
            total: 0
          },
          {
            title: "50,000 to 100,000",
            titleBn: "৫০,০০০ থেকে ১০০,০০০",
            total: 0
          },
          {
            title: "100,000 to 500,000",
            titleBn: "১০০,০০০ থেকে ৫০০,০০০",
            total: 0
          },
          {
            title: "500,000 to 1,000,000",
            titleBn: "৫০০,০০০ থেক ১,০০০,০০০",
            total: 0
          },
          {
            title: "1,000,000 to 5,000,000",
            titleBn: "১,০০০,০০০ থেকে ৫,০০০,০০০",
            total: 0
          },
          {
            title: "5,000,000 to 10,000,000",
            titleBn: "৫,০০০,০০০ থেকে ১০,০০০,০০০",
            total: 0
          },
          {
            title: "10,000,000 to 50,000,000",
            titleBn: "১০,০০০,০০০ থেকে ৫০,০০০,০০০",
            total: 0
          },
          {
            title: "More then 50,000,000",
            titleBn: "৫০,০০০,০০০ থেকে বেশী",
            total: 0
          },
          {
            title: "Unknown",
            titleBn: "জানা নেই",
            total: 0
          }
        ];
        value.forEach(function (candi) {
          if(Number(candi[key])){

            if(Number(candi[key]) <= 10000) {
              income[0].total++;
            }
            else if(Number(candi[key]) > 10000 && Number(candi[key]) <= 50000) {
              income[1].total++;
            }
            else if(Number(candi[key]) > 50000 && Number(candi[key]) <= 100000) {
              income[2].total++;
            }
            else if(Number(candi[key]) > 100000 && Number(candi[key]) <= 500000) {
              income[3].total++;
            }
            else if(Number(candi[key]) > 500000 && Number(candi[key]) <= 1000000) {
              income[4].total++;
            }
            else if(Number(candi[key]) > 1000000 && Number(candi[key]) <= 5000000) {
              income[5].total++;
            }
            else if(Number(candi[key]) > 5000000 && Number(candi[key]) <= 10000000) {
              income[6].total++;
            }
            else if(Number(candi[key]) > 10000000 && Number(candi[key]) <= 50000000) {
              income[7].total++;
            }
            else if(Number(candi[key]) > 50000000) {
              income[8].total++;
            }
          }else{
            income[9].total++;
          }
        });

        var c3data = [];
        for (var i = 0; i < income.length; i++) {
          c3data[i] = [];

          c3data[i].push(income[i].title);
          c3data[i].push(income[i].total);
        }
        return {table:income, c3data:c3data};
      }
    }]);

})();
