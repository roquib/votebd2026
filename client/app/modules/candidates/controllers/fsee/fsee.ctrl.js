(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .controller('CandidateEditFSEECrtl', ["$scope",'$stateParams','CandidatesService','CoreService','gettextCatalog', 'User', function ($scope,$stateParams,CandidatesService,CoreService,gettextCatalog, User) {
//console.log($stateParams);

      if(!$scope.gotCandidate){
        if($stateParams.hasOwnProperty("candidateId") && $stateParams.candidateId){
          CandidatesService.getCandidate($stateParams.candidateId).then(function(candidate){
            $scope.$parent.gotCandidate=candidate;
          });
        }
      }

      this.add_1a_personalIncomeFSEE = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1a_personalIncomeFSEE"))
          $scope.gotCandidate._1a_personalIncomeFSEE=[];

        $scope.gotCandidate._1a_personalIncomeFSEE.push({});
      };
      this.delete_1a_personalIncomeFSEE = function(){
        $scope.gotCandidate._1a_personalIncomeFSEE.pop();
      }

      this.add_1b_loanRelativeFSEE = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1b_loanRelativeFSEE"))
          $scope.gotCandidate._1b_loanRelativeFSEE=[];

        $scope.gotCandidate._1b_loanRelativeFSEE.push({});
      };
      this.delete_1b_loanRelativeFSEE = function(){
        $scope.gotCandidate._1b_loanRelativeFSEE.pop();
      }

      this.add_1c_freeRelativeFSEE = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1c_freeRelativeFSEE"))
          $scope.gotCandidate._1c_freeRelativeFSEE=[];

        $scope.gotCandidate._1c_freeRelativeFSEE.push({});
      };
      this.delete_1c_freeRelativeFSEE = function(){
        $scope.gotCandidate._1c_freeRelativeFSEE.pop();
      }

      this.add_1d_loanManFSEE = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1d_loanManFSEE"))
          $scope.gotCandidate._1d_loanManFSEE=[];

        $scope.gotCandidate._1d_loanManFSEE.push({});
      };
      this.delete_1d_loanManFSEE = function(){
        $scope.gotCandidate._1d_loanManFSEE.pop();
      }

      this.add_1e_freeManFSEE = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1e_freeManFSEE"))
          $scope.gotCandidate._1e_freeManFSEE=[];

        $scope.gotCandidate._1e_freeManFSEE.push({});
      };
      this.delete_1e_freeManFSEE = function(){
        $scope.gotCandidate._1e_freeManFSEE.pop();
      }

      this.add_1f_freePartyFSEE = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1f_freePartyFSEE"))
          $scope.gotCandidate._1f_freePartyFSEE=[];

        $scope.gotCandidate._1f_freePartyFSEE.push({});
      };
      this.delete_1f_freePartyFSEE = function(){
        $scope.gotCandidate._1f_freePartyFSEE.pop();
      }

      this.add_1g_freeOtherFSEE = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1g_freeOtherFSEE"))
          $scope.gotCandidate._1g_freeOtherFSEE=[];

        $scope.gotCandidate._1g_freeOtherFSEE.push({});
      };
      this.delete_1g_freeOtherFSEE = function(){
        $scope.gotCandidate._1g_freeOtherFSEE.pop();
      }






      this.submit = function () {
        var _1a_personalIncomeTotalFSEE= 0, _1b_loanRelativeTotalFSEE=0, _1c_freeRelativeTotalFSEE=0, _1d_loanManTotalFSEE=0, _1e_freeManTotalFSEE=0, _1f_freePartyTotalFSEE=0, _1g_freeOtherTotalFSEE= 0;

        function IsNumeric(input) {
          return (input - 0) == input && ('' + input).trim().length > 0;
        }

        $scope.gotCandidate.statusFSEE=true;
        $scope.gotCandidate.isPublishedFSEE=true;
        //$scope.gotCandidate.submissionDateFSEE=true;






        //_1a_personalIncomeFSEE
        var i=0;
        if($scope.gotCandidate.hasOwnProperty("_1a_personalIncomeFSEE") && $scope.gotCandidate._1a_personalIncomeFSEE.length){
          for(i=0;i<$scope.gotCandidate._1a_personalIncomeFSEE.length;i++){
            if($scope.gotCandidate._1a_personalIncomeFSEE[i].hasOwnProperty("amount") && IsNumeric($scope.gotCandidate._1a_personalIncomeFSEE[i].amount) && Number($scope.gotCandidate._1a_personalIncomeFSEE[i].amount))
              _1a_personalIncomeTotalFSEE+=Number($scope.gotCandidate._1a_personalIncomeFSEE[i].amount);
          }
        }
        $scope.gotCandidate._1a_personalIncomeTotalFSEE=0;
        if(_1a_personalIncomeTotalFSEE)
          $scope.gotCandidate._1a_personalIncomeTotalFSEE=_1a_personalIncomeTotalFSEE;

        //_1b_loanRelativeFSEE
        if($scope.gotCandidate.hasOwnProperty("_1b_loanRelativeFSEE") && $scope.gotCandidate._1b_loanRelativeFSEE.length){
          for(i=0;i<$scope.gotCandidate._1b_loanRelativeFSEE.length;i++){
            if($scope.gotCandidate._1b_loanRelativeFSEE[i].hasOwnProperty("amount") && IsNumeric($scope.gotCandidate._1b_loanRelativeFSEE[i].amount) && Number($scope.gotCandidate._1b_loanRelativeFSEE[i].amount))
              _1b_loanRelativeTotalFSEE+=Number($scope.gotCandidate._1b_loanRelativeFSEE[i].amount);
          }
        }
        $scope.gotCandidate._1b_loanRelativeTotalFSEE=0;
        if(_1b_loanRelativeTotalFSEE)
          $scope.gotCandidate._1b_loanRelativeTotalFSEE=_1b_loanRelativeTotalFSEE;

        //_1c_freeRelativeFSEE
        if($scope.gotCandidate.hasOwnProperty("_1c_freeRelativeFSEE") && $scope.gotCandidate._1c_freeRelativeFSEE.length){
          for(i=0;i<$scope.gotCandidate._1c_freeRelativeFSEE.length;i++){
            if($scope.gotCandidate._1c_freeRelativeFSEE[i].hasOwnProperty("amount") && IsNumeric($scope.gotCandidate._1c_freeRelativeFSEE[i].amount) && Number($scope.gotCandidate._1c_freeRelativeFSEE[i].amount))
              _1c_freeRelativeTotalFSEE+=Number($scope.gotCandidate._1c_freeRelativeFSEE[i].amount);
          }
        }
        $scope.gotCandidate._1c_freeRelativeTotalFSEE=0;
        if(_1c_freeRelativeTotalFSEE)
          $scope.gotCandidate._1c_freeRelativeTotalFSEE=_1c_freeRelativeTotalFSEE;

        //_1d_loanManFSEE
        if($scope.gotCandidate.hasOwnProperty("_1d_loanManFSEE") && $scope.gotCandidate._1d_loanManFSEE.length){
          for(i=0;i<$scope.gotCandidate._1d_loanManFSEE.length;i++){
            if($scope.gotCandidate._1d_loanManFSEE[i].hasOwnProperty("amount") && IsNumeric($scope.gotCandidate._1d_loanManFSEE[i].amount) && Number($scope.gotCandidate._1d_loanManFSEE[i].amount))
              _1d_loanManTotalFSEE+=Number($scope.gotCandidate._1d_loanManFSEE[i].amount);
          }
        }
        $scope.gotCandidate._1d_loanManTotalFSEE=0;
        if(_1d_loanManTotalFSEE)
          $scope.gotCandidate._1d_loanManTotalFSEE=_1d_loanManTotalFSEE;

        //_1e_freeManFSEE
        if($scope.gotCandidate.hasOwnProperty("_1e_freeManFSEE") && $scope.gotCandidate._1e_freeManFSEE.length){
          for(i=0;i<$scope.gotCandidate._1e_freeManFSEE.length;i++){
            if($scope.gotCandidate._1e_freeManFSEE[i].hasOwnProperty("amount") && IsNumeric($scope.gotCandidate._1e_freeManFSEE[i].amount) && Number($scope.gotCandidate._1e_freeManFSEE[i].amount))
              _1e_freeManTotalFSEE+=Number($scope.gotCandidate._1e_freeManFSEE[i].amount);
          }
        }
        $scope.gotCandidate._1e_freeManTotalFSEE=0;
        if(_1e_freeManTotalFSEE)
          $scope.gotCandidate._1e_freeManTotalFSEE=_1e_freeManTotalFSEE;

        //_1f_freePartyFSEE
        if($scope.gotCandidate.hasOwnProperty("_1f_freePartyFSEE") && $scope.gotCandidate._1f_freePartyFSEE.length){
          for(i=0;i<$scope.gotCandidate._1f_freePartyFSEE.length;i++){
            if($scope.gotCandidate._1f_freePartyFSEE[i].hasOwnProperty("amount") && IsNumeric($scope.gotCandidate._1f_freePartyFSEE[i].amount) && Number($scope.gotCandidate._1f_freePartyFSEE[i].amount))
              _1f_freePartyTotalFSEE+=Number($scope.gotCandidate._1f_freePartyFSEE[i].amount);
          }
        }
        $scope.gotCandidate._1f_freePartyTotalFSEE=0;
        if(_1f_freePartyTotalFSEE)
          $scope.gotCandidate._1f_freePartyTotalFSEE=_1f_freePartyTotalFSEE;

        //other
        if($scope.gotCandidate.hasOwnProperty("_1g_freeOtherFSEE") && $scope.gotCandidate._1g_freeOtherFSEE.length){
          for(i=0;i<$scope.gotCandidate._1g_freeOtherFSEE.length;i++){
            if($scope.gotCandidate._1g_freeOtherFSEE[i].hasOwnProperty("amount") && IsNumeric($scope.gotCandidate._1g_freeOtherFSEE[i].amount) && Number($scope.gotCandidate._1g_freeOtherFSEE[i].amount))
              _1g_freeOtherTotalFSEE+=Number($scope.gotCandidate._1g_freeOtherFSEE[i].amount);
          }
        }
        $scope.gotCandidate._1g_freeOtherTotalFSEE=0;
        if(_1g_freeOtherTotalFSEE)
          $scope.gotCandidate._1g_freeOtherTotalFSEE=_1g_freeOtherTotalFSEE;


        $scope.gotCandidate._1total_abcdefgFSEE=$scope.gotCandidate._1a_personalIncomeTotalFSEE+$scope.gotCandidate._1b_loanRelativeTotalFSEE+$scope.gotCandidate._1c_freeRelativeTotalFSEE+$scope.gotCandidate._1d_loanManTotalFSEE+$scope.gotCandidate._1e_freeManTotalFSEE+$scope.gotCandidate._1f_freePartyTotalFSEE+$scope.gotCandidate._1g_freeOtherTotalFSEE;

        // console.log($scope.gotCandidate);



        // console.log("before");
        User.getCurrent().$promise.then(function(user) {
          // console.log(user.id);
          $scope.gotCandidate.createdByFSEE = user.id;
          $scope.gotCandidate.modifiedByFSEE = user.id;
          CandidatesService.upsertCandidate($scope.gotCandidate).then(function (candidate) {
            //$state.go('^.list');
            if(candidate && candidate.hasOwnProperty("personNameBn") && candidate.personNameBn){
              CoreService.toastSuccess(
                gettextCatalog.getString('Candidate Updated'),
                gettextCatalog.getString('Your Candidate Probable Fund Source of Election Expense form is save with us'));
              // console.log('candidate',candidate);
            }
          });
        });
        // console.log("after");


      }


    }]);

})();
