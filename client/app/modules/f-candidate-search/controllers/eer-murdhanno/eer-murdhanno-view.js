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
    .controller('CandidateSearchEERMurdhannoCtrl', function($scope, $stateParams,Candidate) {
      this.candidateId = $stateParams.id;
      //this.profileType = $stateParams.profileType;


      this.candidat=Candidate.findById({id:this.candidateId});
      
      
      $scope.$parent.showHide=true;
      $scope.$parent.hideShow=true;
      if($scope.$parent.mjhaddclass==="col-sm-9"){
          $scope.$parent.mjhaddclass="col-sm-12 important";
        }else{
          $scope.$parent.mjhaddclass="col-sm-9 important";
        }
      console.log($scope.$parent.mjhaddclass,'child')
      //switch(this.profileType){
      //  case "affidavit":
      //    console.log("affidavit e aise");
      //    this.candidat=Candidate.findById({id:this.candidateId});
      //    console.log(this.candidat);
      //    break;
      //  case "incometax":
      //    console.log("incometax e aise");
      //        break;
      //  case "incomeSource":
      //    console.log("incomesource e aise");
      //        break;
      //  case "assetLiabilityIncomeExpense":
      //    console.log("asset liability e aise");
      //        break;
      //}

      //console.log($stateParams.id);
      //console.log(Candidate.findById({id:this.candidateId}));

    });

})();

