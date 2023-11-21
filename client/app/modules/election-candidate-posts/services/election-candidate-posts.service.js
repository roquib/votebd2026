(function () {
  'use strict';
  angular
    .module('com.module.electionCandidatePosts')
    .service('ElectionCandidatePostsService', function (CoreService, ElectionCandidatePost, CandidatePost, gettextCatalog, $filter) {

      this.getElectionCandidatePosts = function () {
        return ElectionCandidatePost.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getElectionCandidatePost = function (id) {
        //console.log(id);
        return ElectionCandidatePost.findById({
            id: id
        }).$promise;
      };

      this.getElectionCandidatePost2 = function (id) {
        //console.log(id);
        return ElectionCandidatePost.findById({
            id: id,
          filter:{
                  include:'currentElection'
                }
        }).$promise;
      };

      this.getElectionCandidatePostsByCurrentElection = function (currentElectionId) {
        // console.log("ekhane aise",currentElectionId);
        return ElectionCandidatePost.find({
          filter:{
            where:{
              currentElectionId : currentElectionId
            }
          }
        }).$promise;
      };

      this.getCandidatePosts = function (electionId) {
        //console.log("ekhane aise",electionId);
        return CandidatePost.find({
          filter:{
            include:'election',
            where:{
              electionId : electionId
            }
          }
        }).$promise;
      };

      this.upsertElectionCandidatePost = function (electionCandidatePost) {

        // console.log(electionCandidatePost);

        return ElectionCandidatePost.upsert(electionCandidatePost).$promise
          .then(function (sfr) {
            // console.log(sfr);
            CoreService.toastSuccess(
              gettextCatalog.getString('Election Candidate Post saved'),
              gettextCatalog.getString('Your Election Candidate Post is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Election Candidate Post '),
              gettextCatalog.getString('This Election Candidate Post could not be saved: ') + err
            );
          }
          );
      };

      this.deleteElectionCandidatePost = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            ElectionCandidatePost.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Election Candidate Post deleted'),
                gettextCatalog.getString('Your Election Candidate Post is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Election Candidate Post'),
                gettextCatalog.getString('Your Election Candidate Post is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function (currentElections, currentElectionId) {
        var currentElectionOptions = currentElections.map(function (currentElection) {
          return {
            name: $filter('date')(currentElection.electionDate, "dd/MM/yyyy") + " - " +currentElection.election.nameBn,
            value: currentElection.id
          };
        });

        return [
          {
            key: 'postNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Post Name (Bangla)'),
              required: true
            }
          },
          {
            key: 'postNameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Post Name (English)'),
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
            key: 'candidatePostId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Candidate Post'),
              required: true,
              options: []
            },
            controller: /* @ngInject */ function($scope, DataService,ElectionCandidatePostsService,CurrentElectionServiceForECP) {

// console.log("currentElectionId",currentElectionId);

              //set initially
              if(currentElectionId){
                CurrentElectionServiceForECP.getCurrentElection(currentElectionId).then(function(currentElection){
                  ElectionCandidatePostsService.getCandidatePosts(currentElection.election.id).then(function(candidatePosts){
                    //console.log(candidatePosts);
                    $scope.to.options = candidatePosts.map(function (candidatePost) {
                      return {
                        name:  candidatePost.election.nameBn + " - " +candidatePost.postNameBn,
                        value: candidatePost.id
                      };
                    });
                  });
                });
              }

              //when current election change then
              $scope.$watch('model.currentElectionId', function (newValue, oldValue, theScope) {
                if(newValue !== oldValue) {
                  if($scope.model[$scope.options.key] && oldValue) {
                    // reset this select
                    $scope.model[$scope.options.key] = '';
                  }
                  // Reload options
                  //$scope.to.loading = DataService.teams(newValue).then(function (res) {
                  //  $scope.to.options = res;
                  //});
                  //  console.log("ekhane aaaise",newValue, oldValue);
                  CurrentElectionServiceForECP.getCurrentElection(newValue).then(function(currentElection){
                    ElectionCandidatePostsService.getCandidatePosts(currentElection.election.id).then(function(candidatePosts){
                      //console.log(candidatePosts);
                      $scope.to.options = candidatePosts.map(function (candidatePost) {
                        return {
                          name:  candidatePost.election.nameBn + " - " +candidatePost.postNameBn,
                          value: candidatePost.id
                        };
                      });
                    });
                  })
                }
              });

            }
          },
          //{
          //  key: 'sport',
          //  type: 'select',
          //  templateOptions: {
          //    label: 'Sport',
          //    options: [],
          //    valueProp: 'id',
          //    labelProp: 'name',
          //  },
          //  controller: /* @ngInject */ function($scope, DataService) {
          //    $scope.to.loading = DataService.sports().then(function(response){
          //      $scope.to.options = response;
          //      return response;
          //    });
          //  }
          //},
          //{
          //  key: 'team',
          //  type: 'select',
          //  templateOptions: {
          //    label: 'Team',
          //    options: [],
          //    valueProp: 'id',
          //    labelProp: 'name',
          //  },
          //  controller: /* @ngInject */ function($scope, DataService) {
          //    $scope.$watch('model.sport', function (newValue, oldValue, theScope) {
          //      if(newValue !== oldValue) {
          //        // logic to reload this select's options asynchronusly based on state's value (newValue)
          //        console.log('new value is different from old value');
          //        if($scope.model[$scope.options.key] && oldValue) {
          //          // reset this select
          //          $scope.model[$scope.options.key] = '';
          //        }
          //        // Reload options
          //        $scope.to.loading = DataService.teams(newValue).then(function (res) {
          //          $scope.to.options = res;
          //        });
          //      }
          //    });
          //
          //  }
          //},
          //{
          //  key: 'player',
          //  type: 'select',
          //  templateOptions: {
          //    label: 'Player',
          //    options: [],
          //    valueProp: 'id',
          //    labelProp: 'name',
          //  },
          //  controller: /* @ngInject */ function($scope, DataService) {
          //    $scope.$watch('model.team', function (newValue, oldValue, theScope) {
          //      if(newValue !== oldValue) {
          //        // logic to reload this select's options asynchronusly based on state's value (newValue)
          //        console.log('new value is different from old value');
          //        if($scope.model[$scope.options.key] && oldValue) {
          //          // reset this select
          //          $scope.model[$scope.options.key] = '';
          //        }
          //        // Reload options
          //        $scope.to.loading = DataService.players(newValue).then(function (res) {
          //          $scope.to.options = res;
          //        });
          //      }
          //    });
          //
          //  }
          //},
          {
            key: 'postDescResponsibilityBn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Post Responsibility (Bangla)')
            }
          }
        ];
      };
    });

})();
