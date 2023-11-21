(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .controller('CandidateEditTaxReturnCrtl', ["$scope",'$stateParams','CandidatesService','CoreService','gettextCatalog', 'User', function ($scope,$stateParams,CandidatesService,CoreService,gettextCatalog, User) {
//console.log($stateParams);

      $scope.$on('changeCandidate', function() {
        $scope.initiateCandidate('noNeedToSearchCandidate');
      });

      $scope.initiateCandidate = function(msg){
        if(msg=='needToSearchCandidate'){
          if($stateParams.hasOwnProperty("candidateId") && $stateParams.candidateId){
            CandidatesService.getCandidate($stateParams.candidateId).then(function(candidate){
              $scope.$parent.gotCandidate=candidate;

              $scope.initiateGotCandidate();



              // console.log(typeof $scope.gotCandidate.dobTR )
              $scope.gotCandidate.dobTR = new Date($scope.gotCandidate.dobTR  );
              // console.log(typeof $scope.gotCandidate.dobTR )
              $scope.gotCandidate.taxYearEnTR = new Date($scope.gotCandidate.taxYearEnTR  );
              $scope.gotCandidate.endDateTR = new Date($scope.gotCandidate.endDateTR  );



            });
          }
        }
        else{
          $scope.initiateGotCandidate();
        }
      };

      $scope.initiateGotCandidate = function(){
        console.log('tax return receive broadcast initiation');
      };

      $scope.initiateCandidate('needToSearchCandidate');











      this.submit = function () {
        //var _1a_personalIncomeTotalFSEE= 0, _1b_loanRelativeTotalFSEE=0, _1c_freeRelativeTotalFSEE=0, _1d_loanManTotalFSEE=0, _1e_freeManTotalFSEE=0, _1f_freePartyTotalFSEE=0, _1g_freeOtherTotalFSEE= 0;

        function IsNumeric(input) {
          return (input - 0) == input && ('' + input).trim().length > 0;
        }

        $scope.gotCandidate.statusTR=true;
        $scope.gotCandidate.isPublishedTR=true;
        $scope.gotCandidate.isNewFlagTR=true;
        //$scope.gotCandidate.submissionDateTR=true;


        //$scope.gotCandidate.endDateTimestampTR=$scope.gotCandidate.endDateTR;


        //_1a_personalIncomeFSEE
        //var i=0;
        //if($scope.gotCandidate.hasOwnProperty("_1a_personalIncomeFSEE") && $scope.gotCandidate._1a_personalIncomeFSEE.length){
        //  for(i=0;i<$scope.gotCandidate._1a_personalIncomeFSEE.length;i++){
        //    if($scope.gotCandidate._1a_personalIncomeFSEE[i].hasOwnProperty("amount") && IsNumeric($scope.gotCandidate._1a_personalIncomeFSEE[i].amount) && Number($scope.gotCandidate._1a_personalIncomeFSEE[i].amount))
        //      _1a_personalIncomeTotalFSEE+=Number($scope.gotCandidate._1a_personalIncomeFSEE[i].amount);
        //  }
        //}
        //$scope.gotCandidate._1a_personalIncomeTotalFSEE=0;
        //if(_1a_personalIncomeTotalFSEE)
        //  $scope.gotCandidate._1a_personalIncomeTotalFSEE=_1a_personalIncomeTotalFSEE;

        //$scope.gotCandidate._1total_abcdefgFSEE=$scope.gotCandidate._1a_personalIncomeTotalFSEE;

        // console.log($scope.gotCandidate);
        // console.log("before");
        User.getCurrent().$promise.then(function(user) {
          // console.log(user.id);
          $scope.gotCandidate.createdByTR = user.id;
          $scope.gotCandidate.modifiedByTR = user.id;
          CandidatesService.upsertCandidate($scope.gotCandidate).then(function (candidate) {
            //$state.go('^.list');
            if(candidate && candidate.hasOwnProperty("personNameBn") && candidate.personNameBn){
              CoreService.toastSuccess(
                gettextCatalog.getString('Candidate Updated'),
                gettextCatalog.getString('Your Candidate Tax return form is save with us'));
              // console.log('candidate',candidate);
            }
          });
        });
        // console.log("after");


      }
    }]);

})();
