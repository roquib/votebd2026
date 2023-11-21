(function () {
  'use strict';
  angular
    .module('com.module.constitutionalPosts')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.constitutionalPosts', {
          abstract: true,
          url: '/constitutionalPosts',
          templateUrl: 'modules/constitutional-posts/views/main.html'
        })
        .state('app.constitutionalPosts.list', {
          url: '',
          templateUrl: 'modules/constitutional-posts/views/list.html',
          controllerAs: 'ctrl',
          controller: function (constitutionalPosts) {
            this.constitutionalPosts = constitutionalPosts;
          },
          resolve: {
            constitutionalPosts: function (ConstitutionalPostsService) {
              return ConstitutionalPostsService.getConstitutionalPosts();
            }
          }
        })
        .state('app.constitutionalPosts.add', {
          url: '/add',
          templateUrl: 'modules/constitutional-posts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ConstitutionalPostsService, constitutionalPost) {
            this.constitutionalPost = constitutionalPost;
            this.formFields = ConstitutionalPostsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ConstitutionalPostsService.upsertConstitutionalPost(this.constitutionalPost).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            constitutionalPost: function () {
              return {};
            }
          }
        })
        .state('app.constitutionalPosts.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/constitutional-posts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ConstitutionalPostsService, constitutionalPost) {
            this.constitutionalPost = constitutionalPost;
            this.formFields = ConstitutionalPostsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ConstitutionalPostsService.upsertConstitutionalPost(this.constitutionalPost).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            constitutionalPost: function ($stateParams, ConstitutionalPostsService) {
              return ConstitutionalPostsService.getConstitutionalPost($stateParams.id);
            }
          }
        })
        .state('app.constitutionalPosts.view', {
          url: '/:id',
          templateUrl: 'modules/constitutional-posts/views/view.html',
          controllerAs: 'ctrl',
          controller: function (constitutionalPost) {
            this.constitutionalPost = constitutionalPost;
          },
          resolve: {
            constitutionalPost: function ($stateParams, ConstitutionalPostsService) {
              return ConstitutionalPostsService.getConstitutionalPost($stateParams.id);
            }
          }
        })
        .state('app.constitutionalPosts.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, ConstitutionalPostsService, constitutionalPost) {
            ConstitutionalPostsService.deleteConstitutionalPost(constitutionalPost.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            constitutionalPost: function ($stateParams, ConstitutionalPostsService) {
              return ConstitutionalPostsService.getConstitutionalPost($stateParams.id);
            }
          }
        });
    });

})();
