(function () {
  'use strict';
  angular
    .module('com.module.posts')
    .service('PostsService', function (CoreService, Post, gettextCatalog,$rootScope,CandidatesService) {
      this.getPosts = function () {
        return Post.find({
          filter: {
            fields : ['id','title','created','modified','image'],
            order: 'created DESC',
            limit:30
          }
        }).$promise;
      };

      this.getPostsByCandidate = function (candidateAllInfo) {
        return Post.find({
          filter: {
            fields : ['id','titleEn','titleBn','contentEn','contentBn','created','modified','image'],
            order: 'created DESC',
            where: {candidateId:candidateAllInfo.candidateId},
          }
        }).$promise;
      };


      this.getPost = function (id) {
        return Post.findById({
          id: id
        }).$promise;
      };

      this.upsertPost = function (post) {
        return Post.upsert(post).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Post saved'),
              gettextCatalog.getString('Your post is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving post '),
              gettextCatalog.getString('This post could no be saved: ') + err
            );
          }
        );
      };




      this.deletePost = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Post.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Post deleted'),
                gettextCatalog.getString('Your post is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting post'),
                gettextCatalog.getString('Your post is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function (elections, currentElections, divisions, electionSeat) {
        //console.log(electionSeat);

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
            key: 'electionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Election'),
              required: true,
              options: electionOptions
            },
          },
          {
            key: 'currentElectionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Current Election'),
              required: true,
              options: currentElectionOptions
            },
            controller: function ($scope, CurrentElectionsServiceForCA) {

              //set initially
              if (electionSeat && electionSeat.hasOwnProperty("currentElectionId") && electionSeat.currentElectionId) {

                CurrentElectionsServiceForCA.getCurrentElections(electionSeat.electionId).then(function (currentElections) {
                   //console.log(currentElections ,'electionSeat');

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
            key: 'divisionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Division'),
              required: true,
              options: divisionOptions
            }
          },
          {
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
          },
          {
            key: 'candidateId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Candidate'),
              required: true,
              options: []
            },
            controller: function ($scope, ElectionSeatsServiceForCandidate) {


              //set initially
              if (electionSeat && electionSeat.hasOwnProperty("electionSeatId") && electionSeat.electionSeatId) {
                CandidatesService.getCandidatesWhere({currentElectionId:electionSeat.currentElectionId,electionSeatId:electionSeat.electionSeatId}).then(function (candidates) {
                  //console.log(candidates);
                  $scope.to.options = candidates.map(function (candidate) {
                     var nameFld = '';
                     if ($rootScope.locale.lang == "bn_BD")
                       nameFld = candidate.personNameBn ;
                     else
                       nameFld = candidate.personNameEn;

                     return {
                       name: nameFld,
                       value: candidate.id
                     };
                    });



                });
              }

              //when current election change then
              $scope.$watch('model.electionSeatId', function (newValue, oldValue, theScope) {
                if (newValue !== oldValue) {
                  if ($scope.model[$scope.options.key] && oldValue) {
                    // reset this select
                    $scope.model[$scope.options.key] = '';
                  }
                  CandidatesService.getCandidatesWhere({currentElectionId:electionSeat.currentElectionId,electionSeatId:newValue}).then(function (candidates) {
                    // console.log(candidates);
                    $scope.to.options = candidates.map(function (candidate) {
                     var nameFld = '';
                     if ($rootScope.locale.lang == "bn_BD")
                       nameFld = candidate.personNameBn ;
                     else
                       nameFld = candidate.personNameEn;

                     return {
                       name: nameFld,
                       value: candidate.id
                     };
                    });

                  });
                }
              });
            }
          },
          {
            key: 'titleBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Title (Bangla)'),
              required: true
            }
          },
           {
            key: 'titleEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Title (English)'),
              required: true
            }
          },
          {
            key: 'contentBn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Content (Bangla)'),
              required: true
            }
          },{
            key: 'contentEn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Content (English)'),
              required: true
            }
          },
          {
            key: 'image',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Image')
            }
          }
        ];
      };

    });

})();


//gcloud compute firewall-rules create default-allow-mongo  --allow tcp:27017 --source-ranges 0.0.0.0/0 --target-tags mongodb --description "Allow mongodb access to all IPs"
