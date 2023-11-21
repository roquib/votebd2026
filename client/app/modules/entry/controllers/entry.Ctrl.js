(function () {
  'use strict';
  angular
    .module('com.module.entry')
    .controller('EntryCrtl', ["$scope",'EntryService','CandidatesServiceForEntry','elections','currentElections','divisions','electionSeat','ElectionResultService', function ($scope, EntryService,CandidatesServiceForEntry,elections,currentElections,divisions,electionSeat,ElectionResultService) {


      $scope.electionSeat = electionSeat;
      this.formFields = CandidatesServiceForEntry.getFormFilter(elections,currentElections, divisions, electionSeat);
      this.formOptions = {};








      $scope.piDonation = {};
      $scope.sum = function(value){
        var total = {
          statusAF: 0,
          statusFSEE: 0,
          statusEER: 0,
          statusTR: 0,
          statusALIE: 0
        };
        for (var i = 0; i < value.length; i++) {
          if(value[i].statusAF == "publish" || value[i].statusAF == "true" || value[i].statusAF){
            total.statusAF++;

          }if(value[i].statusFSEE == 'true' || value[i].statusFSEE){
            total.statusFSEE++;

          }if(value[i].statusEER == 'true' || value[i].statusEER){
            total.statusEER++;

          }if(value[i].statusTR=='true' || value[i].statusTR){
            total.statusTR++;

          }if(value[i].statusALIE == 'true' || value[i].statusALIE){
            total.statusALIE++;

          }

        }
        return total;
      };
      $scope.grandSum = {};
      $scope.loadChartData = function () {
        ElectionResultService.getCandidateFormEntryStatistics($scope.electionSeat, $scope.piDonation.limit, 'EstimatedAnnualExpendituresOfTheSameCandidateCrtl').then(function (ppdata) {

          //$scope.grandSum = $scope.sum(ppdata.data);

          $scope.entryList = ppdata.data;
          //console.log(ppdata.data);

        });
      };$scope.objSum = function (array, field) {
        return array.objSum(field);
      };

    }]);

})();
