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
    .module('com.module.fCandidateComparison')
    .controller('YearWiseDetailsComparisonCrtl', ["$scope", "$stateParams", "ElectionAnalysisService", function ($scope, $stateParams, ElectionAnalysisService) {

      $scope.income = {
        flag : false,
        text: "See more +"
        };$scope.asset = {
        flag : false,
        text: "See more +"
        };
      $scope.incomeDetails = {};
      $scope.assetMaterialDetails = {};
      $scope.assetImmaterialDetails = {};
      ElectionAnalysisService.getSingleCandidateReportYearWise($stateParams, 0, 'EstimatedAnnualIncomeOfTheSameCandidateCrtl').then(function (report) {
        $scope.reportData = report.data;
        //console.log($scope.reportData);
      });

      $scope.showHideIncome = function () {
        $scope.income.flag = !$scope.income.flag;
        if($scope.income.flag){
          $scope.income.text = "See less -";
        }else{
          $scope.income.text = "See more +";
        }
      };
      $scope.showHideAsset = function () {
        $scope.asset.flag = !$scope.asset.flag;
        if($scope.asset.flag){
          $scope.asset.text = "See less -";
        }else{
          $scope.asset.text = "See more +";
        }
      };
      $scope.oneAtATime = true;
      $scope.status = [];
      for (var i = -0; i < 30; i++) {
        $scope.status[i] = {
          isFirstOpen: true,
          isFirstDisabled: false
        };
      }

    }]);
})();
