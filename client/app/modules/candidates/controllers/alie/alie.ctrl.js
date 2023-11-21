(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .controller('CandidateEditALIECrtl', ["$scope",'$stateParams','CandidatesService','CoreService','gettextCatalog', 'User', function ($scope,$stateParams,CandidatesService,CoreService,gettextCatalog, User) {
//console.log($stateParams);

      if(!$scope.gotCandidate){
        if($stateParams.hasOwnProperty("candidateId") && $stateParams.candidateId){
          CandidatesService.getCandidate($stateParams.candidateId).then(function(candidate){
            $scope.$parent.gotCandidate=candidate;
          });
        }
      }

      this.addexceptHousePropertyALIE = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("exceptHousePropertyALIE"))
          $scope.gotCandidate.exceptHousePropertyALIE=[];

        $scope.gotCandidate.exceptHousePropertyALIE.push({});
      };
      this.deleteexceptHousePropertyALIE = function(){
        $scope.gotCandidate.exceptHousePropertyALIE.pop();
      };

      this.addhousePropertyALIE = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("housePropertyALIE"))
          $scope.gotCandidate.housePropertyALIE=[];

        $scope.gotCandidate.housePropertyALIE.push({});
      };
      this.deletehousePropertyALIE = function(){
        $scope.gotCandidate.housePropertyALIE.pop();
      };

      this.addotherPropertyALIE = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("otherPropertyALIE"))
          $scope.gotCandidate.otherPropertyALIE=[];

        $scope.gotCandidate.otherPropertyALIE.push({});
      };
      this.deleteotherPropertyALIE = function(){
        $scope.gotCandidate.otherPropertyALIE.pop();
      };

      this.addliabilityALIE = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("liabilityALIE"))
          $scope.gotCandidate.liabilityALIE=[];

        $scope.gotCandidate.liabilityALIE.push({});
      };
      this.deleteliabilityALIE = function(){
        $scope.gotCandidate.liabilityALIE.pop();
      };

      this.addannualIncomeALIE = function(){
        //console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("annualIncomeALIE"))
          $scope.gotCandidate.annualIncomeALIE=[];

        $scope.gotCandidate.annualIncomeALIE.push({});
      };
      this.deleteannualIncomeALIE = function(){
        $scope.gotCandidate.annualIncomeALIE.pop();
      };

      this.addannualExpenseALIE = function(){
        // console.log($scope.gotCandidate);
        if(!$scope.gotCandidate.hasOwnProperty("annualExpenseALIE"))
          $scope.gotCandidate.annualExpenseALIE=[];

        $scope.gotCandidate.annualExpenseALIE.push({});
      };
      this.deleteannualExpenseALIE = function(){
        $scope.gotCandidate.annualExpenseALIE.pop();
      };

      this.submit = function () {
        var exceptHousePropertyTotalPriceALIE= 0, housePropertyTotalPriceALIE=0, otherPropertyTotalPriceALIE=0, liabilityTotalAmountALIE=0, annualIncomeTotalAmountALIE=0, annualExpenseTotalAmountALIE=0;

        function IsNumeric(input) {
          return (input - 0) == input && ('' + input).trim().length > 0;
        }

        //$scope.gotCandidate={};
        $scope.gotCandidate.statusALIE=true;
        $scope.gotCandidate.isPublishedALIE=true;
        //$scope.gotCandidate.submissionDateALIE=true;

        //exceptHousePropertyALIE
        var i=0;
        if($scope.gotCandidate.hasOwnProperty("exceptHousePropertyALIE") && $scope.gotCandidate.exceptHousePropertyALIE.length){
          for(i=0;i<$scope.gotCandidate.exceptHousePropertyALIE.length;i++){
            if($scope.gotCandidate.exceptHousePropertyALIE[i].hasOwnProperty("price") && IsNumeric($scope.gotCandidate.exceptHousePropertyALIE[i].price) && Number($scope.gotCandidate.exceptHousePropertyALIE[i].price))
              exceptHousePropertyTotalPriceALIE+=Number($scope.gotCandidate.exceptHousePropertyALIE[i].price);
          }
        }
        $scope.gotCandidate.exceptHousePropertyTotalPriceALIE=0;
        if(exceptHousePropertyTotalPriceALIE)
          $scope.gotCandidate.exceptHousePropertyTotalPriceALIE=exceptHousePropertyTotalPriceALIE;

        //housePropertyALIE
        if($scope.gotCandidate.hasOwnProperty("housePropertyALIE") && $scope.gotCandidate.housePropertyALIE.length){
          for(i=0;i<$scope.gotCandidate.housePropertyALIE.length;i++){
            if($scope.gotCandidate.housePropertyALIE[i].hasOwnProperty("price") && IsNumeric($scope.gotCandidate.housePropertyALIE[i].price) && Number($scope.gotCandidate.housePropertyALIE[i].price))
              housePropertyTotalPriceALIE+=Number($scope.gotCandidate.housePropertyALIE[i].price);
          }
        }
        $scope.gotCandidate.housePropertyTotalPriceALIE=0;
        if(housePropertyTotalPriceALIE)
          $scope.gotCandidate.housePropertyTotalPriceALIE=housePropertyTotalPriceALIE;

        //otherPropertyALIE
        if($scope.gotCandidate.hasOwnProperty("otherPropertyALIE") && $scope.gotCandidate.otherPropertyALIE.length){
          for(i=0;i<$scope.gotCandidate.otherPropertyALIE.length;i++){
            if($scope.gotCandidate.otherPropertyALIE[i].hasOwnProperty("price") && IsNumeric($scope.gotCandidate.otherPropertyALIE[i].price) && Number($scope.gotCandidate.otherPropertyALIE[i].price))
              otherPropertyTotalPriceALIE+=Number($scope.gotCandidate.otherPropertyALIE[i].price);
          }
        }
        $scope.gotCandidate.otherPropertyTotalPriceALIE=0;
        if(otherPropertyTotalPriceALIE)
          $scope.gotCandidate.otherPropertyTotalPriceALIE=otherPropertyTotalPriceALIE;

        //liabilityALIE
        if($scope.gotCandidate.hasOwnProperty("liabilityALIE") && $scope.gotCandidate.liabilityALIE.length){
          for(i=0;i<$scope.gotCandidate.liabilityALIE.length;i++){
            if($scope.gotCandidate.liabilityALIE[i].hasOwnProperty("price") && IsNumeric($scope.gotCandidate.liabilityALIE[i].price) && Number($scope.gotCandidate.liabilityALIE[i].price))
              liabilityTotalAmountALIE+=Number($scope.gotCandidate.liabilityALIE[i].price);
          }
        }
        $scope.gotCandidate.liabilityTotalAmountALIE=0;
        if(liabilityTotalAmountALIE)
          $scope.gotCandidate.liabilityTotalAmountALIE=liabilityTotalAmountALIE;

        //annualIncomeALIE
        if($scope.gotCandidate.hasOwnProperty("annualIncomeALIE") && $scope.gotCandidate.annualIncomeALIE.length){
          for(i=0;i<$scope.gotCandidate.annualIncomeALIE.length;i++){
            if($scope.gotCandidate.annualIncomeALIE[i].hasOwnProperty("price") && IsNumeric($scope.gotCandidate.annualIncomeALIE[i].price) && Number($scope.gotCandidate.annualIncomeALIE[i].price))
              annualIncomeTotalAmountALIE+=Number($scope.gotCandidate.annualIncomeALIE[i].price);
          }
        }
        $scope.gotCandidate.annualIncomeTotalAmountALIE=0;
        if(annualIncomeTotalAmountALIE)
          $scope.gotCandidate.annualIncomeTotalAmountALIE=annualIncomeTotalAmountALIE;

        //annualExpenseALIE
        if($scope.gotCandidate.hasOwnProperty("annualExpenseALIE") && $scope.gotCandidate.annualExpenseALIE.length){
          for(i=0;i<$scope.gotCandidate.annualExpenseALIE.length;i++){
            if($scope.gotCandidate.annualExpenseALIE[i].hasOwnProperty("price") && IsNumeric($scope.gotCandidate.annualExpenseALIE[i].price) && Number($scope.gotCandidate.annualExpenseALIE[i].price))
              annualExpenseTotalAmountALIE+=Number($scope.gotCandidate.annualExpenseALIE[i].price);
          }
        }
        $scope.gotCandidate.annualExpenseTotalAmountALIE=0;
        if(annualExpenseTotalAmountALIE)
          $scope.gotCandidate.annualExpenseTotalAmountALIE=annualExpenseTotalAmountALIE;

        $scope.gotCandidate.allGrandTotalALIE=$scope.gotCandidate.exceptHousePropertyTotalPriceALIE+$scope.gotCandidate.housePropertyTotalPriceALIE+$scope.gotCandidate.otherPropertyTotalPriceALIE+$scope.gotCandidate.liabilityTotalAmountALIE+$scope.gotCandidate.annualIncomeTotalAmountALIE+$scope.gotCandidate.annualExpenseTotalAmountALIE;

        // console.log($scope.gotCandidate);
        // console.log("before");
        User.getCurrent().$promise.then(function(user) {
          // console.log(user.id);
          $scope.gotCandidate.createdByALIE = user.id;
          $scope.gotCandidate.modifiedByALIE = user.id;

          CandidatesService.upsertCandidate($scope.gotCandidate).then(function (candidate) {
            //$state.go('^.list');
            if(candidate && candidate.hasOwnProperty("personNameBn") && candidate.personNameBn){
              CoreService.toastSuccess(
                gettextCatalog.getString('Candidate Updated'),
                gettextCatalog.getString('Your Candidate Asset/Liability/Income/Expense form is save with us'));
              // console.log('candidate',candidate);
            }
          });
        });
        // console.log("after");





      }


    }]);

})();
