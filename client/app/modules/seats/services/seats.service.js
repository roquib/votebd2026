(function () {
  'use strict';
  angular
    .module('com.module.seats')
    .service('SeatsService', function (CoreService, Seat, gettextCatalog) {

      this.getSeats = function () {
        return Seat.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getSeatsWhere = function (seatCriteria) {
        var whereCriteria={};

        if(seatCriteria.hasOwnProperty("electionId") && seatCriteria.electionId)
          whereCriteria.electionId = seatCriteria.electionId;

        if(seatCriteria.hasOwnProperty("divisionId") && seatCriteria.divisionId)
          whereCriteria.divisionId = seatCriteria.divisionId;

        if(seatCriteria.hasOwnProperty("districtId") && seatCriteria.districtId)
          whereCriteria.districtId = seatCriteria.districtId;

        if(seatCriteria.hasOwnProperty("upazillaId") && seatCriteria.upazillaId)
          whereCriteria.upazillaId = seatCriteria.upazillaId;

        if(seatCriteria.hasOwnProperty("unionId") && seatCriteria.unionId)
          whereCriteria.unionId = seatCriteria.unionId;

        return Seat.find({
          filter: {
            order: 'created DESC',
            where:whereCriteria,
            include:["election","division","district","upazilla","union"]
          }
        }).$promise;
      };

      this.getSeat = function (id) {
        return Seat.findById({
          id: id,
          filter:{
            include:["division","district","upazilla","union"]
          }
        }).$promise;
      };

      this.upsertSeat = function (seat) {
        return Seat.upsert(seat).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('seat saved'),
              gettextCatalog.getString('Your seat is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving seat '),
              gettextCatalog.getString('This seat could no be saved: ') + err
            );
          }
        );
      };

      this.deleteSeat = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Seat.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('seat deleted'),
                gettextCatalog.getString('Your seat is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting seat'),
                gettextCatalog.getString('Your seat is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function (elections,divisions,seat) {
        var electionOptions = elections.map(function (election) {
          return {
            name: election.nameBn,
            value: election.id
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
            key: 'electionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Election'),
              required: true,
              options: electionOptions
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
            controller: function($scope,DistrictsServiceForSeats) {

              //console.log(seat);
              //set initially
              if(seat && seat.hasOwnProperty("divisionId") && seat.divisionId){
                DistrictsServiceForSeats.getDistrictsByDivision(seat.divisionId).then(function(districts){
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
            key: 'upazillaId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Upazilla'),
              options: []
            },
            controller: function($scope,UpazillasServiceForSeats) {

              //set initially
              if(seat && seat.hasOwnProperty("districtId") && seat.districtId){
                UpazillasServiceForSeats.getUpazillasByDistrict(seat.districtId).then(function(upazillas){
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
            key: 'unionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Union'),
              options: []
            },
            controller: function($scope,UnionsServiceForSeats) {

              //set initially
              if(seat && seat.hasOwnProperty("upazillaId") && seat.upazillaId){
                UnionsServiceForSeats.getUnionsByUpazilla(seat.upazillaId).then(function(unions){
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
      this.getFormFilter = function (elections,divisions,seat) {
        var electionOptions = elections.map(function (election) {
          return {
            name: election.nameBn,
            value: election.id
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
            {
              className: 'col-xs-3',
              key: 'electionId',
              type: 'select',
              templateOptions: {
                label: gettextCatalog.getString('Election'),
                required: true,
                options: electionOptions
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
                if(seat && seat.hasOwnProperty("divisionId") && seat.divisionId){
                  DistrictsServiceForSeats.getDistrictsByDivision(seat.divisionId).then(function(districts){
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
                if(seat && seat.hasOwnProperty("districtId") && seat.districtId){
                  UpazillasServiceForSeats.getUpazillasByDistrict(seat.districtId).then(function(upazillas){
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
                if(seat && seat.hasOwnProperty("upazillaId") && seat.upazillaId){
                  UnionsServiceForSeats.getUnionsByUpazilla(seat.upazillaId).then(function(unions){
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
    })
  ;

})();
