(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .service('CandidatesService', function ($rootScope, CoreService, Candidate, gettextCatalog, $filter) {

      this.getCandidates = function () {
        return Candidate.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getCandidatesWhere = function (electionSeatCriteria) {
        var whereCriteria={};

        // console.log(electionSeatCriteria);

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
            fields:['id','personNameEn','personNameBn','candidateNameBnAF','statusAF','statusFSEE','statusALIE','statusEER','statusTR','fatherHusbandNameBnAF','addressBnAF', 'isPublished','isFeatured', 'resultType'],
            order: 'created DESC',
            where: whereCriteria
          }
        }).$promise;
      };

      this.getCandidatesWherePerson = function (electionSeatCriteria) {
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

        if(electionSeatCriteria.hasOwnProperty("electionSeatId") && electionSeatCriteria.electionSeatId)
          whereCriteria.electionSeatId = electionSeatCriteria.electionSeatId;

        if(electionSeatCriteria.hasOwnProperty("personId") && electionSeatCriteria.personId)
          whereCriteria.personId = electionSeatCriteria.personId;

        // console.log(electionSeatCriteria);
        // console.log(whereCriteria);

        return Candidate.find({
          filter: {
            fields:['personNameBn','personNameEn','fatherHusbandNameBnAF','addressBnAF','candidateNameBnAF','candidateNameEnAF','statusAF','statusFSEE','statusALIE','statusEER','statusTR'],
            order: 'created DESC',
            where: whereCriteria
          }
        }).$promise;
      };

      this.updateCandidatewhere=function(id, newId){
        // console.log(id);
        return Candidate.updateCandidate(id,newId).$promise
      }


      this.getCandidate = function (id) {
        //console.log(id);
        return Candidate.findById({
            id: id
        }).$promise;
      };

      this.getCandidate2 = function (id) {
        //console.log(id);
        return Candidate.findById({
            id: id,
          filter:{
                  include:'currentElection'
                }
        }).$promise;
      };

      this.upsertCandidate = function (candidate) {

        // console.log(candidate);
          function formatDate(date = new Date()) {
            const year = date.toLocaleString("default", { year: "numeric" });
            const month = date.toLocaleString("default", {
              month: "2-digit",
            });
            const day = date.toLocaleString("default", { day: "2-digit" });

            return [day,month, year].join("-");
          }
          var formattedDate = null;
          if (candidate.dobTR) {
            formattedDate = formatDate(new Date(candidate.dobTR));
          }
          candidate.candidateDateOfBirthBnAF = formattedDate;
        return Candidate.upsert(candidate).$promise;

      };

      this.deleteCandidate = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Candidate.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Candidate deleted'),
                gettextCatalog.getString('Your Candidate is deleted!'),
                gettextCatalog.getString('Please refresh the page or press Find Candidate button again to see the change'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Candidate'),
                gettextCatalog.getString('Your Candidate is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function (newCandidate,constitutionalPosts,politicalParties) {

        var constitutionalPostOptions = constitutionalPosts.map(function (constitutionalPost) {
          return {
            name: constitutionalPost.constitutionalPostNameBn,
            value: constitutionalPost.id
          };
        });

        var politicalPartyOptions = politicalParties.map(function (politicalParty) {
          return {
            name: politicalParty.partyNameBn,
            value: politicalParty.id
          };
        });

        return [
          {
            className: 'row',
            fieldGroup: [

              {

                className: 'col-md-4',
                key: 'personNameBn',
                type: 'input',
                defaultValue: newCandidate.personNameBn,
                templateOptions: {
                  label: gettextCatalog.getString('Person Name (Bangla)'),
                  required: true
                }
              },
              {
                className: 'col-md-4',
                key: 'personNameEn',
                type: 'input',
                defaultValue: newCandidate.personNameBn,
                templateOptions: {
                  label: gettextCatalog.getString('Person Name (English)'),
                  required: true
                }
              },
              {
                className: 'col-md-4',
                key: 'fatherNameBn',
                type: 'input',
                defaultValue: newCandidate.fatherNameBn,
                templateOptions: {
                  label: gettextCatalog.getString('Father Name (Bangla)'),
                  required: true
                }
              },
              {
                className: 'col-md-4',
                key: 'fatherNameEn',
                type: 'input',
                defaultValue: newCandidate.fatherNameBn,
                templateOptions: {
                  label: gettextCatalog.getString('Father Name (English)'),
                  required: true
                }
              },
              {
                className: 'col-md-4',
                key: 'candidateType',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Type'),
                  required: true,
                  options: [
                    {name: 'সম্ভাব্য', value: "possible"},
                    {name: 'চূড়ান্ত প্রার্থী', value: "eligible"},
                    {name: 'প্রত্যাহারকৃত', value: "withdrawn"}
                  ]
                }
              },
              {
                className: 'col-md-4',
                key: 'resultType',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Result Type'),
                  required: true,
                  options: [
                    {name: 'নির্বাচিত', value: "elected"},
                    {name: 'অনির্বাচিত', value: "notelected"}
                  ]
                }
              },
              {
                className: 'col-md-4',
                key: 'electionCandidatePostId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Post'),
                  required: true,
                  options: []
                },
                controller: function ($scope, ElectionCandidatePostsServiceForCA) {

                  //console.log(newCandidate);

                  //set initially
                  if (newCandidate.hasOwnProperty("currentElectionId") && newCandidate.currentElectionId) {
                    ElectionCandidatePostsServiceForCA.getCandidatePostsByCurrentElection(newCandidate).then(function (electionCandidatePosts) {
                      //console.log(electionCandidatePosts.length);
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
                className: 'col-md-4',
                key: 'genderBn',
                type: 'select',
                defaultValue: newCandidate.genderBn,
                templateOptions: {
                  label: 'Gender (Bangla)',
                  options: [
                    {name: 'পুরুষ', value: 'পুরুষ'},
                    {name: 'মহিলা', value: 'মহিলা'}
                  ],
                  required: true
                }
              },
              {
                className: 'col-md-4',
                key: 'politicalPartyId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Political Party'),
                  required: true,
                  options: politicalPartyOptions
                }
              },
              {
                className: 'col-md-4',
                key: 'constitutionalPostId',
                type: 'select',
                defaultValue: newCandidate.constitutionalPostId,
                templateOptions: {
                  label: gettextCatalog.getString('Constitutional Post'),
                  required: true,
                  options: constitutionalPostOptions
                }
              },
              {
                className: 'col-md-4',
                key: 'isPublished',
                type: 'select',
                templateOptions: {
                  label: 'Publish',
                  options: [
                    {name: 'Publish', value: true},
                    {name: 'draft', value: false}
                  ],
                  required: true
                }
              },
              {
                className: 'col-md-4',
                key: 'candidateVideoLink',
                type: 'input',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Video Link')
                }
              }
            ]
          }
          ];
      };

      //this.getFormFilter = function (currentElections,divisions,electionSeat) {
      //  var currentElectionOptions = currentElections.map(function (currentElection) {
      //    return {
      //      name: $filter('date')(currentElection.electionDate, "dd/MM/yyyy") +" - "+ currentElection.election.nameBn +" - "+ currentElection.currentElectionNameBn,
      //      value: currentElection.id
      //    };
      //  });
      //  var divisionOptions = divisions.map(function (division) {
      //    return {
      //      name: division.nameBn,
      //      value: division.id
      //    };
      //  });
      //  return [{
      //    className : 'row',
      //    fieldGroup : [
      //      //{
      //      //  className: 'col-xs-3',
      //      //  key: 'electionId',
      //      //  type: 'input',
      //      //  templateOptions: {
      //      //    label: gettextCatalog.getString('Election'),
      //      //    required: true
      //      //  },
      //      //  //hideExpression : "true",
      //      //
      //      //},
      //      {
      //        className: 'col-xs-4',
      //        key: 'currentElectionId',
      //        type: 'select',
      //        templateOptions: {
      //          label: gettextCatalog.getString('Current Election'),
      //          required: true,
      //          options: currentElectionOptions
      //        },
      //        controller: function($scope,CurrentElectionsServiceForES){
      //          //when current election change then
      //          $scope.$watch('model.currentElectionId', function (newValue, oldValue, theScope) {
      //            if(newValue !== oldValue) {
      //              CurrentElectionsServiceForES.getCurrentElection(newValue).then(function(currentElection){
      //                //console.log(currentElection);
      //                $scope.model.electionId = currentElection.election.id;
      //                //console.log($scope);
      //              });
      //            }
      //          });
      //        }
      //      },
      //      {
      //        className: 'col-xs-4',
      //        key: 'divisionId',
      //        type: 'select',
      //        templateOptions: {
      //          label: gettextCatalog.getString('Division'),
      //          required: true,
      //          options: divisionOptions
      //        }
      //      },
      //      {
      //        className: 'col-xs-4',
      //        key: 'districtId',
      //        type: 'select',
      //        templateOptions: {
      //          label: gettextCatalog.getString('District'),
      //          required: true,
      //          options: []
      //        },
      //        controller: function($scope,DistrictsServiceForSeats) {
      //
      //          //set initially
      //          if(electionSeat && electionSeat.hasOwnProperty("divisionId") && electionSeat.divisionId){
      //            DistrictsServiceForSeats.getDistrictsByDivision(electionSeat.divisionId).then(function(districts){
      //              //console.log(districts);
      //              $scope.to.options = districts.map(function (district) {
      //                return {
      //                  name:  district.nameBn + " - " +district.nameEn,
      //                  value: district.id
      //                };
      //              });
      //            });
      //          }
      //
      //          //when current election change then
      //          $scope.$watch('model.divisionId', function (newValue, oldValue, theScope) {
      //            if(newValue !== oldValue) {
      //              if($scope.model[$scope.options.key] && oldValue) {
      //                // reset this select
      //                $scope.model[$scope.options.key] = '';
      //              }
      //              DistrictsServiceForSeats.getDistrictsByDivision(newValue).then(function(districts){
      //                //console.log(districts);
      //                $scope.to.options = districts.map(function (district) {
      //                  return {
      //                    name:  district.nameBn + " - " +district.nameEn,
      //                    value: district.id
      //                  };
      //                });
      //              });
      //            }
      //          });
      //
      //        }
      //      },
      //      {
      //        className: 'col-xs-4',
      //        key: 'upazillaId',
      //        type: 'select',
      //        templateOptions: {
      //          label: gettextCatalog.getString('Upazilla/City Corporation/Municipality'),
      //          options: []
      //        },
      //        controller: function($scope,UpazillasServiceForSeats) {
      //
      //          //set initially
      //          if(electionSeat && electionSeat.hasOwnProperty("districtId") && electionSeat.districtId){
      //            UpazillasServiceForSeats.getUpazillasByDistrict(electionSeat.districtId).then(function(upazillas){
      //              //console.log(upazillas);
      //              $scope.to.options = upazillas.map(function (upazilla) {
      //                return {
      //                  name:  upazilla.nameBn + " - " +upazilla.nameEn + " ("+ upazilla.regionType+")",
      //                  value: upazilla.id
      //                };
      //              });
      //            });
      //          }
      //
      //          //when current election change then
      //          $scope.$watch('model.districtId', function (newValue, oldValue, theScope) {
      //            if(newValue !== oldValue) {
      //              if($scope.model[$scope.options.key] && oldValue) {
      //                // reset this select
      //                $scope.model[$scope.options.key] = '';
      //              }
      //              UpazillasServiceForSeats.getUpazillasByDistrict(newValue).then(function(upazillas){
      //                //console.log(upazillas);
      //                $scope.to.options = upazillas.map(function (upazilla) {
      //                  return {
      //                    name:  upazilla.nameBn + " - " +upazilla.nameEn + " ("+ upazilla.regionType+")",
      //                    value: upazilla.id
      //                  };
      //                });
      //              });
      //            }
      //          });
      //        }
      //      },
      //      {
      //        className: 'col-xs-4',
      //        key: 'unionId',
      //        type: 'select',
      //        templateOptions: {
      //          label: gettextCatalog.getString('Union/Municipality'),
      //          options: []
      //        },
      //        controller: function($scope,UnionsServiceForSeats) {
      //
      //          //set initially
      //          if(electionSeat && electionSeat.hasOwnProperty("upazillaId") && electionSeat.upazillaId){
      //            UnionsServiceForSeats.getUnionsByUpazilla(electionSeat.upazillaId).then(function(unions){
      //              //console.log(unions);
      //              $scope.to.options = unions.map(function (union) {
      //                return {
      //                  name:  union.nameBn + " - " +union.nameEn + " ("+ union.regionType+")",
      //                  value: union.id
      //                };
      //              });
      //            });
      //          }
      //
      //          //when current election change then
      //          $scope.$watch('model.upazillaId', function (newValue, oldValue, theScope) {
      //            if(newValue !== oldValue) {
      //              if($scope.model[$scope.options.key] && oldValue) {
      //                // reset this select
      //                $scope.model[$scope.options.key] = '';
      //              }
      //              UnionsServiceForSeats.getUnionsByUpazilla(newValue).then(function(unions){
      //                //console.log(unions);
      //                $scope.to.options = unions.map(function (union) {
      //                  return {
      //                    name:  union.nameBn + " - " +union.nameEn + " ("+ union.regionType+")",
      //                    value: union.id
      //                  };
      //                });
      //              });
      //            }
      //          });
      //        }
      //      },
      //      {
      //        className: 'col-xs-4',
      //        key: 'electionSeatId',
      //        type: 'select',
      //        templateOptions: {
      //          label: gettextCatalog.getString('Election Seat'),
      //          required: true,
      //          options: []
      //        },
      //        controller: function($scope,ElectionSeatsServiceForCandidate) {
      //
      //          //console.log(electionSeat);
      //
      //          //set initially
      //          ElectionSeatsServiceForCandidate.getElectionSeatsWhere(electionSeat).then(function(electionSeats){
      //            console.log(electionSeats.length);
      //            $scope.to.options = electionSeats.map(function (electionSeat) {
      //              var nameStr ="";
      //              if(electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameBn)
      //                nameStr += "(" + electionSeat.division.nameBn + ")";
      //              if(electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameBn)
      //                nameStr += "(" + electionSeat.district.nameBn + ")";
      //              if(electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameBn)
      //                nameStr += "(" + electionSeat.upazilla.nameBn + ")";
      //              if(electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameBn)
      //                nameStr += "(" + electionSeat.union.nameBn + ")";
      //              return {
      //                name:  electionSeat.seatNameBn + " " + nameStr,
      //                value: electionSeat.id
      //              };
      //            });
      //          })
      //
      //          //when current election change then
      //          $scope.$watchCollection('[model.currentElectionId,model.districtId,model.upazillaId,model.unionId]', function (newValues, oldValues) {
      //            //$scope.$watch('model.districtId', function (newValue, oldValue, theScope) {
      //            //  if(newValue !== oldValue) {
      //            //    if($scope.model[$scope.options.key] && oldValue) {
      //            //       reset this select
      //            //      $scope.model[$scope.options.key] = '';
      //            //}
      //            //console.log($scope.model);
      //            ElectionSeatsServiceForCandidate.getElectionSeatsWhere($scope.model).then(function(electionSeats){
      //              //console.log(electionSeats)
      //              $scope.to.options = electionSeats.map(function (electionSeat) {
      //                var nameStr ="";
      //                if(electionSeat.hasOwnProperty("division") && electionSeat.division.hasOwnProperty("nameBn") && electionSeat.division.nameBn)
      //                  nameStr += "(" + electionSeat.division.nameBn + ")";
      //                if(electionSeat.hasOwnProperty("district") && electionSeat.district.hasOwnProperty("nameBn") && electionSeat.district.nameBn)
      //                  nameStr += "(" + electionSeat.district.nameBn + ")";
      //                if(electionSeat.hasOwnProperty("upazilla") && electionSeat.upazilla.hasOwnProperty("nameBn") && electionSeat.upazilla.nameBn)
      //                  nameStr += "(" + electionSeat.upazilla.nameBn + ")";
      //                if(electionSeat.hasOwnProperty("union") && electionSeat.union.hasOwnProperty("nameBn") && electionSeat.union.nameBn)
      //                  nameStr += "(" + electionSeat.union.nameBn + ")";
      //                return {
      //                  name:  electionSeat.seatNameBn + " " + nameStr,
      //                  value: electionSeat.id
      //                };
      //              });
      //            })
      //            //}
      //          });
      //        }
      //      },
      //    ]
      //  }
      //  ] ;
      //};


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

        var currentElectionOptions = [];
        //currentElections.map(function (currentElection) {
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

        if ($rootScope.locale.lang == "bn_BD"){
          divisionOptions.unshift({name:"সব",value:"-1"});
          candidateTypeOptions.unshift({name:"সব",value:"-1"});
        }else{
          divisionOptions.unshift({name:"All",value:"-1"});
          candidateTypeOptions.unshift({name:"All",value:"-1"});
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

                  //set initially
                  if (electionSeat && electionSeat.hasOwnProperty("electionId") && electionSeat.electionId) {
                    CurrentElectionsServiceForCA.getCurrentElections(electionSeat.electionId).then(function (currentElections) {
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
                  options: []
                },
                controller: function ($scope, ElectionCandidatePostsServiceForCA) {

                  //console.log(electionSeat);

                  //set initially
                  if(electionSeat.hasOwnProperty("currentElectionId") && electionSeat.currentElectionId){
                    ElectionCandidatePostsServiceForCA.getCandidatePostsByCurrentElection(electionSeat).then(function (electionCandidatePosts) {
                      //console.log(electionCandidatePosts.length);
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

                          if($scope.to.options.length){
                            if ($rootScope.locale.lang == "bn_BD"){
                              $scope.to.options.unshift({name:"সব",value:"-1"});
                            }else{
                              $scope.to.options.unshift({name:"All",value:"-1"});
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

                      if($scope.to.options.length){
                        if ($rootScope.locale.lang == "bn_BD"){
                          $scope.to.options.unshift({name:"সব",value:"-1"});
                        }else{
                          $scope.to.options.unshift({name:"All",value:"-1"});
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

                        if($scope.to.options.length){
                          if ($rootScope.locale.lang == "bn_BD"){
                            $scope.to.options.unshift({name:"সব",value:"-1"});
                          }else{
                            $scope.to.options.unshift({name:"All",value:"-1"});
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

                      if($scope.to.options.length){
                        if ($rootScope.locale.lang == "bn_BD"){
                          $scope.to.options.unshift({name:"সব",value:"-1"});
                        }else{
                          $scope.to.options.unshift({name:"All",value:"-1"});
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
                        if($scope.to.options.length){
                          if ($rootScope.locale.lang == "bn_BD"){
                            $scope.to.options.unshift({name:"সব",value:"-1"});
                          }else{
                            $scope.to.options.unshift({name:"All",value:"-1"});
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

                      if($scope.to.options.length){
                        if ($rootScope.locale.lang == "bn_BD"){
                          $scope.to.options.unshift({name:"সব",value:"-1"});
                        }else{
                          $scope.to.options.unshift({name:"All",value:"-1"});
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

                        if($scope.to.options.length){
                          if ($rootScope.locale.lang == "bn_BD"){
                            $scope.to.options.unshift({name:"সব",value:"-1"});
                          }else{
                            $scope.to.options.unshift({name:"All",value:"-1"});
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

                    if($scope.to.options.length){
                      if ($rootScope.locale.lang == "bn_BD"){
                        $scope.to.options.unshift({name:"সব",value:"-1"});
                      }else{
                        $scope.to.options.unshift({name:"All",value:"-1"});
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

                      if($scope.to.options.length){
                        if ($rootScope.locale.lang == "bn_BD"){
                          $scope.to.options.unshift({name:"সব",value:"-1"});
                        }else{
                          $scope.to.options.unshift({name:"All",value:"-1"});
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


      this.getCandidateGeneralFields = function (elections, currentElections, divisions, newCandidate, constitutionalPosts, politicalParties, electionSeat) {
        console.log(newCandidate);
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

        var currentElectionOptions = [];
        //currentElections.map(function (currentElection) {
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

        if ($rootScope.locale.lang == "bn_BD"){
          divisionOptions.unshift({name:"সব",value:"-1"});
          candidateTypeOptions.unshift({name:"সব",value:"-1"});
        }else{
          divisionOptions.unshift({name:"All",value:"-1"});
          candidateTypeOptions.unshift({name:"All",value:"-1"});
        }




        var constitutionalPostOptions = constitutionalPosts.map(function (constitutionalPost) {
          return {
            name: constitutionalPost.constitutionalPostNameBn,
            value: constitutionalPost.id
          };
        });

        var politicalPartyOptions = politicalParties.map(function (politicalParty) {
          return {
            name: politicalParty.partyNameBn,
            value: politicalParty.id
          };
        });




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

                  //set initially
                  if (electionSeat && electionSeat.hasOwnProperty("electionId") && electionSeat.electionId) {
                    CurrentElectionsServiceForCA.getCurrentElections(electionSeat.electionId).then(function (currentElections) {
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
                  options: []
                },
                controller: function ($scope, ElectionCandidatePostsServiceForCA) {

                  //console.log(electionSeat);

                  //set initially
                  if(electionSeat.hasOwnProperty("currentElectionId") && electionSeat.currentElectionId){
                    ElectionCandidatePostsServiceForCA.getCandidatePostsByCurrentElection(electionSeat).then(function (electionCandidatePosts) {
                      //console.log(electionCandidatePosts.length);
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

                          if($scope.to.options.length){
                            if ($rootScope.locale.lang == "bn_BD"){
                              $scope.to.options.unshift({name:"সব",value:"-1"});
                            }else{
                              $scope.to.options.unshift({name:"All",value:"-1"});
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

                      if($scope.to.options.length){
                        if ($rootScope.locale.lang == "bn_BD"){
                          $scope.to.options.unshift({name:"সব",value:"-1"});
                        }else{
                          $scope.to.options.unshift({name:"All",value:"-1"});
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

                        if($scope.to.options.length){
                          if ($rootScope.locale.lang == "bn_BD"){
                            $scope.to.options.unshift({name:"সব",value:"-1"});
                          }else{
                            $scope.to.options.unshift({name:"All",value:"-1"});
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

                      if($scope.to.options.length){
                        if ($rootScope.locale.lang == "bn_BD"){
                          $scope.to.options.unshift({name:"সব",value:"-1"});
                        }else{
                          $scope.to.options.unshift({name:"All",value:"-1"});
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
                        if($scope.to.options.length){
                          if ($rootScope.locale.lang == "bn_BD"){
                            $scope.to.options.unshift({name:"সব",value:"-1"});
                          }else{
                            $scope.to.options.unshift({name:"All",value:"-1"});
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

                      if($scope.to.options.length){
                        if ($rootScope.locale.lang == "bn_BD"){
                          $scope.to.options.unshift({name:"সব",value:"-1"});
                        }else{
                          $scope.to.options.unshift({name:"All",value:"-1"});
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

                        if($scope.to.options.length){
                          if ($rootScope.locale.lang == "bn_BD"){
                            $scope.to.options.unshift({name:"সব",value:"-1"});
                          }else{
                            $scope.to.options.unshift({name:"All",value:"-1"});
                          }
                        }

                      });
                    }
                  });
                }
              },
              {
                className: 'col-xs-3',
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

                    if($scope.to.options.length){
                      if ($rootScope.locale.lang == "bn_BD"){
                        $scope.to.options.unshift({name:"সব",value:"-1"});
                      }else{
                        $scope.to.options.unshift({name:"All",value:"-1"});
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

                      if($scope.to.options.length){
                        if ($rootScope.locale.lang == "bn_BD"){
                          $scope.to.options.unshift({name:"সব",value:"-1"});
                        }else{
                          $scope.to.options.unshift({name:"All",value:"-1"});
                        }
                      }

                    })
                    //}
                  });
                }
              }
            ]
          },
          {
            className: 'row',
            fieldGroup: [

              {

                className: 'col-md-4',
                key: 'personNameBn',
                type: 'input',
                defaultValue: newCandidate.personNameBn,
                templateOptions: {
                  label: gettextCatalog.getString('Person Name (Bangla)'),
                  required: true
                }
              },
              {
                className: 'col-md-4',
                key: 'personNameEn',
                type: 'input',
                defaultValue: newCandidate.personNameEn,
                templateOptions: {
                  label: gettextCatalog.getString('Person Name (English)'),
                  required: true
                }
              },
              {
                className: 'col-md-4',
                key: 'fatherNameBn',
                type: 'input',
                defaultValue: newCandidate.fatherNameBn,
                templateOptions: {
                  label: gettextCatalog.getString('Father Name (Bangla)'),
                  required: true
                }
              },
              {
                className: 'col-md-4',
                key: 'fatherNameEn',
                type: 'input',
                defaultValue: newCandidate.fatherNameEn,
                templateOptions: {
                  label: gettextCatalog.getString('Father Name (English)'),
                  required: true
                }
              },
              {
                className: 'col-md-4',
                key: 'candidateType',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Type'),
                  required: true,
                  options: [
                    {name: 'সম্ভাব্য', value: "possible"},
                    {name: 'চূড়ান্ত প্রার্থী', value: "eligible"},
                    {name: 'প্রত্যাহারকৃত', value: "withdrawn"}
                  ]
                }
              },
              {
                className: 'col-md-4',
                key: 'resultType',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Result Type'),
                  required: true,
                  options: [
                    {name: 'নির্বাচিত', value: "elected"},
                    {name: 'অনির্বাচিত', value: "notelected"}
                  ]
                }
              },
              {
                className: 'col-md-4',
                key: 'electionCandidatePostId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Post'),
                  required: true,
                  options: []
                },
                controller: function ($scope, ElectionCandidatePostsServiceForCA) {

                  //console.log(newCandidate);

                  //set initially
                  if (newCandidate.hasOwnProperty("currentElectionId") && newCandidate.currentElectionId) {
                    ElectionCandidatePostsServiceForCA.getCandidatePostsByCurrentElection(newCandidate).then(function (electionCandidatePosts) {
                      //console.log(electionCandidatePosts.length);
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
                className: 'col-md-4',
                key: 'genderBn',
                type: 'select',
                defaultValue: newCandidate.genderBn,
                templateOptions: {
                  label: 'Gender (Bangla)',
                  options: [
                    {name: 'পুরুষ', value: 'পুরুষ'},
                    {name: 'মহিলা', value: 'মহিলা'}
                  ],
                  required: true
                }
              },
              {
                className: 'col-md-4',
                key: 'politicalPartyId',
                type: 'select',
                templateOptions: {
                  label: gettextCatalog.getString('Political Party'),
                  required: true,
                  options: politicalPartyOptions
                }
              },
              {
                className: 'col-md-4',
                key: 'constitutionalPostId',
                type: 'select',
                defaultValue: newCandidate.constitutionalPostId,
                templateOptions: {
                  label: gettextCatalog.getString('Constitutional Post'),
                  required: true,
                  options: constitutionalPostOptions
                }
              },
              {
                className: 'col-md-4',
                key: 'isPublished',
                type: 'select',
                templateOptions: {
                  label: 'Publish',
                  options: [
                    {name: 'Publish', value: true},
                    {name: 'draft', value: false}
                  ],
                  required: true
                }
              },
              {
                className: 'col-md-4',
                key: 'candidateVideoLink',
                type: 'input',
                defaultValue: newCandidate.candidateVideoLink,
                templateOptions: {
                  label: gettextCatalog.getString('Candidate Video Link')
                }
              },
              {
                className: 'col-md-4',
                key: 'totalCountVote',
                type: 'input',
                defaultValue: newCandidate.totalCountVote,
                templateOptions: {
                  label: gettextCatalog.getString('Total Count Voter')
                }
              }
            ]
          }
        ];
      };

      //this.getFormFieldsForPerson
    });

})();
