(function () {
  'use strict';
  angular
    .module('com.module.fCandidateSearch')
    .service('CandidateSearchService', function (CoreService, Candidate, $filter, gettextCatalog) {
      this.verifyFilterData = function (criteria) {
        var whereCriteria = {};
        if (criteria.hasOwnProperty("currentElectionId") && criteria.currentElectionId) {
          whereCriteria.currentElectionId = criteria.currentElectionId;
        } else {
          return false;
        }

        if (criteria.hasOwnProperty("politicalPartyId") && criteria.politicalPartyId) {
          if (criteria.politicalPartyId !== '-1') {
            whereCriteria.politicalPartyId = criteria.politicalPartyId;
          }

        } else {
          //return false;
        }

        if (criteria.hasOwnProperty("divisionId") && criteria.divisionId) {
          if (criteria.divisionId !== '-1') {
            whereCriteria.divisionId = criteria.divisionId;
          }
        } else {

        }

        if (criteria.hasOwnProperty("districtId") && criteria.districtId) {
          if (criteria.districtId !== '-1') {
            whereCriteria.districtId = criteria.districtId;
          }
        } else {

        }
        if (criteria.hasOwnProperty("upazillaId") && criteria.upazillaId) {
          if (criteria.upazillaId !== '-1') {
            whereCriteria.upazillaId = criteria.upazillaId;
          }
        } else {

        }
        if (criteria.hasOwnProperty("unionId") && criteria.unionId) {
          if (criteria.unionId !== '-1') {
            whereCriteria.unionId = criteria.unionId;
          }
        } else {

        }
        if (criteria.hasOwnProperty("electionSeatId") && criteria.electionSeatId) {
          if (criteria.electionSeatId !== '-1') {
            whereCriteria.electionSeatId = criteria.electionSeatId;
          }
        } else {

        }
        if (criteria.hasOwnProperty("candidateType") && criteria.candidateType) {
          if (criteria.candidateType === 'possible' || criteria.candidateType === 'eligible' || criteria.candidateType === 'withdrawn') {
            whereCriteria.candidateType = criteria.candidateType;
          } else if (criteria.candidateType === 'elected' || criteria.candidateType === 'notelected') {
            whereCriteria.resultType = criteria.candidateType;
            whereCriteria.candidateType = 'eligible';
          }
        } else {

        }
        if (criteria.hasOwnProperty("electionCandidatePostId") && criteria.electionCandidatePostId) {
          if (criteria.electionCandidatePostId !== '-1') {
            whereCriteria.electionCandidatePostId = criteria.electionCandidatePostId;
          }
        } else {

        }
        return whereCriteria;
      };

      this.getCandidates = function () {
        // console.log("find korte aise");
        return Candidate.find({
          filter: {
            limit:30,
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getCandidate = function (id) {
        return Candidate.findById({
          id: id
        }).$promise;
      };

      this.getCandidateInformation=function(personId){
        return Candidate.find({
          filter:{
            where:{
              personId:personId
            },
            include:[
              'currentElection',
              'politicalParty'
            ]
          }
        }).$promise;
      }
      this.getPersonId=function(candidateId){
        return Candidate.find({
          filter:{
            where:{
              id:candidateId
            }
          }
        }).$promise;
      }
      this.getCandidatesWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);

         return Candidate.find({
          filter:{
            fields:['id','personNameEn','personNameBn','candidateNameBnAF','fatherHusbandNameBnAF','motherNameBnAF','professionTypeBnAF','addressBnAF', 'isPublished', 'resultType'],
            limit:10000,
            //skip:900
            where: whereCriteria
          }
        }).$promise;
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
              className: 'col-xs-4',
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
              className: 'col-xs-4',
              key: 'divisionId',
              type: 'select',
              templateOptions: {
                label: gettextCatalog.getString('Division'),
                required: true,
                options: divisionOptions
              }
            },
            {
              className: 'col-xs-4',
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
              className: 'col-xs-4',
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
              className: 'col-xs-4',
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
            {
              className: 'col-xs-4',
              key: 'electionSeatId',
              type: 'select',
              templateOptions: {
                label: gettextCatalog.getString('Election Seat'),
                required: true,
                options: []
              },
              controller: function($scope,ElectionSeatsServiceForCandidate) {

                // console.log(electionSeat);

                //set initially
                ElectionSeatsServiceForCandidate.getElectionSeatsWhere(electionSeat).then(function(electionSeats){
                  // console.log(electionSeats.length);
                  $scope.to.options = electionSeats.map(function (electionSeat) {
                    var nameStr ="";
                    if(electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameBn)
                      nameStr += "(" + electionSeat.division.nameBn + ")";
                    if(electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameBn)
                      nameStr += "(" + electionSeat.district.nameBn + ")";
                    if(electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameBn)
                      nameStr += "(" + electionSeat.upazilla.nameBn + ")";
                    if(electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameBn)
                      nameStr += "(" + electionSeat.union.nameBn + ")";
                    return {
                      name:  electionSeat.seatNameBn + " " + nameStr,
                      value: electionSeat.id
                    };
                  });
                })

                //when current election change then
                $scope.$watchCollection('[model.currentElectionId,model.districtId,model.upazillaId,model.unionId]', function (newValues, oldValues) {
                  //$scope.$watch('model.districtId', function (newValue, oldValue, theScope) {
                  //  if(newValue !== oldValue) {
                  //    if($scope.model[$scope.options.key] && oldValue) {
                  //       reset this select
                  //      $scope.model[$scope.options.key] = '';
                  //}
                  //console.log($scope.model);
                  ElectionSeatsServiceForCandidate.getElectionSeatsWhere($scope.model).then(function(electionSeats){
                    //console.log(electionSeats)
                    $scope.to.options = electionSeats.map(function (electionSeat) {
                      var nameStr ="";
                      if(electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameBn)
                        nameStr += "(" + electionSeat.division.nameBn + ")";
                      if(electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameBn)
                        nameStr += "(" + electionSeat.district.nameBn + ")";
                      if(electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameBn)
                        nameStr += "(" + electionSeat.upazilla.nameBn + ")";
                      if(electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameBn)
                        nameStr += "(" + electionSeat.union.nameBn + ")";
                      return {
                        name:  electionSeat.seatNameBn + " " + nameStr,
                        value: electionSeat.id
                      };
                    });
                  })
                  //}
                });
              }
            },
          ]
        }
        ] ;
      };
    });

})();
