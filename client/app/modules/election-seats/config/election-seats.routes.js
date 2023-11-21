(function () {
  'use strict';
  angular
    .module('com.module.electionSeats')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.electionSeats', {
          abstract: true,
          url: '/electionSeats',
          templateUrl: 'modules/election-seats/views/main.html'
        })
        .state('app.electionSeats.list', {
          url: '',
          templateUrl: 'modules/election-seats/views/list.html',
          controllerAs: 'ctrl',
          controller: function ($scope,currentElections,divisions,ElectionSeatsService,SeatsServiceForES) {

            $scope.electionSeats=[];
            this.formFields = ElectionSeatsService.getFormFilter(currentElections,divisions);
            this.formOptions = {};
            this.submit = function () {
              //console.log(this.electionSeat);
              ElectionSeatsService.getElectionSeatsWhere(this.electionSeat).then(function (electionSeats) {
                //console.log(electionSeats);
                $scope.electionSeats = electionSeats;
              });
            };

            this.submit2 = function () {
              //console.log(this.electionSeat);
              SeatsServiceForES.getSeatsWhere(this.electionSeat).then(function (electionSeats) {
                //console.log(electionSeats);
                $scope.seats = electionSeats;
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


            //sdf
            this.addThisSeatToCurrentElection = function(seat,electionSeat){
              //console.log(seatId);
              SeatsServiceForES.getSeat(seat.id).then(function(seat1){
                seat1.seatId = seat.id;
                seat1.currentElectionId = electionSeat.currentElectionId;
                delete seat1.id;

                //console.log(seat);
                //console.log(electionSeat);
                //console.log(seat1);

                ElectionSeatsService.upsertElectionSeat(seat1).then(function (electionSeat) {
                  //$state.go('^.list');
                  //console.log(electionSeat);
                });

              })
            }



          },
          resolve: {
            currentElections: [
              'CurrentElectionsServiceForES',
              function (CurrentElectionsServiceForES) {
                return CurrentElectionsServiceForES.getCurrentElections();
              }
            ],
            divisions: function (DivisionsServiceForSeats) {
              return DivisionsServiceForSeats.getDivisions();
            }
          }
        })
        //.state('app.electionSeats.add', {
        //  url: '/add/:currentElectionId',
        //  templateUrl: 'modules/election-seats/views/form.html',
        //  controllerAs: 'ctrl',
        //  controller: function ($state, ElectionSeatsService, currentElections, divisions, electionSeat) {
        //    //this.elections = elections;
        //    this.electionSeat = electionSeat;
        //    this.formFields = ElectionSeatsService.getFormFields(currentElections,divisions,electionSeat);
        //    this.formOptions = {};
        //    this.submit = function () {
        //      ElectionSeatsService.upsertElectionSeat(this.electionSeat).then(function () {
        //        $state.go('^.list');
        //      });
        //    };
        //  },
        //  resolve: {
        //    currentElections: function (CurrentElectionsServiceForES) {
        //      return CurrentElectionsServiceForES.getCurrentElections();
        //    },
        //    divisions: function (DivisionsServiceForES) {
        //      return DivisionsServiceForES.getDivisions();
        //    },
        //    electionSeat: function ($stateParams) {
        //      return {
        //        currentElectionId: $stateParams.currentElectionId
        //      };
        //    }
        //  }
        //})
        .state('app.electionSeats.edit', {
          url: '/:electionSeatId/edit',
          templateUrl: 'modules/election-seats/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionSeatsService, currentElections, divisions, electionSeat) {
            this.currentElections = currentElections;
            this.electionSeat = electionSeat;
            // console.log(electionSeat);
            this.formFields = ElectionSeatsService.getFormFields(currentElections,divisions,electionSeat);
            this.formOptions = {};
            this.submit = function () {
              ElectionSeatsService.upsertElectionSeat(this.electionSeat).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            currentElections: function (CurrentElectionsServiceForES) {
              return CurrentElectionsServiceForES.getCurrentElections();
            },
            divisions: function (DivisionsServiceForSeats) {
              return DivisionsServiceForSeats.getDivisions();
            },
            electionSeat: function ($stateParams, ElectionSeatsService) {
              return ElectionSeatsService.getElectionSeat($stateParams.electionSeatId);
            }
          }
        })
        .state('app.electionSeats.view', {
          url: '/:electionSeatId',
          templateUrl: 'modules/election-seats/views/view.html',
          controllerAs: 'ctrl',
          controller: function (electionSeat) {
            this.electionSeat = electionSeat;
            // console.log(electionSeat);
          },
          resolve: {
            electionSeat: function ($stateParams, ElectionSeatsService) {
              return ElectionSeatsService.getElectionSeat($stateParams.electionSeatId);
            }
          }
        })

        .state('app.electionSeats.delete', {
          url: '/:electionSeatId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionSeatsService, electionSeat) {
            ElectionSeatsService.deleteElectionSeat(electionSeat.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            electionSeat: function ($stateParams, ElectionSeatsService) {
              return ElectionSeatsService.getElectionSeat($stateParams.electionSeatId);
            }
          }
        });
    });

})();
