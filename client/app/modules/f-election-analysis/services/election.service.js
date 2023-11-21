(function () {
  'use strict';
  angular
    .module('com.module.fElectionAnalysis')
    .service('ElectionAnalysisService', function (CoreService, Candidate,PoliticalPartyExpense, $filter, gettextCatalog, $rootScope) {
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

        if (criteria.hasOwnProperty("politicalPartyId") && criteria.politicalPartyId) {
          if (criteria.politicalPartyId !== '-1') {
            whereCriteria.politicalPartyId = criteria.politicalPartyId;
          }

        } else {
          //return false;
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
      this.verifyFilterDataForComparison = function (criteria) {

        var whereCriteria = {};
        if (criteria.hasOwnProperty("currentElectionId") && criteria.currentElectionId){
          whereCriteria.currentElectionId = criteria.currentElectionId;
        }else{
          return false;
        }

        if (criteria.hasOwnProperty("currentElectionId2") && criteria.currentElectionId2){
          whereCriteria.currentElectionId2 = criteria.currentElectionId2;
        }else{
          return false;
        }

        if (criteria.hasOwnProperty("currentElectionId3") && criteria.currentElectionId3){
          whereCriteria.currentElectionId3 = criteria.currentElectionId3;
        }else{
          //return false;
        }

        if (criteria.hasOwnProperty("politicalPartyId") && criteria.politicalPartyId) {
          if (criteria.politicalPartyId !== '-1') {
            whereCriteria.politicalPartyId = criteria.politicalPartyId;
          }

        } else {
          //return false;
        }

        if (criteria.hasOwnProperty("constitutionalPostId") && criteria.constitutionalPostId) {
          if (criteria.electionCandidatePostId !== '-1') {
            whereCriteria.constitutionalPostId = criteria.constitutionalPostId;
          }
        } else {

        }

        if (criteria.hasOwnProperty("candidateType") && criteria.candidateType) {
          if(criteria.candidateType!=='-1'){
            if (criteria.candidateType === 'possible' || criteria.candidateType === 'eligible' || criteria.candidateType === 'withdrawn') {
              whereCriteria.candidateType = criteria.candidateType;
            } else if (criteria.candidateType === 'elected' || criteria.candidateType === 'notelected') {
              whereCriteria.resultType = criteria.candidateType;
              whereCriteria.candidateType = 'eligible';
            }  
          }
        } else {

        }

        return whereCriteria;
      };

      this.getEERB = function (electionSeatCriteria, limit, type) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getEERB({whereCriteria: whereCriteria, limit: limit, type: $rootScope.locale.lang}
        ).$promise;
      };
      this.getEERBDidNotSubmitReturn = function (electionSeatCriteria, limit, type) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getEERBDidNotSubmitReturn({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getEERBCountSubmitReturn = function (electionSeatCriteria, limit, type) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getEERBCountSubmitReturn({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
           }
        ).$promise;
      };
      this.getEERBMoneySpentForCampaigning = function (electionSeatCriteria, limit, type) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getEERBMoneySpentForCampaigning({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getEERBCase = function (electionSeatCriteria, limit, type) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getEERBCase({whereCriteria: whereCriteria, limit: limit, type: $rootScope.locale.lang}
        ).$promise;
      };
      this.getEERBMoneySpentMoreThanSpendingLimit = function (electionSeatCriteria, limit, type) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getEERBMoneySpentMoreThanSpendingLimit({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getEERBRangeWiseMoneySpent = function (electionSeatCriteria, limit, type) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getEERBRangeWiseMoneySpent({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getEERBComparisonMoneySpentAmount = function (electionSeatCriteria, limit, type) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getEERBComparisonMoneySpentAmount({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getEERBComparisonMoneySpentPercentage = function (electionSeatCriteria, limit, type) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getEERBComparisonMoneySpentPercentage({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getEERBComparisonGender = function (electionSeatCriteria, limit, type) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getEERBComparisonGender({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getALIE = function (electionSeatCriteria, limit, for_what) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getALIE({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang,
            for_what: for_what
          }
        ).$promise;
      };
      this.getDiscrepancy = function (electionSeatCriteria, limit, for_what) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getDiscrepancy({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang,
            for_what: for_what
          }
        ).$promise;
      };
      this.getALIEComparison = function (electionSeatCriteria, limit, for_what) {
        var whereCriteria = this.verifyFilterDataForComparison(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getALIEComparison({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang,
            for_what: for_what
          }
        ).$promise;
      };
      this.getCandidateUnionPerson = function (electionSeatCriteria, limit, for_what) {
        var whereCriteria = this.verifyFilterDataForComparison(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getCandidateUnionPerson({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang,
            for_what: for_what
          }
        ).$promise;
      };
      this.getSingleCandidateReportYearWise = function (row, limit, for_what) {
        //var whereCriteria = this.verifyFilterDataForComparison(electionSeatCriteria);
        //console.log(limit);

        return Candidate.getSingleCandidateReportYearWise({
            whereCriteria: row,
            limit: limit,
            type: $rootScope.locale.lang,
            for_what: for_what
          }
        ).$promise;
      };
      this.getCandidateAffidavitComparison = function (electionSeatCriteria, limit, for_what) {
        var whereCriteria = this.verifyFilterDataForComparison(electionSeatCriteria);
        // console.log(electionSeatCriteria);

        return Candidate.getCandidateAffidavitComparison({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang,
            for_what: for_what
          }
        ).$promise;
      };
      this.getCandidatePfseComparison = function (electionSeatCriteria, limit, for_what) {
        var whereCriteria = this.verifyFilterDataForComparison(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getCandidatePfseComparison({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang,
            for_what: for_what
          }
        ).$promise;
      };
      this.getPolitycalParty= function (electionSeatCriteria, limit, for_what) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);

        return PoliticalPartyExpense.find({}
        ).$promise;
      };

      this.getFormFilter = function (elections, currentElections, divisions, electionSeat) {

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

        var currentElectionOptions = currentElections.map(function (currentElection) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = $filter('date')(currentElection.electionDate, "dd/MM/yyyy") + " - " + currentElection.currentElectionNameBn;
          else
            nameFld = $filter('date')(currentElection.electionDate, "dd/MM/yyyy") + " - " + currentElection.currentElectionNameEn;

          return {
            name: nameFld,
            value: currentElection.id
          };
        });

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
                className: 'col-xs-3',
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
                className: 'col-xs-3',
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
                className: 'col-xs-3',
                key: 'electionCandidatePostId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Post'),
                  required: true,
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
                className: 'col-xs-3',
                key: 'candidateType',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Type'),
                  options: candidateTypeOptions
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
                className: 'col-xs-3',
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
                className: 'col-xs-3',
                key: 'unionId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Union'),
                  options: []
                },
                controller: function ($scope, UnionsServiceForSeats) {

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
                }
              },
              {
                className: 'col-xs-12',
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
    });

})();
