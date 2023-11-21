(function () {
  'use strict';
  angular
    .module('com.module.constituencies')
    .config(function ($stateProvider) {
      $stateProvider
        .state('front.constituencies', {
          url: '/constituencies',
          templateUrl: 'modules/constituencies/views/main.html'
        })
        .state('front.constituencies.candidates', {
          url: '/:electionSeatId',
          templateUrl: 'modules/constituencies/views/electionSeat.html',
          controllerAs: 'ctrl',
          controller: function(electionSeat){
            this.electionSeat=electionSeat;
          },
          resolve:{
            electionSeat: function ($stateParams, electionSeatcandidateServiceForES) {
              return electionSeatcandidateServiceForES.getElectionSeatCandidate($stateParams.electionSeatId);
            },
            politicalParty:
              function ($rootScope, $stateParams, electionSeatcandidateServiceForES) {
                return electionSeatcandidateServiceForES.getElectionSeatCandidate($stateParams.electionSeatId);
              }
          }
        })

        .state('front.constituencies.electionSeat', {
          url: '/:electionId/:electionSeatName',
          templateUrl: 'modules/constituencies/views/electionSeat.html',
          controllerAs: 'ctrl',
          controller: function(electionSeat){
            this.electionSeat=electionSeat;
          },
          resolve:{
            electionSeat: function ($rootScope, $stateParams, electionSeatcandidateServiceForES) {

              return electionSeatcandidateServiceForES.getElectionSeatId($stateParams.electionId, $stateParams.electionSeatName).then( function(data){
                $rootScope.id = data.id;
                return electionSeatcandidateServiceForES.getElectionSeatCandidate($rootScope.id).then( function (seat) {
                  return seat;
                  // console.log(seat);
                });
              });
            },

            politicalParty:
              function ($rootScope, $stateParams, electionSeatcandidateServiceForES) {
                return electionSeatcandidateServiceForES.getElectionSeatId($stateParams.electionId, $stateParams.electionSeatName).then( function(data){
                  $rootScope.id = data.id;
                  return electionSeatcandidateServiceForES.getElectionSeatCandidate($rootScope.id);
                });
              }
          }
        })
    });

})();
