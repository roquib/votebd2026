(function () {
  'use strict';
  angular
    .module('com.module.posts')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.posts', {
          abstract: true,
          url: '/posts',
          templateUrl: 'modules/posts/views/main.html'
        })
        .state('app.posts.list', {
          url: '/:currentElectionId/:electionId/:divisionId/:districtId/:upazillaId/:unionId/:electionSeatId/:candidateId',
          templateUrl: 'modules/posts/views/list.html',
          controllerAs: 'ctrl',
          controller: function ($state, posts,candidate,$stateParams) {
            this.posts = posts;
            this.post = $stateParams;
            this.candidate = candidate;
            this.viewPost = function (postId) {
              $stateParams.id = postId;
              //console.log($stateParams);
              $state.go("^.view",$stateParams);
            }
            this.editPost = function (postId) {
              $stateParams.id = postId;
              //console.log($stateParams);
              $state.go("^.edit",$stateParams);
            }
            this.deletePost = function (postId) {
              $stateParams.id = postId;
              //console.log($stateParams);
              $state.go("^.delete",$stateParams);
            }
          },
          resolve: {
            posts: [
              'PostsService','$stateParams',
              function (PostsService,$stateParams) {
                // console.log($stateParams,'$stateParams');
                return PostsService.getPostsByCandidate($stateParams);
              }
            ],
            candidate:[
              'CandidatesServiceForPost','$stateParams',function (CandidatesServiceForPost,$stateParams) {
                return CandidatesServiceForPost.getCandidate($stateParams.candidateId);
              }
            ]
          }
        })
        .state('app.posts.add', {
          url: '/add/:currentElectionId/:electionId/:divisionId/:districtId/:upazillaId/:unionId/:electionSeatId/:candidateId',
          templateUrl: 'modules/posts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, PostsService, post,elections, currentElections, divisions,$stateParams) {
            this.post = post;
            this.formFields = PostsService.getFormFields(elections, currentElections, divisions, post);
            this.formOptions = {};
            this.submit = function () {
              this.post.created = new Date();

              PostsService.upsertPost(this.post).then(function () {
                $state.go('^.list',$stateParams);
              });
            };
          },

          resolve: {
            elections: [
              'ElectionsServiceForES',
              function (ElectionsServiceForES) {
                return ElectionsServiceForES.getElections();
              }
            ],
            currentElections: [
              'CurrentElectionsServiceForES',
              function (CurrentElectionsServiceForCandidate) {
                return CurrentElectionsServiceForCandidate.getCurrentElections();
              }
            ],
            divisions: function (DivisionsServiceForSeats) {
              return DivisionsServiceForSeats.getDivisions();
            },
            post: function ($stateParams) {
              return $stateParams;
            }
          }

        })
        .state('app.posts.edit', {
          url: '/edit/:id/:currentElectionId/:electionId/:divisionId/:districtId/:upazillaId/:unionId/:electionSeatId/:candidateId',
          templateUrl: 'modules/posts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, PostsService, post,elections, currentElections, divisions,$stateParams) {
            //console.log(post);
            this.post = post;
            this.formFields = PostsService.getFormFields(elections, currentElections, divisions, post);
            this.formOptions = {};
            this.submit = function () {
              this.post.modified = new Date();
              PostsService.upsertPost(this.post).then(function () {
                $state.go('^.list',$stateParams);
              });
            };
          },
          resolve: {
            elections: [
              'ElectionsServiceForES',
              function (ElectionsServiceForES) {
                return ElectionsServiceForES.getElections();
              }
            ],
            currentElections: [
              'CurrentElectionsServiceForES',
              function (CurrentElectionsServiceForCandidate) {
                return CurrentElectionsServiceForCandidate.getCurrentElections();
              }
            ],
            divisions: function (DivisionsServiceForSeats) {
              return DivisionsServiceForSeats.getDivisions();
            },
            post: function ($stateParams, PostsService) {
              return PostsService.getPost($stateParams.id);
            }
          }
        })
        .state('app.posts.view', {
          url: '/:id/:currentElectionId/:electionId/:divisionId/:districtId/:upazillaId/:unionId/:electionSeatId/:candidateId',
          templateUrl: 'modules/posts/views/view.html',
          controllerAs: 'ctrl',
          controller: function (post,$stateParams) {
            this.post = post;
            this.strprm = $stateParams;
          },
          resolve: {
            post: function ($stateParams, PostsService) {
              return PostsService.getPost($stateParams.id);
            }
          }
        })
        .state('app.posts.delete', {
          url: '/delete/:id/:currentElectionId/:electionId/:divisionId/:districtId/:upazillaId/:unionId/:electionSeatId/:candidateId',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, PostsService, post,$stateParams) {
            delete $stateParams.id;
            PostsService.deletePost(post.id, function () {
              $state.go('^.list',$stateParams);
            }, function () {
              $state.go('^.list',$stateParams);
            });
          },
          resolve: {
            post: function ($stateParams, PostsService) {
              return PostsService.getPost($stateParams.id);
            }
          }
        });
    }
  );

})();
