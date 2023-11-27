(function () {
  'use strict';
  angular
    .module('com.module.fHome')
    .service('HomeService', function (CoreService, Candidate, gettextCatalog, $filter,CurrentElection, $rootScope) {


      this.getCurrentElectionsWithLimitSkip = function (limit,skip) {
        //console.log("aise ");
        if(!limit)
          limit=10;
        if(!skip)
          skip=0;

        return CurrentElection.find({
          filter: {
            order: 'electionDateTimestamp DESC',
            include: [
              'electionSeats',
              'election'
            ],
            limit:limit,
            skip:skip
          }
        }).$promise;
      };

      /** MAK Added **/
      this.getFeaturedElection = function (limit) {
        var whereCriteria={};
        whereCriteria.isFeatured="1";
        if(!limit)
           limit=1; //get the recent one

        return CurrentElection.find({
          filter: {
            order: 'electionDateTimestamp DESC',
            limit:limit,
            where: whereCriteria,
            include:[
              { relation:'electionSeats',
                scope:{
                  fields:['id','seatNameBn','seatNameEn']
                }
              },
              {relation: 'election'},
              {relation: 'candidates',
              scope:{
                where: {isPublished: true},
                fields:['id','genderBn','genderEn','candidateNameBnAF','personNameEn']
              }}
            ]
          }
        }).$promise;
      };

      this.firstElectionPoliticalPartyCandidateIncome=function(electionSeatCriteria){
        return Candidate.find({
          filter:{
            fields:['id','politicalPartyId','grandTotalIncomeAF'],
            where:{currentElectionId:electionSeatCriteria, isPublished:true},
            include:[
              'politicalParty'
            ]
          }
        }).$promise;
      }

      this.secondElectionPoliticalPartyCandidateIncome=function(electionSeatCriteria){
        return Candidate.find({
          filter:{
            fields:['id','politicalPartyId','grandTotalIncomeAF'],
            where:{currentElectionId:electionSeatCriteria, isPublished:true},
            include:[
              'politicalParty'
            ]
          }
        }).$promise;
      }


      this.getCurrentElectionCandidateVote=function(electionSeatCriteria){
        return Candidate.find({
          filter:{
            fields:['id','politicalPartyId','totalCountVote'],
            where:{currentElectionId:electionSeatCriteria, isPublished:true},
            include:[
              'politicalParty'
            ]
          }
        }).$promise;
      }

      this.verifyFilterData = function (criteria) {
        var whereCriteria = {};
        if (criteria.hasOwnProperty("currentElectionId") && criteria.currentElectionId) {
          whereCriteria.currentElectionId = criteria.currentElectionId;
        } else {
          return false;
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
      /** MAK End **/

      this.getCandidatesEducationWhere = function (currentElectionCriteria) {
        //var currentElectionCriteria={};
        //currentElectionCriteria.currentElectionId = currentElectionId;
        var whereCriteria = this.verifyFilterData(currentElectionCriteria);
        return Candidate.getEducationChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}).$promise;
      };

      this.getCandidatesOccupationWhere = function (currentElectionCriteria) {
        var whereCriteria = this.verifyFilterData(currentElectionCriteria);
        return Candidate.getOccupationChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}
        ).$promise;
      };

      this.getCandidatesCasesWhere = function (currentElectionCriteria) {
        var whereCriteria = this.verifyFilterData(currentElectionCriteria);
        return Candidate.getCasesChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}).$promise;
      };
      this.getCandidatesIncomeWhere = function (currentElectionCriteria) {
        var whereCriteria = this.verifyFilterData(currentElectionCriteria);
        return Candidate.getIncomeChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}
          //{
          //  filter: {
          //    fields: ['totalOwnIncomeAF'],
          //    limit: 100,
          //    //skip:900,
          //    where: whereCriteria
          //  }
          //}
        ).$promise;
      };
      this.getCandidatesAssetWhere = function (currentElectionCriteria) {
        var whereCriteria = this.verifyFilterData(currentElectionCriteria);
        return Candidate.getAssetChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}
          //  {
          //  filter: {
          //    fields: ['assetMaterialOwnTotalAF'],
          //    limit: 100,
          //    where: whereCriteria
          //  }
          //}
        ).$promise;
      };
      this.getCandidatesLoanWhere = function (currentElectionCriteria) {
        var whereCriteria = this.verifyFilterData(currentElectionCriteria);
        return Candidate.getLoanChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}
          //  {
          //  filter: {
          //    fields: ['assetMaterialOwnTotalAF'],
          //    limit: 100,
          //    where: whereCriteria
          //  }
          //}
        ).$promise;
      };

      this.getCandidatesLiabilityWhere = function (currentElectionCriteria) {
        var whereCriteria = this.verifyFilterData(currentElectionCriteria);
        return Candidate.getLiabilityChart(
          { whereCriteria: whereCriteria, type: $rootScope.locale.lang }
          //  {
          //  filter: {
          //    fields: ['assetMaterialOwnTotalAF'],
          //    limit: 100,
          //    where: whereCriteria
          //  }
          //}
        ).$promise;
      };

      this.getCandidatesTaxWhere = function (currentElectionCriteria) {
        var whereCriteria = this.verifyFilterData(currentElectionCriteria);
        return Candidate.getTaxChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}
          //  {
          //  filter: {
          //    fields: ['assetMaterialOwnTotalAF'],
          //    limit: 100,
          //    where: whereCriteria
          //  }
          //}
        ).$promise;
      };

      this.getCandidatesGenderWhere = function (currentElectionCriteria) {
        var whereCriteria = this.verifyFilterData(currentElectionCriteria);
        return Candidate.getGenderChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}).$promise;
      };

      this.topElectedCandidateWhere = function(currentElectionCriteria){
        var whereCriteria = this.verifyFilterData(currentElectionCriteria);
        console.log(whereCriteria);
        return Candidate.getTopElectedCandidateChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}).$promise;
      }

      //selim end
      this.getCandidatesWhere = function (electionSeatCriteria) {
        var whereCriteria={};

        //console.log(electionSeatCriteria);

        if(electionSeatCriteria.hasOwnProperty("currentElectionId") && electionSeatCriteria.currentElectionId)
          whereCriteria.currentElectionId = electionSeatCriteria.currentElectionId;

        //if(electionSeatCriteria.hasOwnProperty("divisionId") && electionSeatCriteria.divisionId)
        //  whereCriteria.divisionId = electionSeatCriteria.divisionId;
        //
        //if(electionSeatCriteria.hasOwnProperty("districtId") && electionSeatCriteria.districtId)
        //  whereCriteria.districtId = electionSeatCriteria.districtId;
        //
        //if(electionSeatCriteria.hasOwnProperty("upazillaId") && electionSeatCriteria.upazillaId)
        //  whereCriteria.upazillaId = electionSeatCriteria.upazillaId;
        //
        //if(electionSeatCriteria.hasOwnProperty("unionId") && electionSeatCriteria.unionId)
        //  whereCriteria.unionId = electionSeatCriteria.unionId;

        if(electionSeatCriteria.hasOwnProperty("electionSeatId") && electionSeatCriteria.electionSeatId)
          whereCriteria.electionSeatId = electionSeatCriteria.electionSeatId;

        return Candidate.find({
          filter: {
            fields:['id','personNameEn','personNameBn','candidateNameBnAF'],
            order: 'created DESC',
            where: whereCriteria
          }
        }).$promise;
      };

      this.getCandidatesFeatured = function () {
        var whereCriteria={};

          whereCriteria.isFeatured = true;

        return Candidate.find({
          filter: {
            fields:['id','personNameEn','personNameBn','fatherNameBn','fatherNameEn', 'addressBnAF','motherNameBnAF'],
            order: 'created DESC',
            where: whereCriteria
          }
        }).$promise;
      };

      this.getFormFilter = function (currentElections,divisions,electionSeat) {
        //console.log("ekhane aise");
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
              className: 'col-xs-6',
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
              className: 'col-xs-6',
              key: 'divisionId',
              type: 'select',
              templateOptions: {
                label: gettextCatalog.getString('Division'),
                required: true,
                options: divisionOptions
              }
            },
            {
              className: 'col-xs-6',
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
              className: 'col-xs-6',
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
              className: 'col-xs-6',
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
              className: 'col-xs-6',
              key: 'electionSeatId',
              type: 'select',
              templateOptions: {
                label: gettextCatalog.getString('Election Seat'),
                required: true,
                options: []
              },
              controller: function($scope,ElectionSeatsServiceForCandidate) {

                //console.log(electionSeat);

                //set initially
                ElectionSeatsServiceForCandidate.getElectionSeatsWhere(electionSeat).then(function(electionSeats){
                  //console.log(electionSeats.length);
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
