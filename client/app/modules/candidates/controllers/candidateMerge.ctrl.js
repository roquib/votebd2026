(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .controller('CandidateMergeCrtl', ["$scope", '$state','$location','$stateParams','CandidatesService','PersonsServiceForCandidate','CoreService','gettextCatalog', 'User', function ($scope, $state, $location, $stateParams, CandidatesService, PersonsServiceForCandidate,CoreService,gettextCatalog, User) {
      // console.log($stateParams);

      this.mergeData=function(){
        CandidatesService.updateCandidatewhere(this.id, this.newId).then(function(){
          //console.log('update successfully');
        })
      }

      $scope.persons = [];
      this.findPerson = function () {
        PersonsServiceForCandidate.getPersonByName(this.personName, this.personFatherName).then(function (persons) {
          for(var i=0; i<persons.length; i++){
               persons[i].candidatureCount=persons[i].candidates.length;
           }
           persons.sort(function(obj1, obj2) {
	            // Descending: first value greater than the previous
	            return obj2.candidatureCount - obj1.candidatureCount;
           });
           $scope.persons=persons;
          if(!persons.length){
            CoreService.toastError(
              gettextCatalog.getString('Person didn\'t find'),
              gettextCatalog.getString('You may add person!'));
          }
        })
      }



    }]);

})();
