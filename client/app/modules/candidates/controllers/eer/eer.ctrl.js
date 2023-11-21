(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .controller('CandidateEditEERCrtl', ["$scope",'$stateParams','CandidatesService','CoreService','gettextCatalog', 'User', function ($scope,$stateParams,CandidatesService,CoreService,gettextCatalog, User) {
//console.log($stateParams);

      if(!$scope.gotCandidate){
        if($stateParams.hasOwnProperty("candidateId") && $stateParams.candidateId){
          CandidatesService.getCandidate($stateParams.candidateId).then(function(candidate){
            $scope.$parent.gotCandidate=candidate;
          });


          if($scope.gotCandidate.hasOwnProperty('_2ElectionExpenseDetailsEER') && $scope.gotCandidate._2ElectionExpenseDetailsEER.length){
           var i=0;
           for(i=0;i<$scope.gotCandidate._2ElectionExpenseDetailsEER.length;i++){
             if($scope.gotCandidate._2ElectionExpenseDetailsEER[i].hasOwnProperty('dateOfApproval'))
               $scope.gotCandidate._2ElectionExpenseDetailsEER[i].dateOfApproval= new Date($scope.gotCandidate._2ElectionExpenseDetailsEER[i].dateOfApproval);

             if($scope.gotCandidate._2ElectionExpenseDetailsEER[i].hasOwnProperty('dateOfMoneyPay'))
               $scope.gotCandidate._2ElectionExpenseDetailsEER[i].dateOfMoneyPay= new Date($scope.gotCandidate._2ElectionExpenseDetailsEER[i].dateOfMoneyPay);


           }
          }
        }
      }

      this.IsNumeric= function(input) {
        return (input - 0) == input && ('' + input).trim().length > 0;
      };

      /*=======================***********************===================*/
      this.add_2ElectionExpenseDetailsEER = function(){
        //console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_2ElectionExpenseDetailsEER"))
          $scope.gotCandidate._2ElectionExpenseDetailsEER=[];

        $scope.gotCandidate._2ElectionExpenseDetailsEER.push({});
      };
      this.delete_2ElectionExpenseDetailsEER = function(){
        $scope.gotCandidate._2ElectionExpenseDetailsEER.pop();
      };

      this.change_2ElectionExpenseDetailsEER=function(){
        var i= 0, totalClearUnclearAmt= 0, _2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER=0;
        // console.log("test");
        if($scope.gotCandidate.hasOwnProperty("_2ElectionExpenseDetailsEER") && $scope.gotCandidate._2ElectionExpenseDetailsEER.length){
          for(i=0;i<$scope.gotCandidate._2ElectionExpenseDetailsEER.length;i++){
            totalClearUnclearAmt= 0;

            if($scope.gotCandidate._2ElectionExpenseDetailsEER[i].hasOwnProperty('clearedMoneyAmt') && this.IsNumeric($scope.gotCandidate._2ElectionExpenseDetailsEER[i].clearedMoneyAmt) && Number($scope.gotCandidate._2ElectionExpenseDetailsEER[i].clearedMoneyAmt)){
              totalClearUnclearAmt+=Number($scope.gotCandidate._2ElectionExpenseDetailsEER[i].clearedMoneyAmt);
              _2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER+=Number($scope.gotCandidate._2ElectionExpenseDetailsEER[i].clearedMoneyAmt);
            }
            if($scope.gotCandidate._2ElectionExpenseDetailsEER[i].hasOwnProperty('unclearedMoneyAmt') && this.IsNumeric($scope.gotCandidate._2ElectionExpenseDetailsEER[i].unclearedMoneyAmt) && Number($scope.gotCandidate._2ElectionExpenseDetailsEER[i].unclearedMoneyAmt)){
              totalClearUnclearAmt+=Number($scope.gotCandidate._2ElectionExpenseDetailsEER[i].unclearedMoneyAmt);
              _2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER+=Number($scope.gotCandidate._2ElectionExpenseDetailsEER[i].unclearedMoneyAmt);
            }

            if(totalClearUnclearAmt)
              $scope.gotCandidate._2ElectionExpenseDetailsEER[i].totalClearUnclearAmt=totalClearUnclearAmt;
          }

          //$scope.gotCandidate._2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER=0;
          if(_2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER)
            $scope.gotCandidate._2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER=_2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER;
        }
      };

      /*=======================***********************===================*/
      this.add_4ControversialClaimDetails = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_4ControversialClaimDetails"))
          $scope.gotCandidate._4ControversialClaimDetails=[];

        $scope.gotCandidate._4ControversialClaimDetails.push({});
      };
      this.delete_4ControversialClaimDetails = function(){
        $scope.gotCandidate._4ControversialClaimDetails.pop();
      };

      this.change_4ControversialClaimDetails=function(){
        var i= 0, _4ControversialClaimDetailsTotalClaimedAmtEER=0;
        // console.log("test");
        if($scope.gotCandidate.hasOwnProperty("_4ControversialClaimDetails") && $scope.gotCandidate._4ControversialClaimDetails.length){
          for(i=0;i<$scope.gotCandidate._4ControversialClaimDetails.length;i++){

            if($scope.gotCandidate._4ControversialClaimDetails[i].hasOwnProperty('claimedAmt') && this.IsNumeric($scope.gotCandidate._4ControversialClaimDetails[i].claimedAmt) && Number($scope.gotCandidate._4ControversialClaimDetails[i].claimedAmt)){
              _4ControversialClaimDetailsTotalClaimedAmtEER+=Number($scope.gotCandidate._4ControversialClaimDetails[i].claimedAmt);
            }
          }
          //$scope.gotCandidate._2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER=0;
          if(_4ControversialClaimDetailsTotalClaimedAmtEER)
            $scope.gotCandidate._4ControversialClaimDetailsTotalClaimedAmtEER=_4ControversialClaimDetailsTotalClaimedAmtEER;
        }
      };

      /*=======================***********************===================*/
      this.add_5_claimedUnpaidDetailsEER = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_5_claimedUnpaidDetailsEER"))
          $scope.gotCandidate._5_claimedUnpaidDetailsEER=[];

        $scope.gotCandidate._5_claimedUnpaidDetailsEER.push({});
      };
      this.delete_5_claimedUnpaidDetailsEER = function(){
        $scope.gotCandidate._5_claimedUnpaidDetailsEER.pop();
      };

      this.change_5_claimedUnpaidDetailsEER=function(){
        var i= 0, _5_claimedUnpaidDetailsTotalClaimedAmtEER=0;
        // console.log("test");
        if($scope.gotCandidate.hasOwnProperty("_5_claimedUnpaidDetailsEER") && $scope.gotCandidate._5_claimedUnpaidDetailsEER.length){
          for(i=0;i<$scope.gotCandidate._5_claimedUnpaidDetailsEER.length;i++){

            if($scope.gotCandidate._5_claimedUnpaidDetailsEER[i].hasOwnProperty('claimed_amt') && this.IsNumeric($scope.gotCandidate._5_claimedUnpaidDetailsEER[i].claimed_amt) && Number($scope.gotCandidate._5_claimedUnpaidDetailsEER[i].claimed_amt)){
              _5_claimedUnpaidDetailsTotalClaimedAmtEER+=Number($scope.gotCandidate._5_claimedUnpaidDetailsEER[i].claimed_amt);
            }
          }
          //$scope.gotCandidate._2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER=0;
          if(_5_claimedUnpaidDetailsTotalClaimedAmtEER)
            $scope.gotCandidate._5_claimedUnpaidDetailsTotalClaimedAmtEER=_5_claimedUnpaidDetailsTotalClaimedAmtEER;
        }
      };

      /*=======================***********************===================*/
      this.add_6_agentTakenMoneyEER = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_6_agentTakenMoneyEER"))
          $scope.gotCandidate._6_agentTakenMoneyEER=[];

        $scope.gotCandidate._6_agentTakenMoneyEER.push({});
      };
      this.delete_6_agentTakenMoneyEER = function(){
        $scope.gotCandidate._6_agentTakenMoneyEER.pop();
      };

      this.change_6_agentTakenMoneyEER=function(){
        var i= 0, _6_agentTakenMoneyTotalMoneyAmtEER=0;
        // console.log("test");
        if($scope.gotCandidate.hasOwnProperty("_6_agentTakenMoneyEER") && $scope.gotCandidate._6_agentTakenMoneyEER.length){
          for(i=0;i<$scope.gotCandidate._6_agentTakenMoneyEER.length;i++){

            if($scope.gotCandidate._6_agentTakenMoneyEER[i].hasOwnProperty('money_amt') && this.IsNumeric($scope.gotCandidate._6_agentTakenMoneyEER[i].money_amt) && Number($scope.gotCandidate._6_agentTakenMoneyEER[i].money_amt)){
              _6_agentTakenMoneyTotalMoneyAmtEER+=Number($scope.gotCandidate._6_agentTakenMoneyEER[i].money_amt);
            }
          }
          //$scope.gotCandidate._2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER=0;
          if(_6_agentTakenMoneyTotalMoneyAmtEER)
            $scope.gotCandidate._6_agentTakenMoneyTotalMoneyAmtEER=_6_agentTakenMoneyTotalMoneyAmtEER;
        }
      };


      /*===========Submit-Form============*/

      this.submit = function () {
        var _2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER= 0, _4ControversialClaimDetailsTotalClaimedAmtEER=0, _5_claimedUnpaidDetailsTotalClaimedAmtEER=0, _6_agentTakenMoneyTotalMoneyAmtEER= 0,totalClearUnclearAmt=0;

        function IsNumeric(input) {
          return (input - 0) == input && ('' + input).trim().length > 0;
        }

        $scope.gotCandidate.statusEER=true;
        $scope.gotCandidate.isPublishedEER=true;
        //$scope.gotCandidate.submissionDateEER=true;

        //_2ElectionExpenseDetailsEER
        var i=0;
        var totalClearUnclearAmt=0
        if($scope.gotCandidate.hasOwnProperty("_2ElectionExpenseDetailsEER") && $scope.gotCandidate._2ElectionExpenseDetailsEER.length){
          for(i=0;i<$scope.gotCandidate._2ElectionExpenseDetailsEER.length;i++){

            totalClearUnclearAmt=0;

            if($scope.gotCandidate._2ElectionExpenseDetailsEER[i].hasOwnProperty("clearedMoneyAmt") && IsNumeric($scope.gotCandidate._2ElectionExpenseDetailsEER[i].clearedMoneyAmt) && Number($scope.gotCandidate._2ElectionExpenseDetailsEER[i].clearedMoneyAmt)){
              _2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER+=Number($scope.gotCandidate._2ElectionExpenseDetailsEER[i].clearedMoneyAmt);
              totalClearUnclearAmt+=Number($scope.gotCandidate._2ElectionExpenseDetailsEER[i].clearedMoneyAmt);
            }

            if($scope.gotCandidate._2ElectionExpenseDetailsEER[i].hasOwnProperty("unclearedMoneyAmt") && IsNumeric($scope.gotCandidate._2ElectionExpenseDetailsEER[i].unclearedMoneyAmt) && Number($scope.gotCandidate._2ElectionExpenseDetailsEER[i].unclearedMoneyAmt)){

              _2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER+=Number($scope.gotCandidate._2ElectionExpenseDetailsEER[i].unclearedMoneyAmt);
              totalClearUnclearAmt+=Number($scope.gotCandidate._2ElectionExpenseDetailsEER[i].unclearedMoneyAmt);
            }

            $scope.gotCandidate.totalClearUnclearAmt=0;
            if(totalClearUnclearAmt)
              $scope.gotCandidate.totalClearUnclearAmt=totalClearUnclearAmt;

          }
        }
        $scope.gotCandidate._2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER=0;
        if(_2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER)
          $scope.gotCandidate._2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER=_2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER;

        //_4ControversialClaimDetails
        if($scope.gotCandidate.hasOwnProperty("_4ControversialClaimDetails") && $scope.gotCandidate._4ControversialClaimDetails.length){
          for(i=0;i<$scope.gotCandidate._4ControversialClaimDetails.length;i++){
            if($scope.gotCandidate._4ControversialClaimDetails[i].hasOwnProperty("claimedAmt") && IsNumeric($scope.gotCandidate._4ControversialClaimDetails[i].claimedAmt) && Number($scope.gotCandidate._4ControversialClaimDetails[i].claimedAmt))
              _4ControversialClaimDetailsTotalClaimedAmtEER+=Number($scope.gotCandidate._4ControversialClaimDetails[i].claimedAmt);
          }
        }
        $scope.gotCandidate._4ControversialClaimDetailsTotalClaimedAmtEER=0;
        if(_4ControversialClaimDetailsTotalClaimedAmtEER)
          $scope.gotCandidate._4ControversialClaimDetailsTotalClaimedAmtEER=_4ControversialClaimDetailsTotalClaimedAmtEER;

        //_5_claimedUnpaidDetailsEER
        if($scope.gotCandidate.hasOwnProperty("_5_claimedUnpaidDetailsEER") && $scope.gotCandidate._5_claimedUnpaidDetailsEER.length){
          for(i=0;i<$scope.gotCandidate._5_claimedUnpaidDetailsEER.length;i++){
            if($scope.gotCandidate._5_claimedUnpaidDetailsEER[i].hasOwnProperty("claimed_amt") && IsNumeric($scope.gotCandidate._5_claimedUnpaidDetailsEER[i].claimed_amt) && Number($scope.gotCandidate._5_claimedUnpaidDetailsEER[i].claimed_amt))
              _5_claimedUnpaidDetailsTotalClaimedAmtEER+=Number($scope.gotCandidate._5_claimedUnpaidDetailsEER[i].claimed_amt);
          }
        }
        $scope.gotCandidate._5_claimedUnpaidDetailsTotalClaimedAmtEER=0;
        if(_5_claimedUnpaidDetailsTotalClaimedAmtEER)
          $scope.gotCandidate._5_claimedUnpaidDetailsTotalClaimedAmtEER=_5_claimedUnpaidDetailsTotalClaimedAmtEER;

        //_6_agentTakenMoneyEER
        if($scope.gotCandidate.hasOwnProperty("_6_agentTakenMoneyEER") && $scope.gotCandidate._6_agentTakenMoneyEER.length){
          for(i=0;i<$scope.gotCandidate._6_agentTakenMoneyEER.length;i++){
            if($scope.gotCandidate._6_agentTakenMoneyEER[i].hasOwnProperty("money_amt") && IsNumeric($scope.gotCandidate._6_agentTakenMoneyEER[i].money_amt) && Number($scope.gotCandidate._6_agentTakenMoneyEER[i].money_amt))
              _6_agentTakenMoneyTotalMoneyAmtEER+=Number($scope.gotCandidate._6_agentTakenMoneyEER[i].money_amt);
          }
        }
        $scope.gotCandidate._6_agentTakenMoneyTotalMoneyAmtEER=0;
        if(_6_agentTakenMoneyTotalMoneyAmtEER)
          $scope.gotCandidate._6_agentTakenMoneyTotalMoneyAmtEER=_6_agentTakenMoneyTotalMoneyAmtEER;


        //$scope.gotCandidate._1total_abcdefgFSEE=$scope.gotCandidate._2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER+$scope.gotCandidate._4ControversialClaimDetailsTotalClaimedAmtEER+$scope.gotCandidate._5_claimedUnpaidDetailsTotalClaimedAmtEER+$scope.gotCandidate._6_agentTakenMoneyTotalMoneyAmtEER;
        //console.log($scope.gotCandidate);
        // console.log("before");
        User.getCurrent().$promise.then(function(user) {
          //console.log(user.id);
          $scope.gotCandidate.createdByEER = user.id;
          $scope.gotCandidate.modifiedByEER = user.id;
          CandidatesService.upsertCandidate($scope.gotCandidate).then(function (candidate) {
            //$state.go('^.list');
            if(candidate && candidate.hasOwnProperty("personNameBn") && candidate.personNameBn){
              CoreService.toastSuccess(
                gettextCatalog.getString('Candidate Updated'),
                gettextCatalog.getString('Your Candidate Election Expense Return form is save with us'));
              // console.log('candidate',candidate);
            }
          });
        });
        // console.log("after");

      }


    }]);

})();
