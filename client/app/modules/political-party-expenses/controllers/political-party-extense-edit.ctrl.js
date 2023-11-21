(function () {
  'use strict';
  angular
    .module('com.module.politicalPartyExpenses')
    .controller('PoliticalPartyExpenseEditCtrl', ["$state", "PoliticalPartyExpensesService", "currentElections",'politicalParties','politicalPartyExpense', function ($state, PoliticalPartyExpensesService, currentElections,politicalParties, politicalPartyExpense) {
      //console.log(politicalPartyExpense);
      this.currentElections = currentElections;
      this.politicalPartyExpense = politicalPartyExpense;
      this.formFields = PoliticalPartyExpensesService.getFormFields(currentElections,politicalParties);
      this.formOptions = {};
      this.submit = function () {
        var givenDonationTotalAmount= 0, campainTotalAmount=0, vehicleTotalAmount=0, conferenceTotalAmount=0, staffTotalAmount=0, administrativeTotalAmount=0, otherTotalAmount= 0, grandTotalAmount=0;

        function IsNumeric(input) {
          return (input - 0) == input && ('' + input).trim().length > 0;
        }



        //givenDonation
        var i=0;
        if(this.politicalPartyExpense.hasOwnProperty("givenDonation") && this.politicalPartyExpense.givenDonation.length){
          for(i=0;i<this.politicalPartyExpense.givenDonation.length;i++){
            if(this.politicalPartyExpense.givenDonation[i].hasOwnProperty("expenseAmount") && IsNumeric(this.politicalPartyExpense.givenDonation[i].expenseAmount) && Number(this.politicalPartyExpense.givenDonation[i].expenseAmount))
              givenDonationTotalAmount+=Number(this.politicalPartyExpense.givenDonation[i].expenseAmount);
          }
        }
        if(givenDonationTotalAmount)
          grandTotalAmount+=this.politicalPartyExpense.givenDonationTotalAmount=givenDonationTotalAmount;

        //campain
        if(this.politicalPartyExpense.hasOwnProperty("campain") && this.politicalPartyExpense.campain.length){
          for(i=0;i<this.politicalPartyExpense.campain.length;i++){
            if(this.politicalPartyExpense.campain[i].hasOwnProperty("expenseAmount") && IsNumeric(this.politicalPartyExpense.campain[i].expenseAmount) && Number(this.politicalPartyExpense.campain[i].expenseAmount))
              campainTotalAmount+=Number(this.politicalPartyExpense.campain[i].expenseAmount);
          }
        }
        if(campainTotalAmount)
          grandTotalAmount+=this.politicalPartyExpense.campainTotalAmount=campainTotalAmount;

        //vehicle
        if(this.politicalPartyExpense.hasOwnProperty("vehicle") && this.politicalPartyExpense.vehicle.length){
          for(i=0;i<this.politicalPartyExpense.vehicle.length;i++){
            if(this.politicalPartyExpense.vehicle[i].hasOwnProperty("expenseAmount") && IsNumeric(this.politicalPartyExpense.vehicle[i].expenseAmount) && Number(this.politicalPartyExpense.vehicle[i].expenseAmount))
              vehicleTotalAmount+=Number(this.politicalPartyExpense.vehicle[i].expenseAmount);
          }
        }
        if(vehicleTotalAmount)
          grandTotalAmount+=this.politicalPartyExpense.vehicleTotalAmount=vehicleTotalAmount;

        //conference
        if(this.politicalPartyExpense.hasOwnProperty("conference") && this.politicalPartyExpense.conference.length){
          for(i=0;i<this.politicalPartyExpense.conference.length;i++){
            if(this.politicalPartyExpense.conference[i].hasOwnProperty("expenseAmount") && IsNumeric(this.politicalPartyExpense.conference[i].expenseAmount) && Number(this.politicalPartyExpense.conference[i].expenseAmount))
              conferenceTotalAmount+=Number(this.politicalPartyExpense.conference[i].expenseAmount);
          }
        }
        if(conferenceTotalAmount)
          grandTotalAmount+=this.politicalPartyExpense.conferenceTotalAmount=conferenceTotalAmount;

        //staff
        if(this.politicalPartyExpense.hasOwnProperty("staff") && this.politicalPartyExpense.staff.length){
          for(i=0;i<this.politicalPartyExpense.staff.length;i++){
            if(this.politicalPartyExpense.staff[i].hasOwnProperty("expenseAmount") && IsNumeric(this.politicalPartyExpense.staff[i].expenseAmount) && Number(this.politicalPartyExpense.staff[i].expenseAmount))
              staffTotalAmount+=Number(this.politicalPartyExpense.staff[i].expenseAmount);
          }
        }
        if(staffTotalAmount)
          grandTotalAmount+=this.politicalPartyExpense.staffTotalAmount=staffTotalAmount;

        //administrative
        if(this.politicalPartyExpense.hasOwnProperty("administrative") && this.politicalPartyExpense.administrative.length){
          for(i=0;i<this.politicalPartyExpense.administrative.length;i++){
            if(this.politicalPartyExpense.administrative[i].hasOwnProperty("expenseAmount") && IsNumeric(this.politicalPartyExpense.administrative[i].expenseAmount) && Number(this.politicalPartyExpense.administrative[i].expenseAmount))
              administrativeTotalAmount+=Number(this.politicalPartyExpense.administrative[i].expenseAmount);
          }
        }
        if(administrativeTotalAmount)
          grandTotalAmount+=this.politicalPartyExpense.administrativeTotalAmount=administrativeTotalAmount;

        //other
        if(this.politicalPartyExpense.hasOwnProperty("other") && this.politicalPartyExpense.other.length){
          for(i=0;i<this.politicalPartyExpense.other.length;i++){
            if(this.politicalPartyExpense.other[i].hasOwnProperty("expenseAmount") && IsNumeric(this.politicalPartyExpense.other[i].expenseAmount) && Number(this.politicalPartyExpense.other[i].expenseAmount))
              otherTotalAmount+=Number(this.politicalPartyExpense.other[i].expenseAmount);
          }
        }
        if(otherTotalAmount)
          grandTotalAmount+=this.politicalPartyExpense.otherTotalAmount=otherTotalAmount;


        if(grandTotalAmount)
          this.politicalPartyExpense.grandTotalAmount=grandTotalAmount;

        // console.log(this.politicalPartyExpense);

        PoliticalPartyExpensesService.upsertPoliticalPartyExpense(this.politicalPartyExpense).then(function () {
          $state.go('^.list');
        });
      };

      this.addOneGivenDonation = function(){
        if(!this.politicalPartyExpense.hasOwnProperty("givenDonation"))
          this.politicalPartyExpense.givenDonation=[];

        this.politicalPartyExpense.givenDonation.push({});
      };
      this.removeOneGivenDonation = function(){
        this.politicalPartyExpense.givenDonation.pop();
      }

      this.addOneCampain = function(){
        if(!this.politicalPartyExpense.hasOwnProperty("campain"))
          this.politicalPartyExpense.campain=[];

        this.politicalPartyExpense.campain.push({});
      };
      this.removeOneCampain = function(){
        this.politicalPartyExpense.campain.pop();
      }

      this.addOneVehicle = function(){
        if(!this.politicalPartyExpense.hasOwnProperty("vehicle"))
          this.politicalPartyExpense.vehicle=[];

        this.politicalPartyExpense.vehicle.push({});
      };
      this.removeOneVehicle = function(){
        this.politicalPartyExpense.vehicle.pop();
      }

      this.addOneconference = function(){
        if(!this.politicalPartyExpense.hasOwnProperty("conference"))
          this.politicalPartyExpense.conference=[];

        this.politicalPartyExpense.conference.push({});
      };
      this.removeOneconference = function(){
        this.politicalPartyExpense.conference.pop();
      }

      this.addOnestaff = function(){
        if(!this.politicalPartyExpense.hasOwnProperty("staff"))
          this.politicalPartyExpense.staff=[];

        this.politicalPartyExpense.staff.push({});
      };
      this.removeOnestaff = function(){
        this.politicalPartyExpense.staff.pop();
      }

      this.addOneadministrative = function(){
        if(!this.politicalPartyExpense.hasOwnProperty("administrative"))
          this.politicalPartyExpense.administrative=[];

        this.politicalPartyExpense.administrative.push({});
      };
      this.removeOneadministrative = function(){
        this.politicalPartyExpense.administrative.pop();
      }

      this.addOneother = function(){
        if(!this.politicalPartyExpense.hasOwnProperty("other"))
          this.politicalPartyExpense.other=[];

        this.politicalPartyExpense.other.push({});
      };
      this.removeOneother = function(){
        this.politicalPartyExpense.other.pop();
      }


    }]);

})();
