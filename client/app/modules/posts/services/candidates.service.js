(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .service('CandidatesServiceForPost', function ( Candidate) {

      this.getCandidate = function (id) {
        //console.log(id);
        return Candidate.findById({
            id: id
        }).$promise;
      };


    });

})();
