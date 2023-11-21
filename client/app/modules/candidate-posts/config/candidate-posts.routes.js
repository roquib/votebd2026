(function () {
  'use strict';
  angular
    .module('com.module.candidatePosts')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.candidatePosts', {
          abstract: true,
          url: '/candidatePosts',
          templateUrl: 'modules/candidate-posts/views/main.html'
        })
        .state('app.candidatePosts.list', {
          url: '',
          templateUrl: 'modules/candidate-posts/views/list.html',
          controllerAs: 'ctrl',
          controller: function (elections) {
            this.elections = elections;
          },
          resolve: {
            elections: [
              'ElectionsServiceForCP',
              function (ElectionsServiceForCP) {
                return ElectionsServiceForCP.getElections();
              }
            ]
          }
        })
        .state('app.candidatePosts.add', {
          url: '/add/:electionId',
          templateUrl: 'modules/candidate-posts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, CandidatePostsService, elections, candidatePost) {
            this.elections = elections;
            this.candidatePost = candidatePost;
            this.formFields = CandidatePostsService.getFormFields(elections);
            this.formOptions = {};
            this.submit = function () {
              CandidatePostsService.upsertCandidatePost(this.candidatePost).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            elections: function (ElectionsServiceForCP) {
              return ElectionsServiceForCP.getElections();
            },
            candidatePost: function ($stateParams) {
              return {
                electionId: $stateParams.electionId
              };
            }
          }
        })
        .state('app.candidatePosts.edit', {
          url: '/:candidatePostId/edit',
          templateUrl: 'modules/candidate-posts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, CandidatePostsService, elections, candidatePost) {
            this.elections = elections;
            this.candidatePost = candidatePost;
            this.formFields = CandidatePostsService.getFormFields(elections);
            this.formOptions = {};
            this.submit = function () {
              CandidatePostsService.upsertCandidatePost(this.candidatePost).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            elections: function (ElectionsServiceForCP) {
              return ElectionsServiceForCP.getElections();
            },
            candidatePost: function ($stateParams, CandidatePostsService) {
              return CandidatePostsService.getCandidatePost($stateParams.candidatePostId);
            }
          }
        })
        .state('app.candidatePosts.addelection', {
          url: '/addelection',
          templateUrl: 'modules/candidate-posts/views/electionform.html',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionsServiceForCP, election) {
            this.election = election;
            this.formFields = ElectionsServiceForCP.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ElectionsServiceForCP.upsertElection(this.election).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            election: function () {
              return {};
            }
          }
        })
        .state('app.candidatePosts.view', {
          url: '/:candidatePostId',
          templateUrl: 'modules/candidate-posts/views/view.html',
          controllerAs: 'ctrl',
          controller: function (candidatePost) {
            this.candidatePost = candidatePost;
            //console.log(candidatePost);
          },
          resolve: {
            candidatePost: function ($stateParams, CandidatePostsService) {
              return CandidatePostsService.getCandidatePost($stateParams.candidatePostId);
            }
          }
        })
        .state('app.candidatePosts.editelection', {
          url: '/editelection/:electionId',
          templateUrl: 'modules/candidate-posts/views/electionform.html',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionsServiceForCP, election) {
            this.election = election;
            this.formFields = ElectionsServiceForCP.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ElectionsServiceForCP.upsertElection(this.election).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            election: function ($stateParams, ElectionsServiceForCP) {
              return ElectionsServiceForCP.getElection($stateParams.electionId);
            }
          }
        })
        .state('app.candidatePosts.deleteelection', {
          url: '/election/:electionId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, ElectionsServiceForCP, candidatePost) {
            ElectionsServiceForCP.deleteElection(candidatePost.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            candidatePost: function ($stateParams, ElectionsServiceForCP) {
              return ElectionsServiceForCP.getElection($stateParams.electionId);
            }
          }
        })
        .state('app.candidatePosts.delete', {
          url: '/:candidatePostId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, CandidatePostsService, candidatePost) {
            CandidatePostsService.deleteCandidatePost(candidatePost.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            candidatePost: function ($stateParams, CandidatePostsService) {
              return CandidatePostsService.getCandidatePost($stateParams.candidatePostId);
            }
          }
        });
    });

})();
