(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .controller('CandidateEditMurdhannoCrtl', ["$scope",'$stateParams','CandidatesService','CoreService','gettextCatalog', function ($scope,$stateParams,CandidatesService,CoreService,gettextCatalog) {
//console.log($stateParams);

      if(!$scope.gotCandidate){
        if($stateParams.hasOwnProperty("candidateId") && $stateParams.candidateId){
          CandidatesService.getCandidate($stateParams.candidateId).then(function(candidate){
            $scope.$parent.gotCandidate=candidate;

            if($scope.gotCandidate.hasOwnProperty('_1a_murdhanna_campaign_RallyEER') && $scope.gotCandidate._1a_murdhanna_campaign_RallyEER.length){
              var i=0;
              for(i=0;i<$scope.gotCandidate._1a_murdhanna_campaign_RallyEER.length;i++){
                if($scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].hasOwnProperty('date1'))
                  $scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].date1= new Date($scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].date1);
              }
            }
            if($scope.gotCandidate.hasOwnProperty('_1g_mu_ca_IndoorMeetingEER') && $scope.gotCandidate._1g_mu_ca_IndoorMeetingEER.length){
              var i=0;
              for(i=0;i<$scope.gotCandidate._1g_mu_ca_IndoorMeetingEER.length;i++){
                if($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].hasOwnProperty('date1'))
                  $scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].date1= new Date($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].date1);
              }
            }
            if($scope.gotCandidate.hasOwnProperty('_1k_mu_ca_CampOfficeEER') && $scope.gotCandidate._1k_mu_ca_CampOfficeEER.length){
              var i=0;
              for(i=0;i<$scope.gotCandidate._1k_mu_ca_CampOfficeEER.length;i++){
                if($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].hasOwnProperty('date1'))
                  $scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].date1= new Date($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].date1);
              }
            }
            if($scope.gotCandidate.hasOwnProperty('_1n_mu_ca_CandidateconveyanceEER') && $scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER.length){
              var i=0;
              for(i=0;i<$scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER.length;i++){
                if($scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER[i].hasOwnProperty('date1'))
                  $scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER[i].date1= new Date($scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER[i].date1);
              }
            }
            if($scope.gotCandidate.hasOwnProperty('_2ElectionExpenseDetailsEER') && $scope.gotCandidate._2ElectionExpenseDetailsEER.length){
              var i=0;
              for(i=0;i<$scope.gotCandidate._2ElectionExpenseDetailsEER.length;i++){
                if($scope.gotCandidate._2ElectionExpenseDetailsEER[i].hasOwnProperty('date1'))
                  $scope.gotCandidate._2ElectionExpenseDetailsEER[i].date1= new Date($scope.gotCandidate._2ElectionExpenseDetailsEER[i].date1);
                if($scope.gotCandidate._2ElectionExpenseDetailsEER[i].hasOwnProperty('date2'))
                  $scope.gotCandidate._2ElectionExpenseDetailsEER[i].date2= new Date($scope.gotCandidate._2ElectionExpenseDetailsEER[i].date2);
              }
            }
            if($scope.gotCandidate.hasOwnProperty('_4ControversialClaimDetails') && $scope.gotCandidate._4ControversialClaimDetails.length){
              var i=0;
              for(i=0;i<$scope.gotCandidate._4ControversialClaimDetails.length;i++){
                if($scope.gotCandidate._4ControversialClaimDetails[i].hasOwnProperty('date1'))
                  $scope.gotCandidate._4ControversialClaimDetails[i].date1= new Date($scope.gotCandidate._4ControversialClaimDetails[i].date1);
              }
            }
            if($scope.gotCandidate.hasOwnProperty('_5_claimedUnpaidDetailsEER') && $scope.gotCandidate._5_claimedUnpaidDetailsEER.length){
              var i=0;
              for(i=0;i<$scope.gotCandidate._5_claimedUnpaidDetailsEER.length;i++){
                if($scope.gotCandidate._5_claimedUnpaidDetailsEER[i].hasOwnProperty('date1'))
                  $scope.gotCandidate._5_claimedUnpaidDetailsEER[i].date1= new Date($scope.gotCandidate._5_claimedUnpaidDetailsEER[i].date1);
              }
            }
            if($scope.gotCandidate.hasOwnProperty('_6_agentTakenMoneyEER') && $scope.gotCandidate._6_agentTakenMoneyEER.length){
              var i=0;
              for(i=0;i<$scope.gotCandidate._6_agentTakenMoneyEER.length;i++){
                if($scope.gotCandidate._6_agentTakenMoneyEER[i].hasOwnProperty('date1'))
                  $scope.gotCandidate._6_agentTakenMoneyEER[i].date1= new Date($scope.gotCandidate._6_agentTakenMoneyEER[i].date1);
              }
            }






          });
        }
      }
      this.IsNumeric= function(input) {
        return (input - 0) == input && ('' + input).trim().length > 0;
      };



      /*=======================***********************===================*/
      this.add_2ElectionExpenseDetailsEER = function(){
        // console.log($scope.gotCandidate);
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


      /*============*********=MURDHONNO-PART-(SECOND-PART-EER)=**********===========*/
      this.add_1a_murdhanna_campaign_RallyEER = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1a_murdhanna_campaign_RallyEER"))
          $scope.gotCandidate._1a_murdhanna_campaign_RallyEER=[];

        $scope.gotCandidate._1a_murdhanna_campaign_RallyEER.push({});
      };
      this.delete_1a_murdhanna_campaign_RallyEER = function(){
        $scope.gotCandidate._1a_murdhanna_campaign_RallyEER.pop();
      };



      this.change_1a_murdhanna_campaign_RallyEER=function(){
        //$scope.date = new Date(item.date);
        //console.log('date');


        var i= 0,_1a_murdhanna_campaign_RallyTotalCostEER= 0,totalCostAmt5=0;
        //_1a_murdhanna_campaign_RallyEER
        if($scope.gotCandidate.hasOwnProperty("_1a_murdhanna_campaign_RallyEER") && $scope.gotCandidate._1a_murdhanna_campaign_RallyEER.length){
          for(i=0;i<$scope.gotCandidate._1a_murdhanna_campaign_RallyEER.length;i++){
            totalCostAmt5=0;
            if($scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].hasOwnProperty("mikeOrHandMikeCostAmt3") && this.IsNumeric($scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].mikeOrHandMikeCostAmt3) && Number($scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].mikeOrHandMikeCostAmt3)){
              totalCostAmt5+=Number($scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].mikeOrHandMikeCostAmt3);
              _1a_murdhanna_campaign_RallyTotalCostEER+=Number($scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].mikeOrHandMikeCostAmt3);
            }
            if($scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].hasOwnProperty("otherCostAmt4") && this.IsNumeric($scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].otherCostAmt4) && Number($scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].otherCostAmt4)){
              totalCostAmt5+=Number($scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].otherCostAmt4);
              _1a_murdhanna_campaign_RallyTotalCostEER+=Number($scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].otherCostAmt4);
            }

            if(totalCostAmt5)
              $scope.gotCandidate._1a_murdhanna_campaign_RallyEER[i].totalCostAmt5=totalCostAmt5;
          }
        }
        $scope.gotCandidate._1a_murdhanna_campaign_RallyTotalCostEER=0;
        if(_1a_murdhanna_campaign_RallyTotalCostEER)
          $scope.gotCandidate._1a_murdhanna_campaign_RallyTotalCostEER=_1a_murdhanna_campaign_RallyTotalCostEER;
      };

      /*=======================***********************===================*/
      this.add_1b_mu_ca_PosterEER = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1b_mu_ca_PosterEER"))
          $scope.gotCandidate._1b_mu_ca_PosterEER=[];

        $scope.gotCandidate._1b_mu_ca_PosterEER.push({});
      };
      this.delete_1b_mu_ca_PosterEER=function(){
        $scope.gotCandidate._1b_mu_ca_PosterEER.pop();
      };

      this.change_1b_mu_ca_PosterEER=function(){
        var i= 0, _1b_mu_ca_PosterEER= 0, allTotalCost10= 0, eachPosterCostTotal5= 0, _1b_mu_ca_PosterTotalCostEER=0;
        if($scope.gotCandidate.hasOwnProperty("_1b_mu_ca_PosterEER") && $scope.gotCandidate._1b_mu_ca_PosterEER.length){

          for(i=0;i<$scope.gotCandidate._1b_mu_ca_PosterEER.length;i++){
            allTotalCost10=0;
            eachPosterCostTotal5=0;
            if($scope.gotCandidate._1b_mu_ca_PosterEER[i].hasOwnProperty('designCost2') && this.IsNumeric($scope.gotCandidate._1b_mu_ca_PosterEER[i].designCost2) && Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].designCost2)){
              allTotalCost10+=Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].designCost2);
              _1b_mu_ca_PosterTotalCostEER+=Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].designCost2);
            }
            if($scope.gotCandidate._1b_mu_ca_PosterEER[i].hasOwnProperty('printAndPageTotalCost6') && this.IsNumeric($scope.gotCandidate._1b_mu_ca_PosterEER[i].printAndPageTotalCost6) && Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].printAndPageTotalCost6)){
              allTotalCost10+=Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].printAndPageTotalCost6);
              _1b_mu_ca_PosterTotalCostEER+=Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].printAndPageTotalCost6);
            }
            if($scope.gotCandidate._1b_mu_ca_PosterEER[i].hasOwnProperty('vehicleCost7b') && this.IsNumeric($scope.gotCandidate._1b_mu_ca_PosterEER[i].vehicleCost7b) && Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].vehicleCost7b)){
              allTotalCost10+=Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].vehicleCost7b);
              _1b_mu_ca_PosterTotalCostEER+=Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].vehicleCost7b);
            }
            if($scope.gotCandidate._1b_mu_ca_PosterEER[i].hasOwnProperty('hangingCost8b') && this.IsNumeric($scope.gotCandidate._1b_mu_ca_PosterEER[i].hangingCost8b) && Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].hangingCost8b)){
              allTotalCost10+=Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].hangingCost8b);
              _1b_mu_ca_PosterTotalCostEER+=Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].hangingCost8b);
            }
            if($scope.gotCandidate._1b_mu_ca_PosterEER[i].hasOwnProperty('otherCost9') && this.IsNumeric($scope.gotCandidate._1b_mu_ca_PosterEER[i].otherCost9) && Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].otherCost9)){
              allTotalCost10+=Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].otherCost9);
              _1b_mu_ca_PosterTotalCostEER+=Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].otherCost9);
            }

            if($scope.gotCandidate._1b_mu_ca_PosterEER[i].hasOwnProperty('eachPosterCostPrint5a') && this.IsNumeric($scope.gotCandidate._1b_mu_ca_PosterEER[i].eachPosterCostPrint5a) && Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].eachPosterCostPrint5a)){
              eachPosterCostTotal5+=Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].eachPosterCostPrint5a);
            }
            if($scope.gotCandidate._1b_mu_ca_PosterEER[i].hasOwnProperty('eachPosterCostPage5b') && this.IsNumeric($scope.gotCandidate._1b_mu_ca_PosterEER[i].eachPosterCostPage5b) && Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].eachPosterCostPage5b)){
              eachPosterCostTotal5+=Number($scope.gotCandidate._1b_mu_ca_PosterEER[i].eachPosterCostPage5b);
            }

            if(eachPosterCostTotal5)
              $scope.gotCandidate._1b_mu_ca_PosterEER[i].eachPosterCostTotal5=eachPosterCostTotal5;
            if(allTotalCost10)
              $scope.gotCandidate._1b_mu_ca_PosterEER[i].allTotalCost10=allTotalCost10;

          }
        }
        $scope.gotCandidate._1b_mu_ca_PosterTotalCostEER=0;
        if(_1b_mu_ca_PosterTotalCostEER)
          $scope.gotCandidate._1b_mu_ca_PosterTotalCostEER=_1b_mu_ca_PosterTotalCostEER;

      };

      /*=======================***********************===================*/
      this.add_1c_mu_ca_LeafletEER = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1c_mu_ca_LeafletEER"))
          $scope.gotCandidate._1c_mu_ca_LeafletEER=[];

        $scope.gotCandidate._1c_mu_ca_LeafletEER.push({});
      };
      this.delete_1c_mu_ca_LeafletEER=function(){
        $scope.gotCandidate._1c_mu_ca_LeafletEER.pop();
      };

      this.change_1c_mu_ca_LeafletEER=function(){
        var i= 0, allTotalCost10= 0, eachLeafletCostTotal5= 0, _1c_mu_ca_LeafletTotalCostEER=0;
        if($scope.gotCandidate.hasOwnProperty("_1c_mu_ca_LeafletEER") && $scope.gotCandidate._1c_mu_ca_LeafletEER.length){
          for(i=0;i<$scope.gotCandidate._1c_mu_ca_LeafletEER.length;i++){
            allTotalCost10= 0;
            eachLeafletCostTotal5=0;
            if($scope.gotCandidate._1c_mu_ca_LeafletEER[i].hasOwnProperty('designCost2') && this.IsNumeric($scope.gotCandidate._1c_mu_ca_LeafletEER[i].designCost2) && Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].designCost2)){
              allTotalCost10+=Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].designCost2);
              _1c_mu_ca_LeafletTotalCostEER+=Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].designCost2);
            }
            if($scope.gotCandidate._1c_mu_ca_LeafletEER[i].hasOwnProperty('printAndPageTotalCost6') && this.IsNumeric($scope.gotCandidate._1c_mu_ca_LeafletEER[i].printAndPageTotalCost6) && Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].printAndPageTotalCost6)){
              allTotalCost10+=Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].printAndPageTotalCost6);
              _1c_mu_ca_LeafletTotalCostEER+=Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].printAndPageTotalCost6);
            }
            if($scope.gotCandidate._1c_mu_ca_LeafletEER[i].hasOwnProperty('vehicleCost7b') && this.IsNumeric($scope.gotCandidate._1c_mu_ca_LeafletEER[i].vehicleCost7b) && Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].vehicleCost7b)){
              allTotalCost10+=Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].vehicleCost7b);
              _1c_mu_ca_LeafletTotalCostEER+=Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].vehicleCost7b);
            }
            if($scope.gotCandidate._1c_mu_ca_LeafletEER[i].hasOwnProperty('distributionCost8b') && this.IsNumeric($scope.gotCandidate._1c_mu_ca_LeafletEER[i].distributionCost8b) && Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].distributionCost8b)){
              allTotalCost10+=Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].distributionCost8b);
              _1c_mu_ca_LeafletTotalCostEER+=Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].distributionCost8b);
            }
            if($scope.gotCandidate._1c_mu_ca_LeafletEER[i].hasOwnProperty('otherCost9') && this.IsNumeric($scope.gotCandidate._1c_mu_ca_LeafletEER[i].otherCost9) && Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].otherCost9)){
              allTotalCost10+=Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].otherCost9);
              _1c_mu_ca_LeafletTotalCostEER+=Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].otherCost9);
            }

            if($scope.gotCandidate._1c_mu_ca_LeafletEER[i].hasOwnProperty('eachLeafletCostPrint5a') && this.IsNumeric($scope.gotCandidate._1c_mu_ca_LeafletEER[i].eachLeafletCostPrint5a) && Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].eachLeafletCostPrint5a)){
              eachLeafletCostTotal5+=Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].eachLeafletCostPrint5a);
            }
            if($scope.gotCandidate._1c_mu_ca_LeafletEER[i].hasOwnProperty('eachLeafletCostPage5b') && this.IsNumeric($scope.gotCandidate._1c_mu_ca_LeafletEER[i].eachLeafletCostPage5b) && Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].eachLeafletCostPage5b)){
              eachLeafletCostTotal5+=Number($scope.gotCandidate._1c_mu_ca_LeafletEER[i].eachLeafletCostPage5b);
            }

            if(eachLeafletCostTotal5)
              $scope.gotCandidate._1c_mu_ca_LeafletEER[i].eachLeafletCostTotal5=eachLeafletCostTotal5;
            if(allTotalCost10)
              $scope.gotCandidate._1c_mu_ca_LeafletEER[i].allTotalCost10=allTotalCost10;
          }

          $scope.gotCandidate._1c_mu_ca_LeafletTotalCostEER=0;
          if(_1c_mu_ca_LeafletTotalCostEER)
            $scope.gotCandidate._1c_mu_ca_LeafletTotalCostEER=_1c_mu_ca_LeafletTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1d_mu_ca_HandbillEER = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1d_mu_ca_HandbillEER"))
          $scope.gotCandidate._1d_mu_ca_HandbillEER=[];

        $scope.gotCandidate._1d_mu_ca_HandbillEER.push({});
      };
      this.delete_1d_mu_ca_HandbillEER=function(){
        $scope.gotCandidate._1d_mu_ca_HandbillEER.pop();
      };

      this.change_1d_mu_ca_HandbillEER=function(){
        // console.log("msg");
        var i= 0, allTotalCost10= 0, eachHandbillCostTotal5= 0, _1d_mu_ca_HandbillTotalCostEER=0;
        if ($scope.gotCandidate.hasOwnProperty("_1d_mu_ca_HandbillEER") && $scope.gotCandidate._1d_mu_ca_HandbillEER.length ){
          for (i=0; i<$scope.gotCandidate._1d_mu_ca_HandbillEER.length; i++){
            allTotalCost10= 0;
            eachHandbillCostTotal5=0;

            if($scope.gotCandidate._1d_mu_ca_HandbillEER[i].hasOwnProperty('designCost2') && this.IsNumeric($scope.gotCandidate._1d_mu_ca_HandbillEER[i].designCost2) && Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].designCost2)){
              allTotalCost10+=Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].designCost2);
              _1d_mu_ca_HandbillTotalCostEER+=Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].designCost2);
            }
            if($scope.gotCandidate._1d_mu_ca_HandbillEER[i].hasOwnProperty('printAndPageTotalCost6') && this.IsNumeric($scope.gotCandidate._1d_mu_ca_HandbillEER[i].printAndPageTotalCost6) && Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].printAndPageTotalCost6)){
              allTotalCost10+=Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].printAndPageTotalCost6);
              _1d_mu_ca_HandbillTotalCostEER+=Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].printAndPageTotalCost6);
            }
            if($scope.gotCandidate._1d_mu_ca_HandbillEER[i].hasOwnProperty('vehicleCost7b') && this.IsNumeric($scope.gotCandidate._1d_mu_ca_HandbillEER[i].vehicleCost7b) && Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].vehicleCost7b)){
              allTotalCost10+=Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].vehicleCost7b);
              _1d_mu_ca_HandbillTotalCostEER+=Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].vehicleCost7b);
            }
            if($scope.gotCandidate._1d_mu_ca_HandbillEER[i].hasOwnProperty('distributionCost8b') && this.IsNumeric($scope.gotCandidate._1d_mu_ca_HandbillEER[i].distributionCost8b) && Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].distributionCost8b)){
              allTotalCost10+=Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].distributionCost8b);
              _1d_mu_ca_HandbillTotalCostEER+=Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].distributionCost8b);
            }
            if($scope.gotCandidate._1d_mu_ca_HandbillEER[i].hasOwnProperty('otherCost9') && this.IsNumeric($scope.gotCandidate._1d_mu_ca_HandbillEER[i].otherCost9) && Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].otherCost9)){
              allTotalCost10+=Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].otherCost9);
              _1d_mu_ca_HandbillTotalCostEER+=Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].otherCost9);
            }

            if($scope.gotCandidate._1d_mu_ca_HandbillEER[i].hasOwnProperty('eachHandbillCostPrint5a') && this.IsNumeric($scope.gotCandidate._1d_mu_ca_HandbillEER[i].eachHandbillCostPrint5a) && Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].eachHandbillCostPrint5a)){
              eachHandbillCostTotal5+=Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].eachHandbillCostPrint5a);
            }
            if($scope.gotCandidate._1d_mu_ca_HandbillEER[i].hasOwnProperty('eachHandbillCostPage5b') && this.IsNumeric($scope.gotCandidate._1d_mu_ca_HandbillEER[i].eachHandbillCostPage5b) && Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].eachHandbillCostPage5b)){
              eachHandbillCostTotal5+=Number($scope.gotCandidate._1d_mu_ca_HandbillEER[i].eachHandbillCostPage5b);
            }

            if(eachHandbillCostTotal5)
              $scope.gotCandidate._1d_mu_ca_HandbillEER[i].eachHandbillCostTotal5=eachHandbillCostTotal5;

            if(allTotalCost10)
              $scope.gotCandidate._1d_mu_ca_HandbillEER[i].allTotalCost10=allTotalCost10;
          }


          $scope.gotCandidate._1d_mu_ca_HandbillTotalCostEER=0;
          if(_1d_mu_ca_HandbillTotalCostEER)
            $scope.gotCandidate._1d_mu_ca_HandbillTotalCostEER=_1d_mu_ca_HandbillTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1e_mu_ca_StickerEER = function(){
        //console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1e_mu_ca_StickerEER"))
          $scope.gotCandidate._1e_mu_ca_StickerEER=[];

        $scope.gotCandidate._1e_mu_ca_StickerEER.push({});
      };
      this.delete_1e_mu_ca_StickerEER=function(){
        $scope.gotCandidate._1e_mu_ca_StickerEER.pop();
      };

      this.change_1e_mu_ca_StickerEER=function(){
        var i= 0, allTotalCost10= 0, eachStickerbillCostTotal5= 0, _1e_mu_ca_StickerTotalCostEER=0;
        //console.log("test");
        if ($scope.gotCandidate.hasOwnProperty("_1e_mu_ca_StickerEER") && $scope.gotCandidate._1e_mu_ca_StickerEER.length ){
          for (i=0; i<$scope.gotCandidate._1e_mu_ca_StickerEER.length; i++){
            allTotalCost10=0;
            eachStickerbillCostTotal5=0;

            if($scope.gotCandidate._1e_mu_ca_StickerEER[i].hasOwnProperty('designCost2') && this.IsNumeric($scope.gotCandidate._1e_mu_ca_StickerEER[i].designCost2) && Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].designCost2)){
              allTotalCost10+=Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].designCost2);
              _1e_mu_ca_StickerTotalCostEER+=Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].designCost2);
            }
            if($scope.gotCandidate._1e_mu_ca_StickerEER[i].hasOwnProperty('printAndPageTotalCost6') && this.IsNumeric($scope.gotCandidate._1e_mu_ca_StickerEER[i].printAndPageTotalCost6) && Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].printAndPageTotalCost6)){
              allTotalCost10+=Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].printAndPageTotalCost6);
              _1e_mu_ca_StickerTotalCostEER+=Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].printAndPageTotalCost6);
            }
            if($scope.gotCandidate._1e_mu_ca_StickerEER[i].hasOwnProperty('vehicleCost7b') && this.IsNumeric($scope.gotCandidate._1e_mu_ca_StickerEER[i].vehicleCost7b) && Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].vehicleCost7b)){
              allTotalCost10+=Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].vehicleCost7b);
              _1e_mu_ca_StickerTotalCostEER+=Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].vehicleCost7b);
            }
            if($scope.gotCandidate._1e_mu_ca_StickerEER[i].hasOwnProperty('distributionCost8b') && this.IsNumeric($scope.gotCandidate._1e_mu_ca_StickerEER[i].distributionCost8b) && Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].distributionCost8b)){
              allTotalCost10+=Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].distributionCost8b);
              _1e_mu_ca_StickerTotalCostEER+=Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].distributionCost8b);
            }
            if($scope.gotCandidate._1e_mu_ca_StickerEER[i].hasOwnProperty('otherCost9') && this.IsNumeric($scope.gotCandidate._1e_mu_ca_StickerEER[i].otherCost9) && Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].otherCost9)){
              allTotalCost10+=Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].otherCost9);
              _1e_mu_ca_StickerTotalCostEER+=Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].otherCost9);
            }

            if($scope.gotCandidate._1e_mu_ca_StickerEER[i].hasOwnProperty('eachStickerbillCostPrint5a') && this.IsNumeric($scope.gotCandidate._1e_mu_ca_StickerEER[i].eachStickerbillCostPrint5a) && Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].eachStickerbillCostPrint5a)){
              eachStickerbillCostTotal5+=Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].eachStickerbillCostPrint5a);
            }
            if($scope.gotCandidate._1e_mu_ca_StickerEER[i].hasOwnProperty('eachStickerbillCostPage5b') && this.IsNumeric($scope.gotCandidate._1e_mu_ca_StickerEER[i].eachStickerbillCostPage5b) && Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].eachStickerbillCostPage5b)){
              eachStickerbillCostTotal5+=Number($scope.gotCandidate._1e_mu_ca_StickerEER[i].eachStickerbillCostPage5b);
            }

            if(eachStickerbillCostTotal5)
              $scope.gotCandidate._1e_mu_ca_StickerEER[i].eachStickerbillCostTotal5=eachStickerbillCostTotal5;
            if(allTotalCost10)
              $scope.gotCandidate._1e_mu_ca_StickerEER[i].allTotalCost10=allTotalCost10;

          }

          $scope.gotCandidate._1e_mu_ca_StickerTotalCostEER=0;
          if(_1e_mu_ca_StickerTotalCostEER)
            $scope.gotCandidate._1e_mu_ca_StickerTotalCostEER=_1e_mu_ca_StickerTotalCostEER;
        }

      };

      /*=======================***********************===================*/
      this.add_1fa_mu_ca_BannerEER = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1fa_mu_ca_BannerEER"))
          $scope.gotCandidate._1fa_mu_ca_BannerEER=[];

        $scope.gotCandidate._1fa_mu_ca_BannerEER.push({});
      };
      this.delete_1fa_mu_ca_BannerEER=function(){
        $scope.gotCandidate._1fa_mu_ca_BannerEER.pop();
      };

      this.change_1fa_mu_ca_BannerEER=function(){
        var i= 0, eachBannerCostTotal4= 0, allTotalCost9= 0, _1fa_mu_ca_BannerTotalCostEER=0;

        if ($scope.gotCandidate.hasOwnProperty("_1fa_mu_ca_BannerEER") && $scope.gotCandidate._1fa_mu_ca_BannerEER.length ) {
          for (i = 0; i < $scope.gotCandidate._1fa_mu_ca_BannerEER.length; i++) {
            allTotalCost9 = 0;
            eachBannerCostTotal4 = 0;

            if($scope.gotCandidate._1fa_mu_ca_BannerEER[i].hasOwnProperty('bannerTotalCost5') && this.IsNumeric($scope.gotCandidate._1fa_mu_ca_BannerEER[i].bannerTotalCost5) && Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].bannerTotalCost5)){
              allTotalCost9+=Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].bannerTotalCost5);
              _1fa_mu_ca_BannerTotalCostEER+=Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].bannerTotalCost5);
            }
            if($scope.gotCandidate._1fa_mu_ca_BannerEER[i].hasOwnProperty('vehicleCost6b') && this.IsNumeric($scope.gotCandidate._1fa_mu_ca_BannerEER[i].vehicleCost6b) && Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].vehicleCost6b)){
              allTotalCost9+=Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].vehicleCost6b);
              _1fa_mu_ca_BannerTotalCostEER+=Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].vehicleCost6b);
            }
            if($scope.gotCandidate._1fa_mu_ca_BannerEER[i].hasOwnProperty('hangingCost7b') && this.IsNumeric($scope.gotCandidate._1fa_mu_ca_BannerEER[i].hangingCost7b) && Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].hangingCost7b)){
              allTotalCost9+=Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].hangingCost7b);
              _1fa_mu_ca_BannerTotalCostEER+=Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].hangingCost7b);
            }
            if($scope.gotCandidate._1fa_mu_ca_BannerEER[i].hasOwnProperty('otherCost8') && this.IsNumeric($scope.gotCandidate._1fa_mu_ca_BannerEER[i].otherCost8) && Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].otherCost8)){
              allTotalCost9+=Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].otherCost8);
              _1fa_mu_ca_BannerTotalCostEER+=Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].otherCost8);
            }

            if($scope.gotCandidate._1fa_mu_ca_BannerEER[i].hasOwnProperty('eachBannerCostCloth4a') && this.IsNumeric($scope.gotCandidate._1fa_mu_ca_BannerEER[i].eachBannerCostCloth4a) && Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].eachBannerCostCloth4a)){
              eachBannerCostTotal4+=Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].eachBannerCostCloth4a);
            }
            if($scope.gotCandidate._1fa_mu_ca_BannerEER[i].hasOwnProperty('eachBannerCostWriting4b') && this.IsNumeric($scope.gotCandidate._1fa_mu_ca_BannerEER[i].eachBannerCostWriting4b) && Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].eachBannerCostWriting4b)){
              eachBannerCostTotal4+=Number($scope.gotCandidate._1fa_mu_ca_BannerEER[i].eachBannerCostWriting4b);
            }

            if(eachBannerCostTotal4)
              $scope.gotCandidate._1fa_mu_ca_BannerEER[i].eachBannerCostTotal4=eachBannerCostTotal4;
            if(allTotalCost9)
              $scope.gotCandidate._1fa_mu_ca_BannerEER[i].allTotalCost9=allTotalCost9;
          }

          $scope.gotCandidate._1fa_mu_ca_BannerTotalCostEER=0;
          if(_1fa_mu_ca_BannerTotalCostEER)
            $scope.gotCandidate._1fa_mu_ca_BannerTotalCostEER=_1fa_mu_ca_BannerTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1fb_mu_ca_DigitalBannerEER = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1fb_mu_ca_DigitalBannerEER"))
          $scope.gotCandidate._1fb_mu_ca_DigitalBannerEER=[];

        $scope.gotCandidate._1fb_mu_ca_DigitalBannerEER.push({});
      };
      this.delete_1fb_mu_ca_DigitalBannerEER=function(){
        $scope.gotCandidate._1fb_mu_ca_DigitalBannerEER.pop();
      };

      this.change_1fb_mu_ca_DigitalBannerEER=function(){
        var i= 0, eachBannerCostTotal3= 0, allTotalCost8= 0, _1fb_mu_ca_DigitalBannerTotalCostEER=0;
        // console.log("test");
        if ($scope.gotCandidate.hasOwnProperty("_1fb_mu_ca_DigitalBannerEER") && $scope.gotCandidate._1fb_mu_ca_DigitalBannerEER.length ) {
          for (i = 0; i < $scope.gotCandidate._1fb_mu_ca_DigitalBannerEER.length; i++) {
            allTotalCost8 = 0;
            eachBannerCostTotal3 = 0;

            if($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].hasOwnProperty('bannerTotalCost4') && this.IsNumeric($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].bannerTotalCost4) && Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].bannerTotalCost4)){
              allTotalCost8+=Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].bannerTotalCost4);
              _1fb_mu_ca_DigitalBannerTotalCostEER+=Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].bannerTotalCost4);
            }
            if($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].hasOwnProperty('vehicleCost5b') && this.IsNumeric($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].vehicleCost5b) && Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].vehicleCost5b)){
              allTotalCost8+=Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].vehicleCost5b);
              _1fb_mu_ca_DigitalBannerTotalCostEER+=Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].vehicleCost5b);
            }
            if($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].hasOwnProperty('hangingCost6b') && this.IsNumeric($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].hangingCost6b) && Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].hangingCost6b)){
              allTotalCost8+=Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].hangingCost6b);
              _1fb_mu_ca_DigitalBannerTotalCostEER+=Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].hangingCost6b);
            }
            if($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].hasOwnProperty('otherCost7') && this.IsNumeric($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].otherCost7) && Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].otherCost7)){
              allTotalCost8+=Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].otherCost7);
              _1fb_mu_ca_DigitalBannerTotalCostEER+=Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].otherCost7);
            }

            if($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].hasOwnProperty('eachBannerCostSynthetic3a') && this.IsNumeric($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].eachBannerCostSynthetic3a) && Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].eachBannerCostSynthetic3a)){
              eachBannerCostTotal3+=Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].eachBannerCostSynthetic3a);
            }
            if($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].hasOwnProperty('eachBannerCostcloth3b') && this.IsNumeric($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].eachBannerCostcloth3b) && Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].eachBannerCostcloth3b)){
              eachBannerCostTotal3+=Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].eachBannerCostcloth3b);
            }
            if($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].hasOwnProperty('eachBannerCostPrint3c') && this.IsNumeric($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].eachBannerCostPrint3c) && Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].eachBannerCostPrint3c)){
              eachBannerCostTotal3+=Number($scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].eachBannerCostPrint3c);
            }

            if(eachBannerCostTotal3)
              $scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].eachBannerCostTotal3=eachBannerCostTotal3;
            if(allTotalCost8)
              $scope.gotCandidate._1fb_mu_ca_DigitalBannerEER[i].allTotalCost8=allTotalCost8;
          }

          $scope.gotCandidate._1fb_mu_ca_DigitalBannerTotalCostEER=0;
          if(_1fb_mu_ca_DigitalBannerTotalCostEER)
            $scope.gotCandidate._1fb_mu_ca_DigitalBannerTotalCostEER=_1fb_mu_ca_DigitalBannerTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1g_mu_ca_IndoorMeetingEER = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1g_mu_ca_IndoorMeetingEER"))
          $scope.gotCandidate._1g_mu_ca_IndoorMeetingEER=[];

        $scope.gotCandidate._1g_mu_ca_IndoorMeetingEER.push({});
      };
      this.delete_1g_mu_ca_IndoorMeetingEER=function(){
        $scope.gotCandidate._1g_mu_ca_IndoorMeetingEER.pop();
      };

      this.change_1g_mu_ca_IndoorMeetingEER=function(){
        var i= 0, workerTotalCost5= 0, furnitureTotalCost6= 0, allTotalCost8= 0, _1g_mu_ca_IndoorMeetingTotalCostEER=0;
        // console.log("test");
        if ($scope.gotCandidate.hasOwnProperty("_1g_mu_ca_IndoorMeetingEER") && $scope.gotCandidate._1g_mu_ca_IndoorMeetingEER.length ) {
          for (i = 0; i < $scope.gotCandidate._1g_mu_ca_IndoorMeetingEER.length; i++) {
            allTotalCost8 = 0;
            workerTotalCost5=0;
            furnitureTotalCost6=0;

            if($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].hasOwnProperty('venueCost3') && this.IsNumeric($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].venueCost3) && Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].venueCost3)){
              allTotalCost8+=Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].venueCost3);
              _1g_mu_ca_IndoorMeetingTotalCostEER+=Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].venueCost3);
            }
            if($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].hasOwnProperty('otherCost7') && this.IsNumeric($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].otherCost7) && Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].otherCost7)){
              allTotalCost8+=Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].otherCost7);
              _1g_mu_ca_IndoorMeetingTotalCostEER+=Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].otherCost7);
            }

            if($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].hasOwnProperty('workerQuantity4a') && this.IsNumeric($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].workerQuantity4a) && Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].workerQuantity4a)){
              workerTotalCost5+=Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].workerQuantity4a);
              _1g_mu_ca_IndoorMeetingTotalCostEER+=Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].workerQuantity4a);
            }
            if($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].hasOwnProperty('workerUnitCost4b') && this.IsNumeric($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].workerUnitCost4b) && Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].workerUnitCost4b)){
              workerTotalCost5+=Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].workerUnitCost4b);
              _1g_mu_ca_IndoorMeetingTotalCostEER+=Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].workerUnitCost4b);
            }

            if($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].hasOwnProperty('furnitureQuantity6a') && this.IsNumeric($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].furnitureQuantity6a) && Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].furnitureQuantity6a)){
              furnitureTotalCost6+=Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].furnitureQuantity6a);
            }
            if($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].hasOwnProperty('furnitureUnitCost6b') && this.IsNumeric($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].furnitureUnitCost6b) && Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].furnitureUnitCost6b)){
              furnitureTotalCost6+=Number($scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].furnitureUnitCost6b);
            }

            if(workerTotalCost5)
              $scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].workerTotalCost5=workerTotalCost5;
            if(furnitureTotalCost6)
              $scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].furnitureTotalCost6=furnitureTotalCost6;
            if(allTotalCost8)
              $scope.gotCandidate._1g_mu_ca_IndoorMeetingEER[i].allTotalCost8=allTotalCost8;
          }

          $scope.gotCandidate._1g_mu_ca_IndoorMeetingTotalCostEER=0;
          if(_1g_mu_ca_IndoorMeetingTotalCostEER)
            $scope.gotCandidate._1g_mu_ca_IndoorMeetingTotalCostEER=_1g_mu_ca_IndoorMeetingTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1h_mu_ca_MikingEER = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1h_mu_ca_MikingEER"))
          $scope.gotCandidate._1h_mu_ca_MikingEER=[];
        $scope.gotCandidate._1h_mu_ca_MikingEER.push({});
      };
      this.delete_1h_mu_ca_MikingEER=function(){
        $scope.gotCandidate._1h_mu_ca_MikingEER.pop();
      };

      this.change_1h_mu_ca_MikingEER=function(){
        var i= 0, allTotalCost6= 0, _1h_mu_ca_MikingTotalCostEER=0;
        if($scope.gotCandidate.hasOwnProperty("_1h_mu_ca_MikingEER") && $scope.gotCandidate._1h_mu_ca_MikingEER.length){

          for(i=0;i<$scope.gotCandidate._1h_mu_ca_MikingEER.length;i++){
            allTotalCost6=0;
            if($scope.gotCandidate._1h_mu_ca_MikingEER[i].hasOwnProperty('vehicleCost3') && this.IsNumeric($scope.gotCandidate._1h_mu_ca_MikingEER[i].vehicleCost3) && Number($scope.gotCandidate._1h_mu_ca_MikingEER[i].vehicleCost3)){
              allTotalCost6+=Number($scope.gotCandidate._1h_mu_ca_MikingEER[i].vehicleCost3);
              _1h_mu_ca_MikingTotalCostEER+=Number($scope.gotCandidate._1h_mu_ca_MikingEER[i].vehicleCost3);
            }
            if($scope.gotCandidate._1h_mu_ca_MikingEER[i].hasOwnProperty('workerCost4') && this.IsNumeric($scope.gotCandidate._1h_mu_ca_MikingEER[i].workerCost4) && Number($scope.gotCandidate._1h_mu_ca_MikingEER[i].workerCost4)){
              allTotalCost6+=Number($scope.gotCandidate._1h_mu_ca_MikingEER[i].workerCost4);
              _1h_mu_ca_MikingTotalCostEER+=Number($scope.gotCandidate._1h_mu_ca_MikingEER[i].workerCost4);
            }
            if($scope.gotCandidate._1h_mu_ca_MikingEER[i].hasOwnProperty('otherCost5') && this.IsNumeric($scope.gotCandidate._1h_mu_ca_MikingEER[i].otherCost5) && Number($scope.gotCandidate._1h_mu_ca_MikingEER[i].otherCost5)){
              allTotalCost6+=Number($scope.gotCandidate._1h_mu_ca_MikingEER[i].otherCost5);
              _1h_mu_ca_MikingTotalCostEER+=Number($scope.gotCandidate._1h_mu_ca_MikingEER[i].otherCost5);
            }

            if(allTotalCost6)
              $scope.gotCandidate._1h_mu_ca_MikingEER[i].allTotalCost6=allTotalCost6;

          }

          $scope.gotCandidate._1h_mu_ca_MikingTotalCostEER=0;
          if(_1h_mu_ca_MikingTotalCostEER)
            $scope.gotCandidate._1h_mu_ca_MikingTotalCostEER=_1h_mu_ca_MikingTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1i_mu_ca_PotraitEER = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1i_mu_ca_PotraitEER"))
          $scope.gotCandidate._1i_mu_ca_PotraitEER=[];
        $scope.gotCandidate._1i_mu_ca_PotraitEER.push({});
      };
      this.delete_1i_mu_ca_PotraitEER=function(){
        $scope.gotCandidate._1i_mu_ca_PotraitEER.pop();
      };

      this.change_1i_mu_ca_PotraitEER=function(){
        var i= 0, allTotalCost8= 0, eachPotraitCostPaperPrint3c= 0, _1i_mu_ca_PotraitTotalCostEER=0;
        // console.log("test");

        if($scope.gotCandidate.hasOwnProperty("_1i_mu_ca_PotraitEER") && $scope.gotCandidate._1i_mu_ca_PotraitEER.length){
          for(i=0;i<$scope.gotCandidate._1i_mu_ca_PotraitEER.length;i++){
            allTotalCost8=0;
            eachPotraitCostPaperPrint3c=0;

            if($scope.gotCandidate._1i_mu_ca_PotraitEER[i].hasOwnProperty('eachPotraitCostPaperTotalCost3') && this.IsNumeric($scope.gotCandidate._1i_mu_ca_PotraitEER[i].eachPotraitCostPaperTotalCost3) && Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].eachPotraitCostPaperTotalCost3)){
              allTotalCost8+=Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].eachPotraitCostPaperTotalCost3);
              _1i_mu_ca_PotraitTotalCostEER+=Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].eachPotraitCostPaperTotalCost3);
            }
            if($scope.gotCandidate._1i_mu_ca_PotraitEER[i].hasOwnProperty('vehicleCost5b') && this.IsNumeric($scope.gotCandidate._1i_mu_ca_PotraitEER[i].vehicleCost5b) && Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].vehicleCost5b)){
              allTotalCost8+=Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].vehicleCost5b);
              _1i_mu_ca_PotraitTotalCostEER+=Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].vehicleCost5b);
            }
            if($scope.gotCandidate._1i_mu_ca_PotraitEER[i].hasOwnProperty('hangingCost6b') && this.IsNumeric($scope.gotCandidate._1i_mu_ca_PotraitEER[i].hangingCost6b) && Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].hangingCost6b)){
              allTotalCost8+=Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].hangingCost6b);
              _1i_mu_ca_PotraitTotalCostEER+=Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].hangingCost6b);
            }
            if($scope.gotCandidate._1i_mu_ca_PotraitEER[i].hasOwnProperty('otherCost7') && this.IsNumeric($scope.gotCandidate._1i_mu_ca_PotraitEER[i].otherCost7) && Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].otherCost7)){
              allTotalCost8+=Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].otherCost7);
              _1i_mu_ca_PotraitTotalCostEER+=Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].otherCost7);
            }


            if($scope.gotCandidate._1i_mu_ca_PotraitEER[i].hasOwnProperty('eachPotraitCostPaper3a') && this.IsNumeric($scope.gotCandidate._1i_mu_ca_PotraitEER[i].eachPotraitCostPaper3a) && Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].eachPotraitCostPaper3a)){
              eachPotraitCostPaperPrint3c+=Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].eachPotraitCostPaper3a);
            }
            if($scope.gotCandidate._1i_mu_ca_PotraitEER[i].hasOwnProperty('eachPotraitCostPaper3b') && this.IsNumeric($scope.gotCandidate._1i_mu_ca_PotraitEER[i].eachPotraitCostPaper3b) && Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].eachPotraitCostPaper3b)){
              eachPotraitCostPaperPrint3c+=Number($scope.gotCandidate._1i_mu_ca_PotraitEER[i].eachPotraitCostPaper3b);
            }

            if(eachPotraitCostPaperPrint3c)
              $scope.gotCandidate._1i_mu_ca_PotraitEER[i].eachPotraitCostPaperPrint3c=eachPotraitCostPaperPrint3c;
            if(allTotalCost8)
              $scope.gotCandidate._1i_mu_ca_PotraitEER[i].allTotalCost8=allTotalCost8;

          }

          $scope.gotCandidate._1i_mu_ca_PotraitTotalCostEER=0;
          if(_1i_mu_ca_PotraitTotalCostEER)
            $scope.gotCandidate._1i_mu_ca_PotraitTotalCostEER=_1i_mu_ca_PotraitTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1j_mu_ca_CompetitorSymbolEER= function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1j_mu_ca_CompetitorSymbolEER"))
          $scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER=[];
        $scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER.push({});
      };
      this.delete_1j_mu_ca_CompetitorSymbolEER=function(){
        $scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER.pop();
      };

      this.change_1j_mu_ca_CompetitorSymbolEER=function(){
        var i= 0, allTotalCost8= 0, _1j_mu_ca_CompetitorSymbolTotalCostEER=0;
        // console.log("test");

        if($scope.gotCandidate.hasOwnProperty("_1j_mu_ca_CompetitorSymbolEER") && $scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER.length){
          for(i=0;i<$scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER.length;i++) {
            allTotalCost8 = 0;

            if ($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].hasOwnProperty('symbolCost2x3_4') && this.IsNumeric($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].symbolCost2x3_4) && Number($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].symbolCost2x3_4)) {
              allTotalCost8 += Number($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].symbolCost2x3_4);
              _1j_mu_ca_CompetitorSymbolTotalCostEER += Number($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].symbolCost2x3_4);
            }
            if ($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].hasOwnProperty('vehicleCost5b') && this.IsNumeric($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].vehicleCost5b) && Number($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].vehicleCost5b)) {
              allTotalCost8 += Number($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].vehicleCost5b);
              _1j_mu_ca_CompetitorSymbolTotalCostEER += Number($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].vehicleCost5b);
            }
            if ($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].hasOwnProperty('hanggingCost6b') && this.IsNumeric($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].hanggingCost6b) && Number($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].hanggingCost6b)) {
              allTotalCost8 += Number($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].hanggingCost6b);
              _1j_mu_ca_CompetitorSymbolTotalCostEER += Number($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].hanggingCost6b);
            }
            if ($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].hasOwnProperty('otherCost7') && this.IsNumeric($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].otherCost7) && Number($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].otherCost7)) {
              allTotalCost8 += Number($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].otherCost7);
              _1j_mu_ca_CompetitorSymbolTotalCostEER += Number($scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].otherCost7);
            }

            if(allTotalCost8)
              $scope.gotCandidate._1j_mu_ca_CompetitorSymbolEER[i].allTotalCost8=allTotalCost8;
          }

          $scope.gotCandidate._1j_mu_ca_CompetitorSymbolTotalCostEER=0;
          if(_1j_mu_ca_CompetitorSymbolTotalCostEER)
            $scope.gotCandidate._1j_mu_ca_CompetitorSymbolTotalCostEER=_1j_mu_ca_CompetitorSymbolTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1k_mu_ca_CampOfficeEER= function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1k_mu_ca_CampOfficeEER"))
          $scope.gotCandidate._1k_mu_ca_CampOfficeEER=[];
        $scope.gotCandidate._1k_mu_ca_CampOfficeEER.push({});
      };
      this.delete_1k_mu_ca_CampOfficeEER=function(){
        $scope.gotCandidate._1k_mu_ca_CampOfficeEER.pop();
      };

      this.change_1k_mu_ca_CampOfficeEER=function(){
        var i= 0, allTotalCost10= 0, funnitureTotalCost8= 0, _1k_mu_ca_CampOfficeTotalCostEER=0;
        // console.log("test");

        if($scope.gotCandidate.hasOwnProperty("_1k_mu_ca_CampOfficeEER") && $scope.gotCandidate._1k_mu_ca_CampOfficeEER.length){
          for(i=0;i<$scope.gotCandidate._1k_mu_ca_CampOfficeEER.length;i++) {
            allTotalCost10 = 0;
            funnitureTotalCost8=1;

            if ($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].hasOwnProperty('campCost4') && this.IsNumeric($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].campCost4) && Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].campCost4)) {
              allTotalCost10 += Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].campCost4);
              _1k_mu_ca_CampOfficeTotalCostEER += Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].campCost4);
            }
            if ($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].hasOwnProperty('eachCost5') && this.IsNumeric($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].eachCost5) && Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].eachCost5)) {
              allTotalCost10 += Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].eachCost5);
              _1k_mu_ca_CampOfficeTotalCostEER += Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].eachCost5);
            }
            if ($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].hasOwnProperty('otherCost9') && this.IsNumeric($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].otherCost9) && Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].otherCost9)) {
              allTotalCost10 += Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].otherCost9);
              _1k_mu_ca_CampOfficeTotalCostEER += Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].otherCost9);
            }

            if ($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].hasOwnProperty('furnitureQuantity7a') && this.IsNumeric($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].furnitureQuantity7a) && Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].furnitureQuantity7a)) {
              funnitureTotalCost8 = funnitureTotalCost8*Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].furnitureQuantity7a);
              //console.log(funnitureTotalCost8)
            }
            if ($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].hasOwnProperty('furniturePricePerUnit7b') && this.IsNumeric($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].furniturePricePerUnit7b) && Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].furniturePricePerUnit7b)) {
              funnitureTotalCost8 =funnitureTotalCost8* Number($scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].furniturePricePerUnit7b);
              //console.log(funnitureTotalCost8)
            }

            if(funnitureTotalCost8)
              $scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].funnitureTotalCost8=funnitureTotalCost8;
            if(allTotalCost10)
              $scope.gotCandidate._1k_mu_ca_CampOfficeEER[i].allTotalCost10=allTotalCost10;
          }

          $scope.gotCandidate._1k_mu_ca_CampOfficeTotalCostEER=0;
          if(_1k_mu_ca_CampOfficeTotalCostEER)
            $scope.gotCandidate._1k_mu_ca_CampOfficeTotalCostEER=_1k_mu_ca_CampOfficeTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1l_mu_ca_OfficeHospitalityEER= function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1l_mu_ca_OfficeHospitalityEER"))
          $scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER=[];
        $scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER.push({});
      };
      this.delete_1l_mu_ca_OfficeHospitalityEER=function(){
        $scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER.pop();
      };

      this.change_1l_mu_ca_OfficeHospitalityEER=function() {
        var i = 0, allTotalCost7 = 0, _1l_mu_ca_OfficeHospitalityTotalCostEER=0;
        // console.log("test");

        if ($scope.gotCandidate.hasOwnProperty("_1l_mu_ca_OfficeHospitalityEER") && $scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER.length) {
          for (i = 0; i < $scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER.length; i++) {
            allTotalCost7 = 0;

            if ($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].hasOwnProperty('eachPersonHospitalityCost3') && this.IsNumeric($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].eachPersonHospitalityCost3) && Number($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].eachPersonHospitalityCost3)) {
              allTotalCost7 += Number($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].eachPersonHospitalityCost3);
              _1l_mu_ca_OfficeHospitalityTotalCostEER += Number($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].eachPersonHospitalityCost3);
            }
            if ($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].hasOwnProperty('totalCost5') && this.IsNumeric($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].totalCost5) && Number($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].totalCost5)) {
              allTotalCost7 += Number($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].totalCost5);
              _1l_mu_ca_OfficeHospitalityTotalCostEER += Number($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].totalCost5);
            }
            if ($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].hasOwnProperty('otherCost6') && this.IsNumeric($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].otherCost6) && Number($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].otherCost6)) {
              allTotalCost7 += Number($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].otherCost6);
              _1l_mu_ca_OfficeHospitalityTotalCostEER += Number($scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].otherCost6);
            }

            if(allTotalCost7)
              $scope.gotCandidate._1l_mu_ca_OfficeHospitalityEER[i].allTotalCost7=allTotalCost7;

          }

          $scope.gotCandidate._1l_mu_ca_OfficeHospitalityTotalCostEER=0;
          if(_1l_mu_ca_OfficeHospitalityTotalCostEER)
            $scope.gotCandidate._1l_mu_ca_OfficeHospitalityTotalCostEER=_1l_mu_ca_OfficeHospitalityTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1m_mu_ca_WorkerEER= function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1m_mu_ca_WorkerEER"))
          $scope.gotCandidate._1m_mu_ca_WorkerEER=[];
        $scope.gotCandidate._1m_mu_ca_WorkerEER.push({});
      };
      this.delete_1m_mu_ca_WorkerEER=function(){
        $scope.gotCandidate._1m_mu_ca_WorkerEER.pop();
      };

      this.change_1m_mu_ca_WorkerEER=function() {
        var i = 0, allTotalCost7 = 0, _1m_mu_ca_WorkerTotalCostEER=0;
        // console.log("test");

        if ($scope.gotCandidate.hasOwnProperty("_1m_mu_ca_WorkerEER") && $scope.gotCandidate._1m_mu_ca_WorkerEER.length) {
          for (i = 0; i < $scope.gotCandidate._1m_mu_ca_WorkerEER.length; i++) {
            allTotalCost7 = 0;

            if ($scope.gotCandidate._1m_mu_ca_WorkerEER[i].hasOwnProperty('eachPersonHospitalityCost3') && this.IsNumeric($scope.gotCandidate._1m_mu_ca_WorkerEER[i].eachPersonHospitalityCost3) && Number($scope.gotCandidate._1m_mu_ca_WorkerEER[i].eachPersonHospitalityCost3)) {
              allTotalCost7 += Number($scope.gotCandidate._1m_mu_ca_WorkerEER[i].eachPersonHospitalityCost3);
              _1m_mu_ca_WorkerTotalCostEER += Number($scope.gotCandidate._1m_mu_ca_WorkerEER[i].eachPersonHospitalityCost3);
            }
            if ($scope.gotCandidate._1m_mu_ca_WorkerEER[i].hasOwnProperty('totalCost5') && this.IsNumeric($scope.gotCandidate._1m_mu_ca_WorkerEER[i].totalCost5) && Number($scope.gotCandidate._1m_mu_ca_WorkerEER[i].totalCost5)) {
              allTotalCost7 += Number($scope.gotCandidate._1m_mu_ca_WorkerEER[i].totalCost5);
              _1m_mu_ca_WorkerTotalCostEER += Number($scope.gotCandidate._1m_mu_ca_WorkerEER[i].totalCost5);
            }
            if ($scope.gotCandidate._1m_mu_ca_WorkerEER[i].hasOwnProperty('otherCost6') && this.IsNumeric($scope.gotCandidate._1m_mu_ca_WorkerEER[i].otherCost6) && Number($scope.gotCandidate._1m_mu_ca_WorkerEER[i].otherCost6)) {
              allTotalCost7 += Number($scope.gotCandidate._1m_mu_ca_WorkerEER[i].otherCost6);
              _1m_mu_ca_WorkerTotalCostEER += Number($scope.gotCandidate._1m_mu_ca_WorkerEER[i].otherCost6);
            }


            if(allTotalCost7)
              $scope.gotCandidate._1m_mu_ca_WorkerEER[i].allTotalCost7=allTotalCost7;
          }

          $scope.gotCandidate._1m_mu_ca_WorkerTotalCostEER=0;
          if(_1m_mu_ca_WorkerTotalCostEER)
            $scope.gotCandidate._1m_mu_ca_WorkerTotalCostEER=_1m_mu_ca_WorkerTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1n_mu_ca_CandidateconveyanceEER= function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1n_mu_ca_CandidateconveyanceEER"))
          $scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER=[];
        $scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER.push({});
      };
      this.delete_1n_mu_ca_CandidateconveyanceEER=function(){
        $scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER.pop();
      };

      this.change_1n_mu_ca_CandidateconveyanceEER=function() {
        var i = 0, allTotalCost7 = 0, _1n_mu_ca_conveyanceTotalCostEER=0;
        // console.log("test");

        if ($scope.gotCandidate.hasOwnProperty("_1n_mu_ca_CandidateconveyanceEER") && $scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER.length) {
          for (i = 0; i < $scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER.length; i++) {
            allTotalCost7 = 0;

            if ($scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER[i].hasOwnProperty('otherCost6') && this.IsNumeric($scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER[i].otherCost6) && Number($scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER[i].otherCost6)) {
              allTotalCost7 += Number($scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER[i].otherCost6);
              _1n_mu_ca_conveyanceTotalCostEER += Number($scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER[i].otherCost6);
            }

            if(allTotalCost7)
              $scope.gotCandidate._1n_mu_ca_CandidateconveyanceEER[i].allTotalCost7=allTotalCost7;

          }

          $scope.gotCandidate._1n_mu_ca_conveyanceTotalCostEER=0;
          if(_1n_mu_ca_conveyanceTotalCostEER)
            $scope.gotCandidate._1n_mu_ca_conveyanceTotalCostEER=_1n_mu_ca_conveyanceTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1p_mu_ca_MiscellaneousEER= function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1p_mu_ca_MiscellaneousEER"))
          $scope.gotCandidate._1p_mu_ca_MiscellaneousEER=[];
        $scope.gotCandidate._1p_mu_ca_MiscellaneousEER.push({});
      };
      this.delete_1p_mu_ca_MiscellaneousEER=function(){
        $scope.gotCandidate._1p_mu_ca_MiscellaneousEER.pop();
      };

      this.change_1p_mu_ca_MiscellaneousEER=function(){
        var i= 0, _1p_mu_ca_MiscellaneousTotalCostEER=0;
        // console.log("test");
        if($scope.gotCandidate.hasOwnProperty("_1p_mu_ca_MiscellaneousEER") && $scope.gotCandidate._1p_mu_ca_MiscellaneousEER.length){
          for(i=0;i<$scope.gotCandidate._1p_mu_ca_MiscellaneousEER.length;i++){

            if($scope.gotCandidate._1p_mu_ca_MiscellaneousEER[i].hasOwnProperty('totalCost3') && this.IsNumeric($scope.gotCandidate._1p_mu_ca_MiscellaneousEER[i].totalCost3) && Number($scope.gotCandidate._1p_mu_ca_MiscellaneousEER[i].totalCost3)){
              _1p_mu_ca_MiscellaneousTotalCostEER+=Number($scope.gotCandidate._1p_mu_ca_MiscellaneousEER[i].totalCost3);
            }
          }
          //$scope.gotCandidate._2ElectionExpenseDetailsGrandTotalClearUnclearAmtEER=0;
          if(_1p_mu_ca_MiscellaneousTotalCostEER)
            $scope.gotCandidate._1p_mu_ca_MiscellaneousTotalCostEER=_1p_mu_ca_MiscellaneousTotalCostEER;
        }
      };

      /*=======================***********************===================*/
      this.add_1o_mu_ca_TVFridgeEER= function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("_1o_mu_ca_TVFridgeEER"))
          $scope.gotCandidate._1o_mu_ca_TVFridgeEER=[];
        $scope.gotCandidate._1o_mu_ca_TVFridgeEER.push({});
      };
      this.delete_1o_mu_ca_TVFridgeEER=function(){
        $scope.gotCandidate._1o_mu_ca_TVFridgeEER.pop();
      };

      this.change_1o_mu_ca_TVFridgeEER=function() {
        var i = 0, allTotalCost8 = 0, _1o_mu_ca_TVFridgeTotalCostEER=0;
        // console.log("test");

        if ($scope.gotCandidate.hasOwnProperty("_1o_mu_ca_TVFridgeEER") && $scope.gotCandidate._1o_mu_ca_TVFridgeEER.length) {
          for (i = 0; i < $scope.gotCandidate._1o_mu_ca_TVFridgeEER.length; i++) {
            allTotalCost8 = 0;

            if ($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].hasOwnProperty('eachChannelCost3') && this.IsNumeric($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].eachChannelCost3) && Number($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].eachChannelCost3)) {
              allTotalCost8 += Number($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].eachChannelCost3);
              _1o_mu_ca_TVFridgeTotalCostEER += Number($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].eachChannelCost3);
            }
            if ($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].hasOwnProperty('telecastCost4') && this.IsNumeric($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].telecastCost4) && Number($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].telecastCost4)) {
              allTotalCost8 += Number($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].telecastCost4);
              _1o_mu_ca_TVFridgeTotalCostEER += Number($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].telecastCost4);
            }
            if ($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].hasOwnProperty('otherMediaUnitCost6') && this.IsNumeric($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].otherMediaUnitCost6) && Number($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].otherMediaUnitCost6)) {
              allTotalCost8 += Number($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].otherMediaUnitCost6);
              _1o_mu_ca_TVFridgeTotalCostEER += Number($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].otherMediaUnitCost6);
            }
            if ($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].hasOwnProperty('otherMediaTotalCost7') && this.IsNumeric($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].otherMediaTotalCost7) && Number($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].otherMediaTotalCost7)) {
              allTotalCost8 += Number($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].otherMediaTotalCost7);
              _1o_mu_ca_TVFridgeTotalCostEER += Number($scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].otherMediaTotalCost7);
            }

            if(allTotalCost8)
              $scope.gotCandidate._1o_mu_ca_TVFridgeEER[i].allTotalCost8=allTotalCost8;

          }
          $scope.gotCandidate._1o_mu_ca_TVFridgeTotalCostEER=0;
          if(_1o_mu_ca_TVFridgeTotalCostEER)
            // console.log(_1o_mu_ca_TVFridgeTotalCostEER);
          $scope.gotCandidate._1o_mu_ca_TVFridgeTotalCostEER=_1o_mu_ca_TVFridgeTotalCostEER;
        }
      };

      /*===========Submit-Form============*/

      this.submit = function () {
        function IsNumeric(input) {
          return (input - 0) == input && ('' + input).trim().length > 0;
        }
        $scope.gotCandidate.statusEER = true;
        $scope.gotCandidate.isPublishedEER = true;


        CandidatesService.upsertCandidate($scope.gotCandidate).then(function (candidate) {
          //$state.go('^.list');
          if(candidate && candidate.hasOwnProperty("personNameBn") && candidate.personNameBn){
            CoreService.toastSuccess(
              gettextCatalog.getString('Candidate Updated'),
              gettextCatalog.getString('Your Candidate Election Expense Return form is save with us'));
            // console.log('candidate',candidate);
          }
        });
      }

    }]);

})();
