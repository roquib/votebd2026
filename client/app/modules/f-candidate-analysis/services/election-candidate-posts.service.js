(function () {
  'use strict';
  angular
    .module('com.module.electionCandidatePosts')
    .service('ElectionCandidatePostsServiceForCA', function (CoreService, ElectionCandidatePost, CandidatePost, gettextCatalog, $filter) {

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

      this.getCandidatePostsByCurrentElection = function (electionSeat) {
        //console.log("ekhane aise",electionId);
        var whereCriteria={};

        if(electionSeat.hasOwnProperty("currentElectionId") && electionSeat.currentElectionId)
          whereCriteria.currentElectionId=electionSeat.currentElectionId;

        return ElectionCandidatePost.find({
          filter:{
            where: whereCriteria
          }
        }).$promise;
      };

    });

})();
