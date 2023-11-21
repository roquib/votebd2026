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
    .controller('ElectionResultFormEntryStatisticsCtrl', function ($scope, elections, currentElections, divisions, electionSeat, ElectionResultService) {
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
      $scope.$on('handleBroadcast', function (event, args) {
        // console.log("in child cases");
        $scope.loadChartData();
      });

    });

})();
