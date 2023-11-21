(function () {
  'use strict';
  angular
    .module('com.module.seats')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.seats', {
          abstract: true,
          url: '/seats',
          templateUrl: 'modules/seats/views/main.html'
        })
        .state('app.seats.list', {
          url: '',
          templateUrl: 'modules/seats/views/list.html',
          controllerAs: 'ctrl',
          controller: function ($scope,elections,divisions,SeatsService) {

            $scope.seats=[];
            this.formFields = SeatsService.getFormFilter(elections,divisions);
            this.formOptions = {};
            this.submit = function () {
              //console.log(this.seat);
              SeatsService.getSeatsWhere(this.seat).then(function (seats) {
                //console.log(seats);
                $scope.seats = seats;
              });
            };

            //this.elections = elections;

            this.currentPage = 1;
            this.pageSize = 10;
            this.pageChangeHandler = function(num) {
              // console.log('page changed to ' + num);
            };
          },
          resolve: {
            //elections: [
            //  'ElectionsServiceForSeats',
            //  function (ElectionsServiceForSeats) {
            //    return ElectionsServiceForSeats.getElections();
            //  }
            //],
            elections: function (ElectionsServiceForSeats) {
              return ElectionsServiceForSeats.getElections();
            },
            divisions: function (DivisionsServiceForSeats) {
              return DivisionsServiceForSeats.getDivisions();
            }
          }
        })
        .state('app.seats.add', {
          url: '/add/:electionId/:divisionId/:districtId/:upazillaId/:unionId',
          templateUrl: 'modules/seats/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, SeatsService, elections, divisions, seat) {
            this.elections = elections;
            this.seat = seat;
            this.formFields = SeatsService.getFormFields(elections,divisions,seat);
            this.formOptions = {};
            this.submit = function () {
              SeatsService.upsertSeat(this.seat).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            elections: function (ElectionsServiceForSeats) {
              return ElectionsServiceForSeats.getElections();
            },
            divisions: function (DivisionsServiceForSeats) {
              return DivisionsServiceForSeats.getDivisions();
            },
            //districts: function (DistrictsServiceForSeats) {
            //  return DistrictsServiceForSeats.getDistricts();
            //},
            //upazillas: function (UpazillasServiceForSeats) {
            //  return UpazillasServiceForSeats.getUpazillas();
            //},
            //unions: function (UnionsServiceForSeats) {
            //  return UnionsServiceForSeats.getUnions();
            //},
            seat: function ($stateParams) {
              // console.log($stateParams);
              return $stateParams;
            }
          }
        })
        .state('app.seats.edit', {
          url: '/:seatId/edit',
          templateUrl: 'modules/seats/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, SeatsService, elections, divisions, seat) {
            this.elections = elections;
            this.seat = seat;
            this.formFields = SeatsService.getFormFields(elections,divisions,seat);
            this.formOptions = {};
            this.submit = function () {
              SeatsService.upsertSeat(this.seat).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            elections: function (ElectionsServiceForSeats) {
              return ElectionsServiceForSeats.getElections();
            },
            divisions: function (DivisionsServiceForSeats) {
              return DivisionsServiceForSeats.getDivisions();
            },
            seat: function ($stateParams, SeatsService) {
              return SeatsService.getSeat($stateParams.seatId);
            }
          }
        })
        .state('app.seats.view', {
          url: '/:seatId',
          templateUrl: 'modules/seats/views/view.html',
          controllerAs: 'ctrl',
          controller: function (seat) {
            this.seat = seat;
            // console.log(seat);
          },
          resolve: {
            seat: function ($stateParams, SeatsService) {
              return SeatsService.getSeat($stateParams.seatId);
            }
          }
        })
        .state('app.seats.delete', {
          url: '/:seatId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, SeatsService, seat) {
            SeatsService.deleteSeat(seat.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            seat: function ($stateParams, SeatsService) {
              return SeatsService.getSeat($stateParams.seatId);
            }
          }
        });
    });

})();
