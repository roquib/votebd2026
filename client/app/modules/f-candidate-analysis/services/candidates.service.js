(function () {
  'use strict';
  angular
    .module('com.module.fCandidateAnalysis')
    .service('CandidateAnalysisService', function (CoreService, Candidate, CurrentElection, $filter, gettextCatalog, $rootScope, ElectionsServiceForES) {
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
            limit: 30,
            order: 'created DESC'
          }
        }).$promise;
      };
      this.getCandidate = function (id) {
        return Candidate.findById({
          id: id
        }).$promise;
      };
      this.getCandidatesWhere = function (electionSeatCriteria) {
        var whereCriteria = {};

        // console.log(electionSeatCriteria);

        if (electionSeatCriteria.hasOwnProperty("currentElectionId") && electionSeatCriteria.currentElectionId)
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

        if (electionSeatCriteria.hasOwnProperty("electionSeatId") && electionSeatCriteria.electionSeatId)
          whereCriteria.electionSeatId = electionSeatCriteria.electionSeatId;


        // console.log("whereCriteria", whereCriteria);

        return Candidate.find({
          filter: {
            fields: ['id', 'candidateNameBnAF', 'fatherHusbandNameBnAF', 'motherNameBnAF', 'professionTypeBnAF', 'addressBnAF'],
            limit: 10,
            where: whereCriteria
          }
        }).$promise;
      };

      this.getFeaturedElection=function(currentElectionId){
        return CurrentElection.findById({
          id:currentElectionId
        }).$promise;
      }

      this.getCurrentElectionCandidate=function(electionSeatCriteria){
        return Candidate.find({
          filter:{
            fields:['id','politicalPartyId','degreeTypeBnAF'],
            where:{currentElectionId:electionSeatCriteria, isPublished:true},
            include:[
              'politicalParty'
            ]
          }
        }).$promise;
      }

      this.getPoliticalPartyWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        return Candidate.getPoliticalPartyChartNew({whereCriteria: whereCriteria, type: $rootScope.locale.lang}
        ).$promise;
      };
      this.getCandidatesOccupationWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        return Candidate.getOccupationChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}
        ).$promise;
      };
      this.getCandidatesCommitmentsAchievementsWhere = function (electionSeatCriteria,limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);

        return Candidate.getCandidateLists({
          whereCriteria: whereCriteria,
          limit: limit,
          type: $rootScope.locale.lang,
        }).$promise;

      };
      this.getCandidatesEducationWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        return Candidate.getEducationChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}).$promise;
      };
      this.getCandidatesCasesWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        return Candidate.getCasesChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}).$promise;
      };
      this.getCandidatesGenderWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        return Candidate.getGenderChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}).$promise;

      };
      this.getCandidatesAgeWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        return Candidate.getAgeChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}).$promise;
      };
      this.getCandidatesTaxReturnSummaryWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        return Candidate.getTaxReturnSummaryChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}).$promise;
      };
      this.getCandidatesAssetSummaryWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        return Candidate.getAssetSummaryChart({whereCriteria: whereCriteria, type: $rootScope.locale.lang}).$promise;
      };
      this.getCandidatesIncomeWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
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
      this.getCandidatesAssetWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
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
      this.getCandidatesTaxWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
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
      this.getCandidatesLoanWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
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
      this.getCandidatesLiabilityWhere = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
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
      this.getPfseCandidates6 = function (electionSeatCriteria) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        return Candidate.getPfseCandidates6({whereCriteria: whereCriteria}
        ).$promise;
      };
      this.getPfseCandidates5 = function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        return Candidate.getPfseCandidates5({whereCriteria: whereCriteria, limit: limit, type: $rootScope.locale.lang}
        ).$promise;
      };
      this.getPfseCandidatesDonation = function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getPfseCandidatesDonation({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getPfseCandidatesLoan = function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getPfseCandidatesLoan({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getPfseCandidatesTotalIncome = function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getPfseCandidatesTotalIncome({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getPfseCandidatesPiWhichExceedsSpendingLimits = function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getPfseCandidatesPiWhichExceedsSpendingLimits({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };

      this.getPfseCandidatesBusinessOrganization = function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getPfseCandidatesBusinessOrganization({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };


      this.getFormFilter = function (elections, currentElections, politicalParties, divisions, electionSeat) {

        var electionOptions = elections.map(function (election) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = election.nameBn;
          else
            nameFld = election.nameEn;
          return {
            name: nameFld,
            value: election.id
          };
        });

        var politicalPartyOptions = politicalParties.map(function (politicalParty) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = politicalParty.partyNameBn;
          else
            nameFld = politicalParty.partyNameEn;
          return {
            name: nameFld,
            value: politicalParty.id
          };
        });

        var divisionOptions = divisions.map(function (division) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = division.nameBn;
          else
            nameFld = division.nameEn;
          return {
            name: nameFld,
            value: division.id
          };
        });

        var currentElectionOptions = [];//currentElections.map(function (currentElection) {
        //  var nameFld = '';
        //  if ($rootScope.locale.lang == "bn_BD")
        //    nameFld = $filter('date')(currentElection.electionDate, "dd/MM/yyyy") + " - " + currentElection.currentElectionNameBn;
        //  else
        //    nameFld = $filter('date')(currentElection.electionDate, "dd/MM/yyyy") + " - " + currentElection.currentElectionNameEn;
        //
        //  return {
        //    name: nameFld,
        //    value: currentElection.id
        //  };
        //});


        if ($rootScope.locale.lang == "bn_BD")
          var candidateTypeOptions = [
            {name: 'সম্ভাব্য', value: "possible"},
            {name: 'চূড়ান্ত প্রার্থী', value: "eligible"},
            {name: 'প্রত্যাহারকৃত', value: "withdrawn"},
            {name: 'নির্বাচিত', value: "elected"},
            {name: 'অনির্বাচিত', value: "notelected"}
          ];
        else
          var candidateTypeOptions = [
            {name: 'Possible', value: "possible"},
            {name: 'Eligible', value: "eligible"},
            {name: 'Withdrawn', value: "withdrawn"},
            {name: 'Elected', value: "elected"},
            {name: 'Notelected', value: "notelected"}
          ];

        if ($rootScope.locale.lang == "bn_BD") {
          divisionOptions.unshift({name: "সব", value: "-1"});
          candidateTypeOptions.unshift({name: "সব", value: "-1"});
          politicalPartyOptions.unshift({name: "সব", value: "-1"});
        } else {
          divisionOptions.unshift({name: "All", value: "-1"});
          candidateTypeOptions.unshift({name: "All", value: "-1"});
          politicalPartyOptions.unshift({name: "All", value: "-1"});
        }


        return [
          {
            className: 'row',
            fieldGroup: [
              {
                className: 'col-md-12',
                key: 'electionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Election'),
                  required: true,
                  options: electionOptions
                },
                //hideExpression : "true",
                //controller: function ($scope, ElectionsServiceForES) {
                //  $scope.$watch('model.electionId', function(newValue,oldValue) {
                //    if (newValue !== oldValue) {
                //      ElectionsServiceForES.getElection(newValue).then(function (election) {
                //        console.log(election);
                //        if(election && election.electionType == 'national' ){
                //          angular.forEach($scope.fields, function(field, index) {
                //            console.log(field);
                //            if (field.key=='upazillaId') {
                //              field.hide = true;
                //            }
                //            else if (field.key=='unionId') {
                //              field.hide = true;
                //            }
                //          });
                //        }
                //        else if(election && (election.electionType == 'city-corporation' || election.electionType == 'municipal' || election.electionType == 'upazilla')){
                //          angular.forEach($scope.fields, function(field, index) {
                //            if (field.key == 'upazillaId') {
                //              //field.hide = true;
                //              if (election.electionType == 'city-corporation')
                //                field.templateOptions.label = 'City Corporation';
                //              else if (election.electionType == 'municipal')
                //                field.templateOptions.label = 'Municipality';
                //              else if (election.electionType == 'upazilla')
                //                field.templateOptions.label = 'Upazilla';
                //            }
                //            else if (field.key == 'unionId') {
                //
                //              field.hide = true;
                //            }
                //          });
                //        }
                //      });
                //    }
                //  }, true);
                //}

              },
              {
                className: 'col-md-12',
                key: 'currentElectionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Current Election'),
                  required: true,
                  options: currentElectionOptions
                },
                controller: function ($scope, CurrentElectionsServiceForCA) {
                  //when current election change then
                  $scope.$watch('model.electionId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      CurrentElectionsServiceForCA.getCurrentElections(newValue).then(function (currentElections) {
                        //console.log(currentElections);
                        $scope.to.options = currentElections.map(function (currentElection) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = currentElection.currentElectionNameBn;
                          else
                            nameFld = currentElection.currentElectionNameEn;
                          return {
                            name: nameFld,
                            value: currentElection.id
                          };
                        });
                      });
                    }
                  });
                }
              },
              {
                className: 'col-md-12',
                key: 'politicalPartyId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Political Party'),
                  options: politicalPartyOptions
                }
              },
              {
                className: 'col-md-12',
                key: 'electionCandidatePostId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Post'),
                  options: []
                },
                controller: function ($scope, ElectionCandidatePostsServiceForCA) {

                  //console.log(electionSeat);

                  //set initially
                  if (electionSeat.hasOwnProperty("currentElectionId") && electionSeat.currentElectionId) {
                    ElectionCandidatePostsServiceForCA.getCandidatePostsByCurrentElection(electionSeat).then(function (electionCandidatePosts) {
                      // console.log(electionCandidatePosts.length);
                      $scope.to.options = electionCandidatePosts.map(function (electionCandidatePost) {

                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = electionCandidatePost.postNameBn;
                        else
                          nameFld = electionCandidatePost.postNameEn;

                        return {
                          name: nameFld,
                          value: electionCandidatePost.id
                        };
                      });
                    });
                  }

                  //when current election change then
                  $scope.$watchCollection('[model.currentElectionId,model.districtId,model.upazillaId,model.unionId]', function (newValues, oldValues) {
                    $scope.$watch('model.currentElectionId', function (newValue, oldValue, theScope) {
                      if (newValue !== oldValue) {
                        if ($scope.model[$scope.options.key] && oldValue) {
                          $scope.model[$scope.options.key] = '';
                        }
                        //console.log($scope.model);
                        ElectionCandidatePostsServiceForCA.getCandidatePostsByCurrentElection($scope.model).then(function (electionCandidatePosts) {
                          $scope.to.options = electionCandidatePosts.map(function (electionCandidatePost) {

                            var nameFld = '';

                            if ($rootScope.locale.lang == "bn_BD") {
                              nameFld = electionCandidatePost.postNameBn;
                            }
                            else {
                              nameFld = electionCandidatePost.postNameEn;
                            }
                            return {
                              name: nameFld,
                              value: electionCandidatePost.id
                            };
                          });

                          if ($scope.to.options.length) {
                            if ($rootScope.locale.lang == "bn_BD") {
                              $scope.to.options.unshift({name: "সব", value: "-1"});
                            } else {
                              $scope.to.options.unshift({name: "All", value: "-1"});
                            }
                          }

                        });

                      }
                    });
                  });
                }
              },
              {
                className: 'col-md-12',
                key: 'candidateType',
                type: 'select',
                defaultValue:'eligible',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Type'),
                  options: candidateTypeOptions
                }
              },
              {
                className: 'col-md-12',
                key: 'divisionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Division'),
                  required: true,
                  options: divisionOptions
                }
              },
              {
                className: 'col-md-12',
                key: 'districtId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('District'),
                  required: true,
                  options: []
                },
                controller: function ($scope, DistrictsServiceForSeats) {

                  //set initially
                  if (electionSeat && electionSeat.hasOwnProperty("divisionId") && electionSeat.divisionId) {
                    DistrictsServiceForSeats.getDistrictsByDivision(electionSeat.divisionId).then(function (districts) {
                      //console.log(districts);
                      $scope.to.options = districts.map(function (district) {
                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = district.nameBn;
                        else
                          nameFld = district.nameEn;
                        return {
                          name: nameFld,
                          value: district.id
                        };
                      });

                      if ($scope.to.options.length) {
                        if ($rootScope.locale.lang == "bn_BD") {
                          $scope.to.options.unshift({name: "সব", value: "-1"});
                        } else {
                          $scope.to.options.unshift({name: "All", value: "-1"});
                        }
                      }

                    });
                  }

                  //when current election change then
                  $scope.$watch('model.divisionId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      DistrictsServiceForSeats.getDistrictsByDivision(newValue).then(function (districts) {
                        //console.log(districts);
                        $scope.to.options = districts.map(function (district) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = district.nameBn;
                          else
                            nameFld = district.nameEn;
                          return {
                            name: nameFld,
                            value: district.id
                          };
                        });

                        if ($scope.to.options.length) {
                          if ($rootScope.locale.lang == "bn_BD") {
                            $scope.to.options.unshift({name: "সব", value: "-1"});
                          } else {
                            $scope.to.options.unshift({name: "All", value: "-1"});
                          }
                        }

                      });
                    }
                  });

                }
              },
              {
                className: 'col-md-12',
                key: 'upazillaId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Upazilla/City Corporation/Municipality'),
                  options: []
                },
                controller: function ($scope, UpazillasServiceForSeats) {

                  //set initially
                  if (electionSeat && electionSeat.hasOwnProperty("districtId") && electionSeat.districtId) {
                    UpazillasServiceForSeats.getUpazillasByDistrict(electionSeat.districtId).then(function (upazillas) {
                      //console.log(upazillas);
                      $scope.to.options = upazillas.map(function (upazilla) {
                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = upazilla.nameBn + " (" + upazilla.regionType + ")";
                        else
                          nameFld = upazilla.nameEn + " (" + upazilla.regionType + ")";

                        return {
                          name: nameFld,
                          value: upazilla.id
                        };
                      });

                      if ($scope.to.options.length) {
                        if ($rootScope.locale.lang == "bn_BD") {
                          $scope.to.options.unshift({name: "সব", value: "-1"});
                        } else {
                          $scope.to.options.unshift({name: "All", value: "-1"});
                        }
                      }

                    });
                  }

                  //when current election change then
                  $scope.$watch('model.districtId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      UpazillasServiceForSeats.getUpazillasByDistrict(newValue).then(function (upazillas) {
                        //console.log(upazillas);
                        $scope.to.options = upazillas.map(function (upazilla) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = upazilla.nameBn + " (" + upazilla.regionType + ")";
                          else
                            nameFld = upazilla.nameEn + " (" + upazilla.regionType + ")";

                          return {
                            name: nameFld,
                            value: upazilla.id
                          };
                        });
                        if ($scope.to.options.length) {
                          if ($rootScope.locale.lang == "bn_BD") {
                            $scope.to.options.unshift({name: "সব", value: "-1"});
                          } else {
                            $scope.to.options.unshift({name: "All", value: "-1"});
                          }
                        }
                      });
                    }
                  });
                }
              },
              {
                className: 'col-md-12',
                key: 'unionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Union'),
                  options: []
                },
                controller: function ($scope, UnionsServiceForSeats, ElectionsServiceForES) {

                  //set initially
                  if (electionSeat && electionSeat.hasOwnProperty("upazillaId") && electionSeat.upazillaId) {
                    UnionsServiceForSeats.getUnionsByUpazilla(electionSeat.upazillaId).then(function (unions) {
                      //console.log(unions);
                      $scope.to.options = unions.map(function (union) {
                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = union.nameBn + " (" + union.regionType + ")";
                        else
                          nameFld = union.nameEn + " (" + union.regionType + ")";

                        return {
                          name: nameFld,
                          value: union.id
                        };
                      });

                      if ($scope.to.options.length) {
                        if ($rootScope.locale.lang == "bn_BD") {
                          $scope.to.options.unshift({name: "সব", value: "-1"});
                        } else {
                          $scope.to.options.unshift({name: "All", value: "-1"});
                        }
                      }

                    });
                  }

                  //when current election change then
                  $scope.$watch('model.upazillaId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      UnionsServiceForSeats.getUnionsByUpazilla(newValue).then(function (unions) {
                        //console.log(unions);
                        $scope.to.options = unions.map(function (union) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = union.nameBn + " (" + union.regionType + ")";
                          else
                            nameFld = union.nameEn + " (" + union.regionType + ")";

                          return {
                            name: nameFld,
                            value: union.id
                          };
                        });

                        if ($scope.to.options.length) {
                          if ($rootScope.locale.lang == "bn_BD") {
                            $scope.to.options.unshift({name: "সব", value: "-1"});
                          } else {
                            $scope.to.options.unshift({name: "All", value: "-1"});
                          }
                        }

                      });
                    }
                  });


                  //$scope.$watch('model.electionId', function (newValue, oldValue, theScope) {
                  //  console.log('theScope');
                  //  console.log(theScope);
                  //  if (newValue !== oldValue) {
                  //    ElectionsServiceForES.getElection(newValue).then(function (election) {
                  //      console.log(election);
                  //      if(election && (election.electionType == 'national' || election.electionType == 'city-corporation' || election.electionType == 'municipal'))
                  //        $scope.options.hide=true;
                  //      else
                  //        $scope.options.hide=false;
                  //    });
                  //  }
                  //});

                },
                //hideExpression:'false',

              },
              {
                className: 'col-md-12',
                key: 'electionSeatId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Election Seat'),
                  required: true,
                  options: []
                },
                controller: function ($scope, ElectionSeatsServiceForCandidate) {

                  //console.log(electionSeat);

                  //set initially
                  ElectionSeatsServiceForCandidate.getElectionSeatsWhere(electionSeat).then(function (electionSeats) {
                    //console.log(electionSeats.length);
                    $scope.to.options = electionSeats.map(function (electionSeat) {

                      var nameFld = '';
                      if ($rootScope.locale.lang == "bn_BD")
                        nameFld = electionSeat.seatNameBn;
                      else
                        nameFld = electionSeat.seatNameEn;


                      var nameStr = "";
                      if (electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameBn)
                        nameStr += "(" + electionSeat.division.nameBn + ")";
                      if (electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameBn)
                        nameStr += "(" + electionSeat.district.nameBn + ")";
                      if (electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameBn)
                        nameStr += "(" + electionSeat.upazilla.nameBn + ")";
                      if (electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameBn)
                        nameStr += "(" + electionSeat.union.nameBn + ")";
                      return {
                        name: nameFld + " " + nameStr,
                        value: electionSeat.id
                      };
                    });

                    if ($scope.to.options.length) {
                      if ($rootScope.locale.lang == "bn_BD") {
                        $scope.to.options.unshift({name: "সব", value: "-1"});
                      } else {
                        $scope.to.options.unshift({name: "All", value: "-1"});
                      }
                    }

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
                    ElectionSeatsServiceForCandidate.getElectionSeatsWhere($scope.model).then(function (electionSeats) {
                      //console.log(electionSeats)
                      $scope.to.options = electionSeats.map(function (electionSeat) {

                        var nameFld = '';
                        var nameStr = "";

                        if ($rootScope.locale.lang == "bn_BD") {
                          nameFld = electionSeat.seatNameBn;
                          //if (electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameBn)
                          //  nameStr += "(" + electionSeat.division.nameBn + ")";
                          if (electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameBn)
                            nameStr += "(" + electionSeat.district.nameBn + ")";
                          if (electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameBn)
                            nameStr += "(" + electionSeat.upazilla.nameBn + ")";
                          if (electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameBn)
                            nameStr += "(" + electionSeat.union.nameBn + ")";
                        }
                        else {
                          nameFld = electionSeat.seatNameEn;
                          //if (electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameEn)
                          //  nameStr += "(" + electionSeat.division.nameEn + ")";
                          if (electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameEn)
                            nameStr += "(" + electionSeat.district.nameEn + ")";
                          if (electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameEn)
                            nameStr += "(" + electionSeat.upazilla.nameEn + ")";
                          if (electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameEn)
                            nameStr += "(" + electionSeat.union.nameEn + ")";
                        }


                        return {
                          name: nameFld + " " + nameStr,
                          value: electionSeat.id
                        };
                      });

                      if ($scope.to.options.length) {
                        if ($rootScope.locale.lang == "bn_BD") {
                          $scope.to.options.unshift({name: "সব", value: "-1"});
                        } else {
                          $scope.to.options.unshift({name: "All", value: "-1"});
                        }
                      }

                    })
                    //}
                  });
                }
              }
            ]
          }
        ];
      };
      this.getFormFilterForElection = function (elections, currentElections, politicalParties, divisions, electionSeat) {

        var electionOptions = elections.map(function (election) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = election.nameBn;
          else
            nameFld = election.nameEn;
          return {
            name: nameFld,
            value: election.id
          };
        });

        var politicalPartyOptions = politicalParties.map(function (politicalParty) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = politicalParty.partyNameBn;
          else
            nameFld = politicalParty.partyNameEn;
          return {
            name: nameFld,
            value: politicalParty.id
          };
        });

        var divisionOptions = divisions.map(function (division) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = division.nameBn;
          else
            nameFld = division.nameEn;
          return {
            name: nameFld,
            value: division.id
          };
        });

        var currentElectionOptions = [];//currentElections.map(function (currentElection) {
        //  var nameFld = '';
        //  if ($rootScope.locale.lang == "bn_BD")
        //    nameFld = $filter('date')(currentElection.electionDate, "dd/MM/yyyy") + " - " + currentElection.currentElectionNameBn;
        //  else
        //    nameFld = $filter('date')(currentElection.electionDate, "dd/MM/yyyy") + " - " + currentElection.currentElectionNameEn;
        //
        //  return {
        //    name: nameFld,
        //    value: currentElection.id
        //  };
        //});


        if ($rootScope.locale.lang == "bn_BD")
          var candidateTypeOptions = [
            {name: 'সম্ভাব্য', value: "possible"},
            {name: 'চূড়ান্ত প্রার্থী', value: "eligible"},
            {name: 'প্রত্যাহারকৃত', value: "withdrawn"},
            {name: 'নির্বাচিত', value: "elected"},
            {name: 'অনির্বাচিত', value: "notelected"}
          ];
        else
          var candidateTypeOptions = [
            {name: 'Possible', value: "possible"},
            {name: 'Eligible', value: "eligible"},
            {name: 'Withdrawn', value: "withdrawn"},
            {name: 'Elected', value: "elected"},
            {name: 'Notelected', value: "notelected"}
          ];

        if ($rootScope.locale.lang == "bn_BD") {
          divisionOptions.unshift({name: "সব", value: "-1"});
          candidateTypeOptions.unshift({name: "সব", value: "-1"});
          politicalPartyOptions.unshift({name: "সব", value: "-1"});
        } else {
          divisionOptions.unshift({name: "All", value: "-1"});
          candidateTypeOptions.unshift({name: "All", value: "-1"});
          politicalPartyOptions.unshift({name: "All", value: "-1"});
        }



        return [
          {
            className: 'row',
            fieldGroup: [
              {
                className: 'col-md-12',
                key: 'electionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Election'),
                  required: true,
                  options: electionOptions
                }
              },
              {
                className: 'col-md-12',
                key: 'currentElectionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Current Election'),
                  required: true,
                  options: currentElectionOptions
                },
                controller: function ($scope, CurrentElectionsServiceForCA) {
                  //when current election change then
                  $scope.$watch('model.electionId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      CurrentElectionsServiceForCA.getCurrentElections(newValue).then(function (currentElections) {
                        //console.log(currentElections);
                        $scope.to.options = currentElections.map(function (currentElection) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = currentElection.currentElectionNameBn;
                          else
                            nameFld = currentElection.currentElectionNameEn;
                          return {
                            name: nameFld,
                            value: currentElection.id
                          };
                        });
                      });
                    }
                  });
                }
              },
              {
                className: 'col-md-12',
                key: 'politicalPartyId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Political Party'),
                  options: politicalPartyOptions
                }
              },
              {
                className: 'col-md-12',
                key: 'electionCandidatePostId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Post'),
                  options: []
                },
                controller: function ($scope, ElectionCandidatePostsServiceForCA) {

                  //console.log(electionSeat);

                  //set initially
                  if (electionSeat.hasOwnProperty("currentElectionId") && electionSeat.currentElectionId) {
                    ElectionCandidatePostsServiceForCA.getCandidatePostsByCurrentElection(electionSeat).then(function (electionCandidatePosts) {
                      console.log(electionCandidatePosts.length);
                      $scope.to.options = electionCandidatePosts.map(function (electionCandidatePost) {

                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = electionCandidatePost.postNameBn;
                        else
                          nameFld = electionCandidatePost.postNameEn;

                        return {
                          name: nameFld,
                          value: electionCandidatePost.id
                        };
                      });
                    });
                  }

                  //when current election change then
                  $scope.$watchCollection('[model.currentElectionId,model.districtId,model.upazillaId,model.unionId]', function (newValues, oldValues) {
                    $scope.$watch('model.currentElectionId', function (newValue, oldValue, theScope) {
                      if (newValue !== oldValue) {
                        if ($scope.model[$scope.options.key] && oldValue) {
                          $scope.model[$scope.options.key] = '';
                        }
                        //console.log($scope.model);
                        ElectionCandidatePostsServiceForCA.getCandidatePostsByCurrentElection($scope.model).then(function (electionCandidatePosts) {
                          $scope.to.options = electionCandidatePosts.map(function (electionCandidatePost) {

                            var nameFld = '';

                            if ($rootScope.locale.lang == "bn_BD") {
                              nameFld = electionCandidatePost.postNameBn;
                            }
                            else {
                              nameFld = electionCandidatePost.postNameEn;
                            }
                            return {
                              name: nameFld,
                              value: electionCandidatePost.id
                            };
                          });

                          if ($scope.to.options.length) {
                            if ($rootScope.locale.lang == "bn_BD") {
                              $scope.to.options.unshift({name: "সব", value: "-1"});
                            } else {
                              $scope.to.options.unshift({name: "All", value: "-1"});
                            }
                          }

                        });

                      }
                    });
                  });
                }
              },
              {
                className: 'col-md-12',
                key: 'candidateType',
                type: 'select',
                defaultValue:'eligible',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Type'),
                  options: candidateTypeOptions
                }
              },
              {
                className: 'col-md-12',
                key: 'divisionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Division'),
                  required: true,
                  options: divisionOptions
                }
              },
              {
                className: 'col-md-12',
                key: 'districtId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('District'),
                  required: true,
                  options: []
                },
                controller: function ($scope, DistrictsServiceForSeats) {

                  //set initially
                  if (electionSeat && electionSeat.hasOwnProperty("divisionId") && electionSeat.divisionId) {
                    DistrictsServiceForSeats.getDistrictsByDivision(electionSeat.divisionId).then(function (districts) {
                      //console.log(districts);
                      $scope.to.options = districts.map(function (district) {
                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = district.nameBn;
                        else
                          nameFld = district.nameEn;
                        return {
                          name: nameFld,
                          value: district.id
                        };
                      });

                      if ($scope.to.options.length) {
                        if ($rootScope.locale.lang == "bn_BD") {
                          $scope.to.options.unshift({name: "সব", value: "-1"});
                        } else {
                          $scope.to.options.unshift({name: "All", value: "-1"});
                        }
                      }

                    });
                  }

                  //when current election change then
                  $scope.$watch('model.divisionId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      DistrictsServiceForSeats.getDistrictsByDivision(newValue).then(function (districts) {
                        //console.log(districts);
                        $scope.to.options = districts.map(function (district) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = district.nameBn;
                          else
                            nameFld = district.nameEn;
                          return {
                            name: nameFld,
                            value: district.id
                          };
                        });

                        if ($scope.to.options.length) {
                          if ($rootScope.locale.lang == "bn_BD") {
                            $scope.to.options.unshift({name: "সব", value: "-1"});
                          } else {
                            $scope.to.options.unshift({name: "All", value: "-1"});
                          }
                        }

                      });
                    }
                  });

                }
              },
              {
                className: 'col-md-12',
                key: 'upazillaId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Upazilla/City Corporation/Municipality'),
                  options: []
                },
                controller: function ($scope, UpazillasServiceForSeats) {

                  //set initially
                  if (electionSeat && electionSeat.hasOwnProperty("districtId") && electionSeat.districtId) {
                    UpazillasServiceForSeats.getUpazillasByDistrict(electionSeat.districtId).then(function (upazillas) {
                      //console.log(upazillas);
                      $scope.to.options = upazillas.map(function (upazilla) {
                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = upazilla.nameBn + " (" + upazilla.regionType + ")";
                        else
                          nameFld = upazilla.nameEn + " (" + upazilla.regionType + ")";

                        return {
                          name: nameFld,
                          value: upazilla.id
                        };
                      });

                      if ($scope.to.options.length) {
                        if ($rootScope.locale.lang == "bn_BD") {
                          $scope.to.options.unshift({name: "সব", value: "-1"});
                        } else {
                          $scope.to.options.unshift({name: "All", value: "-1"});
                        }
                      }

                    });
                  }

                  //when current election change then
                  $scope.$watch('model.districtId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      UpazillasServiceForSeats.getUpazillasByDistrict(newValue).then(function (upazillas) {
                        //console.log(upazillas);
                        $scope.to.options = upazillas.map(function (upazilla) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = upazilla.nameBn + " (" + upazilla.regionType + ")";
                          else
                            nameFld = upazilla.nameEn + " (" + upazilla.regionType + ")";

                          return {
                            name: nameFld,
                            value: upazilla.id
                          };
                        });
                        if ($scope.to.options.length) {
                          if ($rootScope.locale.lang == "bn_BD") {
                            $scope.to.options.unshift({name: "সব", value: "-1"});
                          } else {
                            $scope.to.options.unshift({name: "All", value: "-1"});
                          }
                        }
                      });
                    }
                  });
                }
              },
              {
                className: 'col-md-12',
                key: 'unionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Union'),
                  options: []
                },
                controller: function ($scope, UnionsServiceForSeats, ElectionsServiceForES) {

                  //set initially
                  if (electionSeat && electionSeat.hasOwnProperty("upazillaId") && electionSeat.upazillaId) {
                    UnionsServiceForSeats.getUnionsByUpazilla(electionSeat.upazillaId).then(function (unions) {
                      //console.log(unions);
                      $scope.to.options = unions.map(function (union) {
                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = union.nameBn + " (" + union.regionType + ")";
                        else
                          nameFld = union.nameEn + " (" + union.regionType + ")";

                        return {
                          name: nameFld,
                          value: union.id
                        };
                      });

                      if ($scope.to.options.length) {
                        if ($rootScope.locale.lang == "bn_BD") {
                          $scope.to.options.unshift({name: "সব", value: "-1"});
                        } else {
                          $scope.to.options.unshift({name: "All", value: "-1"});
                        }
                      }

                    });
                  }

                  //when current election change then
                  $scope.$watch('model.upazillaId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      UnionsServiceForSeats.getUnionsByUpazilla(newValue).then(function (unions) {
                        //console.log(unions);
                        $scope.to.options = unions.map(function (union) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = union.nameBn + " (" + union.regionType + ")";
                          else
                            nameFld = union.nameEn + " (" + union.regionType + ")";

                          return {
                            name: nameFld,
                            value: union.id
                          };
                        });

                        if ($scope.to.options.length) {
                          if ($rootScope.locale.lang == "bn_BD") {
                            $scope.to.options.unshift({name: "সব", value: "-1"});
                          } else {
                            $scope.to.options.unshift({name: "All", value: "-1"});
                          }
                        }

                      });
                    }
                  });


                  //$scope.$watch('model.electionId', function (newValue, oldValue, theScope) {
                  //  console.log('theScope');
                  //  console.log(theScope);
                  //  if (newValue !== oldValue) {
                  //    ElectionsServiceForES.getElection(newValue).then(function (election) {
                  //      console.log(election);
                  //      if(election && (election.electionType == 'national' || election.electionType == 'city-corporation' || election.electionType == 'municipal'))
                  //        $scope.options.hide=true;
                  //      else
                  //        $scope.options.hide=false;
                  //    });
                  //  }
                  //});

                },
                //hideExpression:'false',

              },
              {
                className: 'col-md-12',
                key: 'electionSeatId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Election Seat'),
                  required: true,
                  options: []
                },
                controller: function ($scope, ElectionSeatsServiceForCandidate) {

                  //console.log(electionSeat);

                  //set initially
                  ElectionSeatsServiceForCandidate.getElectionSeatsWhere(electionSeat).then(function (electionSeats) {
                    //console.log(electionSeats.length);
                    $scope.to.options = electionSeats.map(function (electionSeat) {

                      var nameFld = '';
                      if ($rootScope.locale.lang == "bn_BD")
                        nameFld = electionSeat.seatNameBn;
                      else
                        nameFld = electionSeat.seatNameEn;


                      var nameStr = "";
                      if (electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameBn)
                        nameStr += "(" + electionSeat.division.nameBn + ")";
                      if (electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameBn)
                        nameStr += "(" + electionSeat.district.nameBn + ")";
                      if (electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameBn)
                        nameStr += "(" + electionSeat.upazilla.nameBn + ")";
                      if (electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameBn)
                        nameStr += "(" + electionSeat.union.nameBn + ")";
                      return {
                        name: nameFld + " " + nameStr,
                        value: electionSeat.id
                      };
                    });

                    if ($scope.to.options.length) {
                      if ($rootScope.locale.lang == "bn_BD") {
                        $scope.to.options.unshift({name: "সব", value: "-1"});
                      } else {
                        $scope.to.options.unshift({name: "All", value: "-1"});
                      }
                    }

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
                    ElectionSeatsServiceForCandidate.getElectionSeatsWhere($scope.model).then(function (electionSeats) {
                      //console.log(electionSeats)
                      $scope.to.options = electionSeats.map(function (electionSeat) {

                        var nameFld = '';
                        var nameStr = "";

                        if ($rootScope.locale.lang == "bn_BD") {
                          nameFld = electionSeat.seatNameBn;
                          //if (electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameBn)
                          //  nameStr += "(" + electionSeat.division.nameBn + ")";
                          if (electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameBn)
                            nameStr += "(" + electionSeat.district.nameBn + ")";
                          if (electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameBn)
                            nameStr += "(" + electionSeat.upazilla.nameBn + ")";
                          if (electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameBn)
                            nameStr += "(" + electionSeat.union.nameBn + ")";
                        }
                        else {
                          nameFld = electionSeat.seatNameEn;
                          //if (electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameEn)
                          //  nameStr += "(" + electionSeat.division.nameEn + ")";
                          if (electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameEn)
                            nameStr += "(" + electionSeat.district.nameEn + ")";
                          if (electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameEn)
                            nameStr += "(" + electionSeat.upazilla.nameEn + ")";
                          if (electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameEn)
                            nameStr += "(" + electionSeat.union.nameEn + ")";
                        }


                        return {
                          name: nameFld + " " + nameStr,
                          value: electionSeat.id
                        };
                      });

                      if ($scope.to.options.length) {
                        if ($rootScope.locale.lang == "bn_BD") {
                          $scope.to.options.unshift({name: "সব", value: "-1"});
                        } else {
                          $scope.to.options.unshift({name: "All", value: "-1"});
                        }
                      }

                    })
                    //}
                  });
                }
              }
            ]
          }
        ];
      };
      this.getFormFilterForComparisonTable = function (elections, currentElections, divisions, electionSeat) {

        var electionOptions = elections.map(function (election) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = election.nameBn;
          else
            nameFld = election.nameEn;
          return {
            name: nameFld,
            value: election.id
          };
        });

        var divisionOptions = divisions.map(function (division) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = division.nameBn;
          else
            nameFld = division.nameEn;
          return {
            name: nameFld,
            value: division.id
          };
        });

        var currentElectionOptions = [];//currentElections.map(function (currentElection) {
        //  var nameFld = '';
        //  if ($rootScope.locale.lang == "bn_BD")
        //    nameFld = $filter('date')(currentElection.electionDate, "dd/MM/yyyy") + " - " + currentElection.currentElectionNameBn;
        //  else
        //    nameFld = $filter('date')(currentElection.electionDate, "dd/MM/yyyy") + " - " + currentElection.currentElectionNameEn;
        //
        //  return {
        //    name: nameFld,
        //    value: currentElection.id
        //  };
        //});


        if ($rootScope.locale.lang == "bn_BD")
          var candidateTypeOptions = [
            {name: 'সম্ভাব্য', value: "possible"},
            {name: 'চূড়ান্ত প্রার্থী', value: "eligible"},
            {name: 'প্রত্যাহারকৃত', value: "withdrawn"},
            {name: 'নির্বাচিত', value: "elected"},
            {name: 'অনির্বাচিত', value: "notelected"}
          ];
        else
          var candidateTypeOptions = [
            {name: 'Possible', value: "possible"},
            {name: 'Eligible', value: "eligible"},
            {name: 'Withdrawn', value: "withdrawn"},
            {name: 'Elected', value: "elected"},
            {name: 'Notelected', value: "notelected"}
          ];

        if ($rootScope.locale.lang == "bn_BD") {
          divisionOptions.unshift({name: "সব", value: "-1"});
          candidateTypeOptions.unshift({name: "সব", value: "-1"});
        } else {
          divisionOptions.unshift({name: "All", value: "-1"});
          candidateTypeOptions.unshift({name: "All", value: "-1"});
        }


        return [
          {
            className: 'row',
            fieldGroup: [
              {
                className: 'col-md-3',
                key: 'electionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Election'),
                  required: true,
                  options: electionOptions
                },


              },
              {
                className: 'col-md-3',
                key: 'currentElectionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Current Election'),
                  required: true,
                  options: currentElectionOptions
                },
                controller: function ($scope, CurrentElectionsServiceForCA) {
                  //when current election change then
                  $scope.$watch('model.electionId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      CurrentElectionsServiceForCA.getCurrentElections(newValue).then(function (currentElections) {
                        //console.log(currentElections);
                        $scope.to.options = currentElections.map(function (currentElection) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = currentElection.currentElectionNameBn;
                          else
                            nameFld = currentElection.currentElectionNameEn;
                          return {
                            name: nameFld,
                            value: currentElection.id
                          };
                        });
                      });
                    }
                  });
                }
              },
              {
                className: 'col-md-3',
                key: 'electionCandidatePostId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Post'),
                  options: []
                },
                controller: function ($scope, ElectionCandidatePostsServiceForCA) {

                  //console.log(electionSeat);

                  //set initially
                  if (electionSeat.hasOwnProperty("currentElectionId") && electionSeat.currentElectionId) {
                    ElectionCandidatePostsServiceForCA.getCandidatePostsByCurrentElection(electionSeat).then(function (electionCandidatePosts) {
                      // console.log(electionCandidatePosts.length);
                      $scope.to.options = electionCandidatePosts.map(function (electionCandidatePost) {

                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = electionCandidatePost.postNameBn;
                        else
                          nameFld = electionCandidatePost.postNameEn;

                        return {
                          name: nameFld,
                          value: electionCandidatePost.id
                        };
                      });
                    });
                  }

                  //when current election change then
                  $scope.$watchCollection('[model.currentElectionId,model.districtId,model.upazillaId,model.unionId]', function (newValues, oldValues) {
                    $scope.$watch('model.currentElectionId', function (newValue, oldValue, theScope) {
                      if (newValue !== oldValue) {
                        if ($scope.model[$scope.options.key] && oldValue) {
                          $scope.model[$scope.options.key] = '';
                        }
                        //console.log($scope.model);
                        ElectionCandidatePostsServiceForCA.getCandidatePostsByCurrentElection($scope.model).then(function (electionCandidatePosts) {
                          $scope.to.options = electionCandidatePosts.map(function (electionCandidatePost) {

                            var nameFld = '';

                            if ($rootScope.locale.lang == "bn_BD") {
                              nameFld = electionCandidatePost.postNameBn;
                            }
                            else {
                              nameFld = electionCandidatePost.postNameEn;
                            }
                            return {
                              name: nameFld,
                              value: electionCandidatePost.id
                            };
                          });

                          if ($scope.to.options.length) {
                            if ($rootScope.locale.lang == "bn_BD") {
                              $scope.to.options.unshift({name: "সব", value: "-1"});
                            } else {
                              $scope.to.options.unshift({name: "All", value: "-1"});
                            }
                          }

                        });

                      }
                    });
                  });
                }
              },
              {
                className: 'col-md-3',
                key: 'candidateType',
                type: 'select',
                defaultValue:'eligible',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Type'),
                  options: candidateTypeOptions
                }
              },
              {
                className: 'col-md-3',
                key: 'divisionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Division'),
                  required: true,
                  options: divisionOptions
                }
              },
              {
                className: 'col-md-3',
                key: 'districtId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('District'),
                  required: true,
                  options: []
                },
                controller: function ($scope, DistrictsServiceForSeats) {

                  //set initially
                  if (electionSeat && electionSeat.hasOwnProperty("divisionId") && electionSeat.divisionId) {
                    DistrictsServiceForSeats.getDistrictsByDivision(electionSeat.divisionId).then(function (districts) {
                      //console.log(districts);
                      $scope.to.options = districts.map(function (district) {
                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = district.nameBn;
                        else
                          nameFld = district.nameEn;
                        return {
                          name: nameFld,
                          value: district.id
                        };
                      });

                      if ($scope.to.options.length) {
                        if ($rootScope.locale.lang == "bn_BD") {
                          $scope.to.options.unshift({name: "সব", value: "-1"});
                        } else {
                          $scope.to.options.unshift({name: "All", value: "-1"});
                        }
                      }

                    });
                  }

                  //when current election change then
                  $scope.$watch('model.divisionId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      DistrictsServiceForSeats.getDistrictsByDivision(newValue).then(function (districts) {
                        //console.log(districts);
                        $scope.to.options = districts.map(function (district) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = district.nameBn;
                          else
                            nameFld = district.nameEn;
                          return {
                            name: nameFld,
                            value: district.id
                          };
                        });

                        if ($scope.to.options.length) {
                          if ($rootScope.locale.lang == "bn_BD") {
                            $scope.to.options.unshift({name: "সব", value: "-1"});
                          } else {
                            $scope.to.options.unshift({name: "All", value: "-1"});
                          }
                        }

                      });
                    }
                  });

                }
              },
              {
                className: 'col-md-3',
                key: 'upazillaId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Upazilla/City Corporation/Municipality'),
                  options: []
                },
                controller: function ($scope, UpazillasServiceForSeats) {

                  //set initially
                  if (electionSeat && electionSeat.hasOwnProperty("districtId") && electionSeat.districtId) {
                    UpazillasServiceForSeats.getUpazillasByDistrict(electionSeat.districtId).then(function (upazillas) {
                      //console.log(upazillas);
                      $scope.to.options = upazillas.map(function (upazilla) {
                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = upazilla.nameBn + " (" + upazilla.regionType + ")";
                        else
                          nameFld = upazilla.nameEn + " (" + upazilla.regionType + ")";

                        return {
                          name: nameFld,
                          value: upazilla.id
                        };
                      });

                      if ($scope.to.options.length) {
                        if ($rootScope.locale.lang == "bn_BD") {
                          $scope.to.options.unshift({name: "সব", value: "-1"});
                        } else {
                          $scope.to.options.unshift({name: "All", value: "-1"});
                        }
                      }

                    });
                  }

                  //when current election change then
                  $scope.$watch('model.districtId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      UpazillasServiceForSeats.getUpazillasByDistrict(newValue).then(function (upazillas) {
                        //console.log(upazillas);
                        $scope.to.options = upazillas.map(function (upazilla) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = upazilla.nameBn + " (" + upazilla.regionType + ")";
                          else
                            nameFld = upazilla.nameEn + " (" + upazilla.regionType + ")";

                          return {
                            name: nameFld,
                            value: upazilla.id
                          };
                        });
                        if ($scope.to.options.length) {
                          if ($rootScope.locale.lang == "bn_BD") {
                            $scope.to.options.unshift({name: "সব", value: "-1"});
                          } else {
                            $scope.to.options.unshift({name: "All", value: "-1"});
                          }
                        }
                      });
                    }
                  });
                }
              },
              {
                className: 'col-md-3',
                key: 'unionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Union'),
                  options: []
                },
                controller: function ($scope, UnionsServiceForSeats, ElectionsServiceForES) {

                  //set initially
                  if (electionSeat && electionSeat.hasOwnProperty("upazillaId") && electionSeat.upazillaId) {
                    UnionsServiceForSeats.getUnionsByUpazilla(electionSeat.upazillaId).then(function (unions) {
                      //console.log(unions);
                      $scope.to.options = unions.map(function (union) {
                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = union.nameBn + " (" + union.regionType + ")";
                        else
                          nameFld = union.nameEn + " (" + union.regionType + ")";

                        return {
                          name: nameFld,
                          value: union.id
                        };
                      });

                      if ($scope.to.options.length) {
                        if ($rootScope.locale.lang == "bn_BD") {
                          $scope.to.options.unshift({name: "সব", value: "-1"});
                        } else {
                          $scope.to.options.unshift({name: "All", value: "-1"});
                        }
                      }

                    });
                  }

                  //when current election change then
                  $scope.$watch('model.upazillaId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      UnionsServiceForSeats.getUnionsByUpazilla(newValue).then(function (unions) {
                        //console.log(unions);
                        $scope.to.options = unions.map(function (union) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = union.nameBn + " (" + union.regionType + ")";
                          else
                            nameFld = union.nameEn + " (" + union.regionType + ")";

                          return {
                            name: nameFld,
                            value: union.id
                          };
                        });

                        if ($scope.to.options.length) {
                          if ($rootScope.locale.lang == "bn_BD") {
                            $scope.to.options.unshift({name: "সব", value: "-1"});
                          } else {
                            $scope.to.options.unshift({name: "All", value: "-1"});
                          }
                        }

                      });
                    }
                  });


                  //$scope.$watch('model.electionId', function (newValue, oldValue, theScope) {
                  //  console.log('theScope');
                  //  console.log(theScope);
                  //  if (newValue !== oldValue) {
                  //    ElectionsServiceForES.getElection(newValue).then(function (election) {
                  //      console.log(election);
                  //      if(election && (election.electionType == 'national' || election.electionType == 'city-corporation' || election.electionType == 'municipal'))
                  //        $scope.options.hide=true;
                  //      else
                  //        $scope.options.hide=false;
                  //    });
                  //  }
                  //});

                },
                //hideExpression:'false',

              },
              {
                className: 'col-md-12',
                key: 'electionSeatId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Election Seat'),
                  required: true,
                  options: []
                },
                controller: function ($scope, ElectionSeatsServiceForCandidate) {

                  //console.log(electionSeat);

                  //set initially
                  ElectionSeatsServiceForCandidate.getElectionSeatsWhere(electionSeat).then(function (electionSeats) {
                    //console.log(electionSeats.length);
                    $scope.to.options = electionSeats.map(function (electionSeat) {

                      var nameFld = '';
                      if ($rootScope.locale.lang == "bn_BD")
                        nameFld = electionSeat.seatNameBn;
                      else
                        nameFld = electionSeat.seatNameEn;


                      var nameStr = "";
                      if (electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameBn)
                        nameStr += "(" + electionSeat.division.nameBn + ")";
                      if (electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameBn)
                        nameStr += "(" + electionSeat.district.nameBn + ")";
                      if (electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameBn)
                        nameStr += "(" + electionSeat.upazilla.nameBn + ")";
                      if (electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameBn)
                        nameStr += "(" + electionSeat.union.nameBn + ")";
                      return {
                        name: nameFld + " " + nameStr,
                        value: electionSeat.id
                      };
                    });

                    if ($scope.to.options.length) {
                      if ($rootScope.locale.lang == "bn_BD") {
                        $scope.to.options.unshift({name: "সব", value: "-1"});
                      } else {
                        $scope.to.options.unshift({name: "All", value: "-1"});
                      }
                    }

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
                    ElectionSeatsServiceForCandidate.getElectionSeatsWhere($scope.model).then(function (electionSeats) {
                      //console.log(electionSeats)
                      $scope.to.options = electionSeats.map(function (electionSeat) {

                        var nameFld = '';
                        var nameStr = "";

                        if ($rootScope.locale.lang == "bn_BD") {
                          nameFld = electionSeat.seatNameBn;
                          //if (electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameBn)
                          //  nameStr += "(" + electionSeat.division.nameBn + ")";
                          if (electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameBn)
                            nameStr += "(" + electionSeat.district.nameBn + ")";
                          if (electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameBn)
                            nameStr += "(" + electionSeat.upazilla.nameBn + ")";
                          if (electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameBn)
                            nameStr += "(" + electionSeat.union.nameBn + ")";
                        }
                        else {
                          nameFld = electionSeat.seatNameEn;
                          //if (electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameEn)
                          //  nameStr += "(" + electionSeat.division.nameEn + ")";
                          if (electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameEn)
                            nameStr += "(" + electionSeat.district.nameEn + ")";
                          if (electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameEn)
                            nameStr += "(" + electionSeat.upazilla.nameEn + ")";
                          if (electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameEn)
                            nameStr += "(" + electionSeat.union.nameEn + ")";
                        }


                        return {
                          name: nameFld + " " + nameStr,
                          value: electionSeat.id
                        };
                      });

                      if ($scope.to.options.length) {
                        if ($rootScope.locale.lang == "bn_BD") {
                          $scope.to.options.unshift({name: "সব", value: "-1"});
                        } else {
                          $scope.to.options.unshift({name: "All", value: "-1"});
                        }
                      }

                    })
                    //}
                  });
                }
              }
            ]
          }
        ];
      };

      this.getFormFilterForComparison = function (elections, currentElections, politicalParties, divisions, electionSeat) {

        var electionOptions = elections.map(function (election) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = election.nameBn;
          else
            nameFld = election.nameEn;
          return {
            name: nameFld,
            value: election.id
          };
        });

        var politicalPartyOptions = politicalParties.map(function (politicalParty) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = politicalParty.partyNameBn;
          else
            nameFld = politicalParty.partyNameEn;
          return {
            name: nameFld,
            value: politicalParty.id
          };
        });

        var divisionOptions = divisions.map(function (division) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = division.nameBn;
          else
            nameFld = division.nameEn;
          return {
            name: nameFld,
            value: division.id
          };
        });

        var currentElectionOptions = [];
        //currentElections.map(function (currentElection) {
        //  var nameFld = '';
        //  if ($rootScope.locale.lang == "bn_BD")
        //    nameFld = $filter('date')(currentElection.electionDate, "MM/yyyy");
        //  else
        //    nameFld = $filter('date')(currentElection.electionDate, "MM/yyyy");
        //
        //  return {
        //    name: nameFld,
        //    value: currentElection.id
        //  };
        //});

        if ($rootScope.locale.lang == "bn_BD")
          var candidateTypeOptions = [
            {name: 'সম্ভাব্য', value: "possible"},
            {name: 'চূড়ান্ত প্রার্থী', value: "eligible"},
            {name: 'প্রত্যাহারকৃত', value: "withdrawn"},
            {name: 'নির্বাচিত', value: "elected"},
            {name: 'অনির্বাচিত', value: "notelected"}
          ];
        else
          var candidateTypeOptions = [
            {name: 'Possible', value: "possible"},
            {name: 'Eligible', value: "eligible"},
            {name: 'Withdrawn', value: "withdrawn"},
            {name: 'Elected', value: "elected"},
            {name: 'Notelected', value: "notelected"}
          ];

        if ($rootScope.locale.lang == "bn_BD") {
          divisionOptions.unshift({name: "সব", value: "-1"});
          candidateTypeOptions.unshift({name: "সব", value: "-1"});
          politicalPartyOptions.unshift({name: "সব", value: "-1"});
        } else {
          divisionOptions.unshift({name: "All", value: "-1"});
          candidateTypeOptions.unshift({name: "All", value: "-1"});
          politicalPartyOptions.unshift({name: "All", value: "-1"});
        }

        return [
          {
            className: 'row',
            fieldGroup: [
              {
                className: 'col-md-12',
                key: 'electionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Election'),
                  required: true,
                  options: electionOptions
                },
                //hideExpression : "true",

              },
              {
                className: 'col-md-12',
                key: 'currentElectionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Election Year First'),
                  required: true,
                  options: currentElectionOptions
                },
                controller: function ($scope, CurrentElectionsServiceForCA) {
                  //when current election change then
                  $scope.$watch('model.electionId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      CurrentElectionsServiceForCA.getCurrentElections(newValue).then(function (currentElections) {
                        //console.log(currentElections);
                        $scope.to.options = currentElections.map(function (currentElection) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = $filter('date')(currentElection.electionDate, "yyyy") + '-' +currentElection.currentElectionNameBn;
                          else
                            nameFld = $filter('date')(currentElection.electionDate, "yyyy") + '-' +currentElection.currentElectionNameEn;
                          return {
                            name: nameFld,
                            value: currentElection.id
                          };
                        });
                      });
                    }
                  });
                }
              },
              {
                className: 'col-md-12',
                key: 'currentElectionId2',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Election Year Second'),
                  required: true,
                  options: currentElectionOptions
                },
                controller: function ($scope, CurrentElectionsServiceForCA) {
                  //when current election change then
                  $scope.$watch('model.electionId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      CurrentElectionsServiceForCA.getCurrentElections(newValue).then(function (currentElections) {
                        //console.log(currentElections);
                        $scope.to.options = currentElections.map(function (currentElection) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = $filter('date')(currentElection.electionDate, "yyyy") + '-' +currentElection.currentElectionNameBn;
                          else
                            nameFld = $filter('date')(currentElection.electionDate, "yyyy") + '-' +currentElection.currentElectionNameEn;
                          return {
                            name: nameFld,
                            value: currentElection.id
                          };
                        });
                      });
                    }
                  });
                }
              },
              {
                className: 'col-md-12',
                key: 'currentElectionId3',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Election Year Third'),
                  required: true,
                  options: currentElectionOptions
                },
                controller: function ($scope, CurrentElectionsServiceForCA) {
                  //when current election change then
                  $scope.$watch('model.electionId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      CurrentElectionsServiceForCA.getCurrentElections(newValue).then(function (currentElections) {
                        //console.log(currentElections);
                        $scope.to.options = currentElections.map(function (currentElection) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = $filter('date')(currentElection.electionDate, "yyyy") + '-' +currentElection.currentElectionNameBn;
                          else
                            nameFld = $filter('date')(currentElection.electionDate, "yyyy") + '-' +currentElection.currentElectionNameEn;
                          return {
                            name: nameFld,
                            value: currentElection.id
                          };
                        });
                      });
                    }
                  });
                }
              },
              {
                className: 'col-md-12',
                key: 'currentElectionId4',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Election Year Fourth'),
                  required: true,
                  options: currentElectionOptions
                },
                controller: function ($scope, CurrentElectionsServiceForCA) {
                  //when current election change then
                  $scope.$watch('model.electionId', function (newValue, oldValue, theScope) {
                    if (newValue !== oldValue) {
                      if ($scope.model[$scope.options.key] && oldValue) {
                        // reset this select
                        $scope.model[$scope.options.key] = '';
                      }
                      CurrentElectionsServiceForCA.getCurrentElections(newValue).then(function (currentElections) {
                        //console.log(currentElections);
                        $scope.to.options = currentElections.map(function (currentElection) {
                          var nameFld = '';
                          if ($rootScope.locale.lang == "bn_BD")
                            nameFld = $filter('date')(currentElection.electionDate, "yyyy") + '-' +currentElection.currentElectionNameBn;
                          else
                            nameFld = $filter('date')(currentElection.electionDate, "yyyy") + '-' +currentElection.currentElectionNameEn;
                          return {
                            name: nameFld,
                            value: currentElection.id
                          };
                        });
                      });
                    }
                  });
                }
              },
              {
                className: 'col-md-12',
                key: 'politicalPartyId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Political Party'),
                  options: politicalPartyOptions
                }
              },
              {
                className: 'col-md-12',
                key: 'constitutionalPostId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Post'),
                  options: []
                },
                controller: function ($scope, ConstitutionalPostsService) {

                  //console.log(electionSeat);

                  //set initially
                  if (electionSeat.hasOwnProperty("currentElectionId") && electionSeat.currentElectionId) {
                    ConstitutionalPostsService.getConstitutionalPosts(electionSeat).then(function (constitutionalPosts) {
                      $scope.to.options = constitutionalPosts.map(function (constitutionalPost) {
                        console.log(constitutionalPosts);

                        var nameFld = '';
                        if ($rootScope.locale.lang == "bn_BD")
                          nameFld = constitutionalPost.constitutionalPostNameBn;
                        else
                          nameFld = constitutionalPost.constitutionalPostNameEn;

                        return {
                          name: nameFld,
                          value: constitutionalPost.id
                        };
                      });
                    });
                  }

                  //when current election change then
                  $scope.$watchCollection('[model.currentElectionId,model.districtId,model.upazillaId,model.unionId]', function (newValues, oldValues) {
                    $scope.$watch('model.currentElectionId', function (newValue, oldValue, theScope) {
                      if (newValue !== oldValue) {
                        if ($scope.model[$scope.options.key] && oldValue) {
                          $scope.model[$scope.options.key] = '';
                        }
                        //console.log($scope.model);
                        ConstitutionalPostsService.getConstitutionalPosts($scope.model).then(function (constitutionalPosts) {
                          $scope.to.options = constitutionalPosts.map(function (constitutionalPost) {
                            var nameFld = '';

                            if ($rootScope.locale.lang == "bn_BD") {
                              nameFld = constitutionalPost.constitutionalPostNameBn;
                            }
                            else {
                              nameFld = constitutionalPost.constitutionalPostNameEn;
                            }
                            return {
                              name: nameFld,
                              value: constitutionalPost.id
                            };
                          });

                          if ($scope.to.options.length) {
                            if ($rootScope.locale.lang == "bn_BD") {
                              $scope.to.options.unshift({name: "সব", value: "-1"});
                            } else {
                              $scope.to.options.unshift({name: "All", value: "-1"});
                            }
                          }

                        });

                      }
                    });
                  });
                }
              },
              {
                className: 'col-md-12',
                key: 'candidateType',
                type: 'select',
                defaultValue:'eligible',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Type'),
                  options: candidateTypeOptions
                }
              }
            ]
          }
        ];
      };
    });

})();
