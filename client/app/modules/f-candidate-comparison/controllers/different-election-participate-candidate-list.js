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
      .controller('DifferentElectionParticipateCandidateCtrl', ["$scope", "$stateParams", "CandidateComparisonService", function ($scope, $stateParams, CandidateComparisonService) {

        $scope.$parent.AffidavitBasedComparision="Affidavit Based Comparision - Asset comparison of own, dependent"
        $scope.candidateList=[];
            CandidateComparisonService.differentElectionParticipateCandidate().then(function (candidates) {
              console.log(candidates);
            $scope.candidateList =candidates.data
          });

      }]);

  })();
