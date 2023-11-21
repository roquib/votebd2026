(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:CandidateSearchCtrl
   * @description Candidate Search controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.fCandidateSearch')
    .controller('CandidateProfileCtrl', function($scope,$stateParams,PostsService,CoreService) {
      // console.log($stateParams)
      $scope.posts=[];
      PostsService.getPostsByCandidate({candidateId:$stateParams.id}).then(function(posts){
        // console.log(posts);
        $scope.posts = posts;
      });
      
      $scope.post = {};
      $scope.newsShow=function (newsId) {
        PostsService.getPost(newsId).then(function (post) {
          $scope.post = post;
        });
        $scope.modal="modeldisplay";
      };

      $scope.closeNews=function (image) {
        $scope.modal = "modeldisplaynone";
          $scope.post = {};
      }


    });
})();
