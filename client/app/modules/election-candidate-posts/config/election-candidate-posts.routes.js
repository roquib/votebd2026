(function () {
  'use strict';
  angular
    .module('com.module.electionCandidatePosts')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.electionCandidatePosts', {
          abstract: true,
          url: '/electionCandidatePosts',
          templateUrl: 'modules/election-candidate-posts/views/main.html'
        })
        .state('app.electionCandidatePosts.list', {
          url: '',
          templateUrl: 'modules/election-candidate-posts/views/list.html',
          controllerAs: 'ctrl',
          //controller: function (elections,currentElections,currentElectionsWithElection) {
          controller: function (currentElections) {

            this.currentElections = currentElections;

            this.currentPage = 1;
            this.pageSize = 10;
            this.pageChangeHandler = function(num) {
              // console.log('page changed to ' + num);
            };
          },
          resolve: {
            currentElections: [
              'CurrentElectionServiceForECP',
              function (CurrentElectionServiceForECP) {
                return CurrentElectionServiceForECP.getCurrentElections();
              }
            ],
            //currentElectionsWithElection: [
            //  'CurrentElectionServiceForECP',
            //  function (CurrentElectionServiceForECP) {
            //    return CurrentElectionServiceForECP.getCurrentElectionsWithEelection();
            //  }
            //],
            //elections: [
            //  'ElectionsServiceForECP',
            //  function (ElectionsServiceForECP) {
            //    return ElectionsServiceForECP.getElections();
            //  }
            //]
          }
        })
        .state('app.electionCandidatePosts.add', {
          url: '/add/:currentElectionId',
          templateUrl: 'modules/election-candidate-posts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionCandidatePostsService, currentElections, electionCandidatePost) {
            this.currentElections = currentElections;
            this.electionCandidatePost = electionCandidatePost;
            this.formFields = ElectionCandidatePostsService.getFormFields(currentElections,electionCandidatePost.currentElectionId);
            this.formOptions = {};
            this.submit = function () {
              ElectionCandidatePostsService.upsertElectionCandidatePost(this.electionCandidatePost).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            currentElections: function (CurrentElectionServiceForECP) {
              return CurrentElectionServiceForECP.getCurrentElections();
            },
            electionCandidatePost: function ($stateParams) {
              return {
                currentElectionId: $stateParams.currentElectionId
              };
            }
          }
        })
        .state('app.electionCandidatePosts.edit', {
          url: '/:electionCandidatePostId/edit',
          templateUrl: 'modules/election-candidate-posts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionCandidatePostsService, currentElections, electionCandidatePost) {
            this.currentElections = currentElections;
            this.electionCandidatePost = electionCandidatePost;

            this.formFields = ElectionCandidatePostsService.getFormFields(currentElections,electionCandidatePost.currentElectionId);
            this.formOptions = {};
            this.submit = function () {
              // console.log(this.electionCandidatePost);
              ElectionCandidatePostsService.upsertElectionCandidatePost(this.electionCandidatePost).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            currentElections: function (CurrentElectionServiceForECP) {
              return CurrentElectionServiceForECP.getCurrentElections();
            },
            electionCandidatePost: function ($stateParams, ElectionCandidatePostsService) {
              //console.log($stateParams.electionCandidatePostId);
              return ElectionCandidatePostsService.getElectionCandidatePost($stateParams.electionCandidatePostId);
            }
          }
        })
        .state('app.electionCandidatePosts.view', {
          url: '/:electionCandidatePostId',
          templateUrl: 'modules/election-candidate-posts/views/view.html',
          controllerAs: 'ctrl',
          controller: function (electionCandidatePost) {
            this.electionCandidatePost = electionCandidatePost;
            // console.log(electionCandidatePost);
          },
          resolve: {
            electionCandidatePost: function ($stateParams, ElectionCandidatePostsService) {
              return ElectionCandidatePostsService.getElectionCandidatePost2($stateParams.electionCandidatePostId);
            }
          }
        })
        .state('app.electionCandidatePosts.delete', {
          url: '/:electionCandidatePostId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionCandidatePostsService, electionCandidatePost) {
            ElectionCandidatePostsService.deleteElectionCandidatePost(electionCandidatePost.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            electionCandidatePost: function ($stateParams, ElectionCandidatePostsService) {
              return ElectionCandidatePostsService.getElectionCandidatePost($stateParams.electionCandidatePostId);
            }
          }
        });
    });

})();
