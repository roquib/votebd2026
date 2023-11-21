(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:ElectionResultCtrl
   * @description Candidate Search controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.fCandidateAnalysis')
    .controller('ElectionResultCtrl', function($scope) {
      $scope.$parent.candidateAnalysisSubTitle="Affidavit Based Analysis - election";
    });

})();
