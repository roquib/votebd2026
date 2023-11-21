(function () {
  'use strict';
  angular
    .module('com.module.electionSeats')
    .service('ElectionSeatsService', function (CoreService, ElectionSeat, Seat, CurrentElection, gettextCatalog, $filter) {

      this.getElectionSeats = function () {
        return ElectionSeat.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getElectionSeatsWhere = function (electionSeatCriteria) {
        var whereCriteria={};

        if(electionSeatCriteria.hasOwnProperty("currentElectionId") && electionSeatCriteria.currentElectionId)
          whereCriteria.currentElectionId = electionSeatCriteria.currentElectionId;

        if(electionSeatCriteria.hasOwnProperty("divisionId") && electionSeatCriteria.divisionId)
          whereCriteria.divisionId = electionSeatCriteria.divisionId;

        if(electionSeatCriteria.hasOwnProperty("districtId") && electionSeatCriteria.districtId)
          whereCriteria.districtId = electionSeatCriteria.districtId;

        if(electionSeatCriteria.hasOwnProperty("upazillaId") && electionSeatCriteria.upazillaId)
          whereCriteria.upazillaId = electionSeatCriteria.upazillaId;

        if(electionSeatCriteria.hasOwnProperty("unionId") && electionSeatCriteria.unionId)
          whereCriteria.unionId = electionSeatCriteria.unionId;

        //console.log(whereCriteria);

        return ElectionSeat.find({
          filter: {
            order: 'created DESC',
            where:whereCriteria,
            include:["currentElection","division","district","upazilla","union"]
          }
        }).$promise;
      };

      this.getElectionSeat = function (id) {
        return ElectionSeat.findById({
          id: id
        }).$promise;
      };

      this.upsertElectionSeat = function (electionSeat) {
        return ElectionSeat.upsert(electionSeat).$promise
          .then(function (electionSeat) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Election Seat saved'),
              gettextCatalog.getString('Your Election Seat is safe with us!')
            );
            return electionSeat;
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Election Seat '),
              gettextCatalog.getString('This Election Seat could no be saved: ') + err
            );
          }
        );
      };

      this.deleteElectionSeat = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            ElectionSeat.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Election Seat deleted'),
                gettextCatalog.getString('Your Election Seat is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Election Seat'),
                gettextCatalog.getString('Your Election Seat is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function (currentElections, divisions, electionSeat) {
        var currentElectionOptions = currentElections.map(function (currentElection) {
          return {
            name: $filter('date')(currentElection.electionDate, "dd/MM/yyyy") +" - "+ currentElection.election.nameBn +" - "+ currentElection.currentElectionNameBn,
            value: currentElection.id
          };
        });
        var divisionOptions = divisions.map(function (division) {
          return {
            name: division.nameBn,
            value: division.id
          };
        });
        return [
          {
            key: 'seatNameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Seat Name (English)'),
              required: true
            }
          },
          {
            key: 'seatNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Seat Name (Bangla)'),
              required: true
            }
          },
          {
            key: 'currentElectionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Current Election'),
              required: true,
              options: currentElectionOptions
            }
          },
          {
            key: 'divisionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Division'),
              options: divisionOptions
            }
          },
          {
            key: 'districtId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('District'),
              options: []
            },
            controller: function($scope,DistrictsServiceForES) {

              //set initially
              if(electionSeat && electionSeat.hasOwnProperty("divisionId") && electionSeat.divisionId){
                DistrictsServiceForES.getDistrictsByDivision(electionSeat.divisionId).then(function(districts){
                  //console.log(districts);
                  $scope.to.options = districts.map(function (district) {
                    return {
                      name:  district.nameBn + " - " +district.nameEn,
                      value: district.id
                    };
                  });
                });
              }

              //when current election change then
              $scope.$watch('model.divisionId', function (newValue, oldValue, theScope) {
                if(newValue !== oldValue) {
                  if($scope.model[$scope.options.key] && oldValue) {
                    // reset this select
                    $scope.model[$scope.options.key] = '';
                  }
                  DistrictsServiceForES.getDistrictsByDivision(newValue).then(function(districts){
                    //console.log(districts);
                    $scope.to.options = districts.map(function (district) {
                      return {
                        name:  district.nameBn + " - " +district.nameEn,
                        value: district.id
                      };
                    });
                  });
                }
              });

            }
          },
          {
            key: 'upazillaId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Upazilla/City Corporation/Municipality'),
              options: []
            },
            controller: function($scope,UpazillasServiceForES) {

              //set initially
              if(electionSeat && electionSeat.hasOwnProperty("districtId") && electionSeat.districtId){
                UpazillasServiceForES.getUpazillasByDistrict(electionSeat.districtId).then(function(upazillas){
                  //console.log(upazillas);
                  $scope.to.options = upazillas.map(function (upazilla) {
                    return {
                      name:  upazilla.nameBn + " - " +upazilla.nameEn,
                      value: upazilla.id
                    };
                  });
                });
              }

              //when current election change then
              $scope.$watch('model.districtId', function (newValue, oldValue, theScope) {
                if(newValue !== oldValue) {
                  if($scope.model[$scope.options.key] && oldValue) {
                    // reset this select
                    $scope.model[$scope.options.key] = '';
                  }
                  UpazillasServiceForES.getUpazillasByDistrict(newValue).then(function(upazillas){
                    //console.log(upazillas);
                    $scope.to.options = upazillas.map(function (upazilla) {
                      return {
                        name:  upazilla.nameBn + " - " +upazilla.nameEn,
                        value: upazilla.id
                      };
                    });
                  });
                }
              });
            }
          },
          {
            key: 'unionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Union/Municipality'),
              options: []
            },
            controller: function($scope,UnionsServiceForES) {

              //set initially
              if(electionSeat && electionSeat.hasOwnProperty("upazillaId") && electionSeat.upazillaId){
                UnionsServiceForES.getUnionsByUpazilla(electionSeat.upazillaId).then(function(unions){
                  //console.log(unions);
                  $scope.to.options = unions.map(function (union) {
                    return {
                      name:  union.nameBn + " - " +union.nameEn,
                      value: union.id
                    };
                  });
                });
              }

              //when current election change then
              $scope.$watch('model.upazillaId', function (newValue, oldValue, theScope) {
                if(newValue !== oldValue) {
                  if($scope.model[$scope.options.key] && oldValue) {
                    // reset this select
                    $scope.model[$scope.options.key] = '';
                  }
                  UnionsServiceForES.getUnionsByUpazilla(newValue).then(function(unions){
                    //console.log(unions);
                    $scope.to.options = unions.map(function (union) {
                      return {
                        name:  union.nameBn + " - " +union.nameEn,
                        value: union.id
                      };
                    });
                  });
                }
              });

            }
          },
          {
            key: 'seatId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Seat'),
              options: []
            },
            controller: function($scope,SeatsServiceForES) {

              console.log(electionSeat);
              //console.log($scope);

              //set initially
              SeatsServiceForES.getSeatsWhere(electionSeat).then(function(seats){
                //console.log(seats)
                $scope.to.options = seats.map(function (seat) {
                  var nameStr ="";
                  if(seat.hasOwnProperty("division") && seat.division.hasOwnProperty("nameBn") && seat.division.nameBn)
                    nameStr += "(" + seat.division.nameBn + ")";
                  if(seat.hasOwnProperty("district") && seat.district.hasOwnProperty("nameBn") && seat.district.nameBn)
                    nameStr += "(" + seat.district.nameBn + ")";
                  if(seat.hasOwnProperty("upazilla") && seat.upazilla.hasOwnProperty("nameBn") && seat.upazilla.nameBn)
                    nameStr += "(" + seat.upazilla.nameBn + ")";
                  if(seat.hasOwnProperty("union") && seat.union.hasOwnProperty("nameBn") && seat.union.nameBn)
                    nameStr += "(" + seat.union.nameBn + ")";
                  return {
                    name:  seat.seatNameBn + " " + nameStr,
                    value: seat.id
                  };
                });
              })

              //when current election change then
              $scope.$watchCollection('[model.districtId,model.upazillaId,model.unionId]', function (newValues, oldValues) {
              //$scope.$watch('model.districtId', function (newValue, oldValue, theScope) {
              //  if(newValue !== oldValue) {
              //    if($scope.model[$scope.options.key] && oldValue) {
              //       reset this select
              //      $scope.model[$scope.options.key] = '';
                  //}
              //console.log($scope.model);
                  SeatsServiceForES.getSeatsWhere($scope.model).then(function(seats){
                    //console.log(seats)
                    $scope.to.options = seats.map(function (seat) {
                      var nameStr ="";
                      if(seat.hasOwnProperty("division") && seat.division.hasOwnProperty("nameBn") && seat.division.nameBn)
                        nameStr += "(" + seat.division.nameBn + ")";
                      if(seat.hasOwnProperty("district") && seat.district.hasOwnProperty("nameBn") && seat.district.nameBn)
                        nameStr += "(" + seat.district.nameBn + ")";
                      if(seat.hasOwnProperty("upazilla") && seat.upazilla.hasOwnProperty("nameBn") && seat.upazilla.nameBn)
                        nameStr += "(" + seat.upazilla.nameBn + ")";
                      if(seat.hasOwnProperty("union") && seat.union.hasOwnProperty("nameBn") && seat.union.nameBn)
                        nameStr += "(" + seat.union.nameBn + ")";
                      return {
                        name:  seat.seatNameBn + " " + nameStr,
                        value: seat.id
                      };
                    });
                  })
                //}
              });


              ////when current election change then
              //$scope.$watch('model.districtId', function (newValue, oldValue, theScope) {
              //  if(newValue !== oldValue) {
              //    if($scope.model[$scope.options.key] && oldValue) {
              //      // reset this select
              //      $scope.model[$scope.options.key] = '';
              //    }
              //console.log($scope.model);
              //    SeatsServiceForES.getSeatsWhere($scope.model).then(function(seats){
              //      console.log(seats)
              //      $scope.to.options = seats.map(function (seat) {
              //        var nameStr ="";
              //        if(seat.hasOwnProperty("division") && seat.division.hasOwnProperty("nameBn") && seat.division.nameBn)
              //          nameStr += "(" + seat.division.nameBn + ")";
              //        if(seat.hasOwnProperty("district") && seat.district.hasOwnProperty("nameBn") && seat.district.nameBn)
              //          nameStr += "(" + seat.district.nameBn + ")";
              //        if(seat.hasOwnProperty("upazilla") && seat.upazilla.hasOwnProperty("nameBn") && seat.upazilla.nameBn)
              //          nameStr += "(" + seat.upazilla.nameBn + ")";
              //        if(seat.hasOwnProperty("union") && seat.union.hasOwnProperty("nameBn") && seat.union.nameBn)
              //          nameStr += "(" + seat.union.nameBn + ")";
              //        return {
              //          name:  seat.seatNameBn + " " + nameStr,
              //          value: seat.id
              //        };
              //      });
              //    })
              //  }
              //});
              //
              //


            }
          },
          {
            key: 'seatNumberBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Seat Number (Bangla)')
            }
          },
          {
            key: 'enlistedAreaBn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Enlisted Area (Bn)')
            }
          },
          {
            key: 'seatInfoBn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Seat Info (Bangla)')
            }
          },
          {
            key: 'totalPeople',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Total People')
            }
          },
          {
            key: 'totalVoterMale',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Total Voter (Male)')
            }
          },
          {
            key: 'totalVoterFemale',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Total Voter (Female)')
            }
          },
          {
            key: 'totalCastingVote',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Total Casting Vote')
            }
          },
          {
            key: 'geolat',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Geo Location (Latitude:Longitude)')
            }
          },
          {
            key: 'geoLng',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Geo Location (Latitude:Longitude)')
            }
          },
        ];
      };

      this.getFormFilter = function (currentElections,divisions,electionSeat) {
        var currentElectionOptions = currentElections.map(function (currentElection) {
          return {
            name: $filter('date')(currentElection.electionDate, "dd/MM/yyyy") +" - "+ currentElection.election.nameBn +" - "+ currentElection.currentElectionNameBn,
            value: currentElection.id
          };
        });
        var divisionOptions = divisions.map(function (division) {
          return {
            name: division.nameBn,
            value: division.id
          };
        });
        //var districtOptions = districts.map(function (district) {
        //  return {
        //    name: district.nameBn,
        //    value: district.id
        //  };
        //});
        //var upazillaOptions = upazillas.map(function (upazilla) {
        //  return {
        //    name: upazilla.nameBn,
        //    value: upazilla.id
        //  };
        //});
        //var unionOptions = unions.map(function (union) {
        //  return {
        //    name: union.nameBn,
        //    value: union.id
        //  };
        //});
        return [{
          className : 'row',
          fieldGroup : [
            //{
            //  className: 'col-xs-3',
            //  key: 'electionId',
            //  type: 'input',
            //  templateOptions: {
            //    label: gettextCatalog.getString('Election'),
            //    required: true
            //  },
            //  //hideExpression : "true",
            //
            //},
            {
              className: 'col-xs-3',
              key: 'currentElectionId',
              type: 'select',
              templateOptions: {
                label: gettextCatalog.getString('Current Election'),
                required: true,
                options: currentElectionOptions
              },
              controller: function($scope,CurrentElectionsServiceForES){
              //when current election change then
              $scope.$watch('model.currentElectionId', function (newValue, oldValue, theScope) {
                if(newValue !== oldValue) {
                  CurrentElectionsServiceForES.getCurrentElection(newValue).then(function(currentElection){
                    //console.log(currentElection);
                    $scope.model.electionId = currentElection.election.id;
                    //console.log($scope);
                  });
                }
              });
            }
            },
            {
              className: 'col-xs-3',
              key: 'divisionId',
              type: 'select',
              templateOptions: {
                label: gettextCatalog.getString('Division'),
                required: true,
                options: divisionOptions
              }
            },
            {
              className: 'col-xs-3',
              key: 'districtId',
              type: 'select',
              templateOptions: {
                label: gettextCatalog.getString('District'),
                required: true,
                options: []
              },
              controller: function($scope,DistrictsServiceForSeats) {

                //set initially
                if(electionSeat && electionSeat.hasOwnProperty("divisionId") && electionSeat.divisionId){
                  DistrictsServiceForSeats.getDistrictsByDivision(electionSeat.divisionId).then(function(districts){
                    //console.log(districts);
                    $scope.to.options = districts.map(function (district) {
                      return {
                        name:  district.nameBn + " - " +district.nameEn,
                        value: district.id
                      };
                    });
                  });
                }

                //when current election change then
                $scope.$watch('model.divisionId', function (newValue, oldValue, theScope) {
                  if(newValue !== oldValue) {
                    if($scope.model[$scope.options.key] && oldValue) {
                      // reset this select
                      $scope.model[$scope.options.key] = '';
                    }
                    DistrictsServiceForSeats.getDistrictsByDivision(newValue).then(function(districts){
                      //console.log(districts);
                      $scope.to.options = districts.map(function (district) {
                        return {
                          name:  district.nameBn + " - " +district.nameEn,
                          value: district.id
                        };
                      });
                    });
                  }
                });

              }
            },
            {
              className: 'col-xs-3',
              key: 'upazillaId',
              type: 'select',
              templateOptions: {
                label: gettextCatalog.getString('Upazilla/City Corporation/Municipality'),
                options: []
              },
              controller: function($scope,UpazillasServiceForSeats) {

                //set initially
                if(electionSeat && electionSeat.hasOwnProperty("districtId") && electionSeat.districtId){
                  UpazillasServiceForSeats.getUpazillasByDistrict(electionSeat.districtId).then(function(upazillas){
                    //console.log(upazillas);
                    $scope.to.options = upazillas.map(function (upazilla) {
                      return {
                        name:  upazilla.nameBn + " - " +upazilla.nameEn + " ("+ upazilla.regionType+")",
                        value: upazilla.id
                      };
                    });
                  });
                }

                //when current election change then
                $scope.$watch('model.districtId', function (newValue, oldValue, theScope) {
                  if(newValue !== oldValue) {
                    if($scope.model[$scope.options.key] && oldValue) {
                      // reset this select
                      $scope.model[$scope.options.key] = '';
                    }
                    UpazillasServiceForSeats.getUpazillasByDistrict(newValue).then(function(upazillas){
                      //console.log(upazillas);
                      $scope.to.options = upazillas.map(function (upazilla) {
                        return {
                          name:  upazilla.nameBn + " - " +upazilla.nameEn + " ("+ upazilla.regionType+")",
                          value: upazilla.id
                        };
                      });
                    });
                  }
                });
              }
            },
            {
              className: 'col-xs-3',
              key: 'unionId',
              type: 'select',
              templateOptions: {
                label: gettextCatalog.getString('Union/Municipality'),
                options: []
              },
              controller: function($scope,UnionsServiceForSeats) {

                //set initially
                if(electionSeat && electionSeat.hasOwnProperty("upazillaId") && electionSeat.upazillaId){
                  UnionsServiceForSeats.getUnionsByUpazilla(electionSeat.upazillaId).then(function(unions){
                    //console.log(unions);
                    $scope.to.options = unions.map(function (union) {
                      return {
                        name:  union.nameBn + " - " +union.nameEn + " ("+ union.regionType+")",
                        value: union.id
                      };
                    });
                  });
                }

                //when current election change then
                $scope.$watch('model.upazillaId', function (newValue, oldValue, theScope) {
                  if(newValue !== oldValue) {
                    if($scope.model[$scope.options.key] && oldValue) {
                      // reset this select
                      $scope.model[$scope.options.key] = '';
                    }
                    UnionsServiceForSeats.getUnionsByUpazilla(newValue).then(function(unions){
                      //console.log(unions);
                      $scope.to.options = unions.map(function (union) {
                        return {
                          name:  union.nameBn + " - " +union.nameEn + " ("+ union.regionType+")",
                          value: union.id
                        };
                      });
                    });
                  }
                });

              }
            },
          ]
        }
        ] ;
      };
    });

})();
