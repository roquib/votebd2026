(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .controller('AddEditCrtl', ["$scope", '$state','$location','$anchorScroll','elections','currentElections','divisions','constitutionalPosts','politicalParties','CandidatesService','CandidateAnalysisService','$stateParams','PersonsServiceForCandidate','CoreService','gettextCatalog', 'User', function ($scope, $state, $location, $anchorScroll,elections, currentElections, divisions, constitutionalPosts,politicalParties, CandidatesService,CandidateAnalysisService, $stateParams, PersonsServiceForCandidate,CoreService,gettextCatalog, User) {
      // console.log($stateParams);



      this.electionSeat = $stateParams;
      this.formFields = CandidatesService.getFormFilter(elections,currentElections, divisions, $stateParams);
      this.formOptions = {};
      this.submit = function () {
        //console.log(this.electionSeat);
        CandidatesService.getCandidatesWhere(this.electionSeat).then(function (candidates) {
          //console.log(candidates);
          $scope.candidates = candidates;
        });
      };

      this.showNewCandidateForm=false;

      $scope.enableCandidateAdd=false;
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

      this.showAddPersonEntryform = function(){
        if(this.showNewCandidateForm)
          this.showNewCandidateForm=false;
        else
          this.showNewCandidateForm=true;

        //console.log('this.showNewCandidateForm');
        //console.log(this.showNewCandidateForm);

      }

      $scope.newCandidate=this.electionSeat;
      $scope.electionAndConstituency = this.electionSeat;
      this.addNewPerson = function () {
        PersonsServiceForCandidate.upsertPerson(this.newPerson)
          .then(function (person) {
            // console.log(person);
            if(person && person.hasOwnProperty('personNameBn') && person.personNameBn){
              $scope.enableCandidateAdd=true;
              $scope.person = person;
              $scope.newCandidate=$scope.electionAndConstituency;
              $scope.newCandidate.personId=$scope.person.id;
              $scope.newCandidate.personNameBn=person.personNameBn;
              $scope.newCandidate.personNameEn=person.personNameEn;
              $scope.newCandidate.candidateDateOfBirthBnAF=person.candidateDateOfBirthBnAF;
              $scope.newCandidate.fatherNameBn=person.fatherNameBn;
              $scope.newCandidate.fatherNameEn=person.fatherNameEn;
              $scope.newCandidate.genderEn=person.genderEn;
              $scope.newCandidate.genderBn=person.genderBn;

              $scope.formFieldsForNewCandidate = CandidatesService.getFormFields($scope.newCandidate,constitutionalPosts,politicalParties);
              $scope.formOptionsForNewCandidate = {};

            }
            CoreService.toastSuccess(
              gettextCatalog.getString('Person saved'),
              gettextCatalog.getString('Your person is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving person '),
              gettextCatalog.getString('This person could no be saved: ') + err
            );
          }
        );
      }

      this.showHideCandidateList = function (me) {
        //console.log($("#"+me))
        //$("#"+me).css("height","20px");
        if ($("#" + me).css("height") == "65px") {
          $("#" + me).css("height", "auto");
        }
        else
          $("#" + me).css("height", "65px")

      }

      this.showHideNewPersonCandidate = function (me) {
        //console.log($("#"+me))
        if ($("#" + me).css("height") == "49px") {
          $("#" + me).css("height", "auto");
        }
        else
          $("#" + me).css("height", "49px")

      }

      $scope.gotCandidate = false;

      this.addMeAsCandidate = function (personId) {
        //console.log(personId);
        this.electionSeat.personId = personId;
        $scope.newCandidate=this.electionSeat;
        //console.log(CandidatesService.getCandidatesWherePerson(this.electionSeat));
        CandidatesService.getCandidatesWherePerson(this.electionSeat).then(function (candidates) {
          // console.log(candidates.length);
          // console.log(candidates);

          if (candidates.length>0) {
            $scope.gotCandidate = candidates[0];

            $scope.alerts = [{
              type: 'success',
              msg: 'This person alreay added as candidate for this election and constituency. By scrolling down you may edit Affidavit/FSEE/ALIE/EER/TaxReturn form'
            }];

            $scope.enableCandidateAdd=false;
          }
          else{
            $scope.enableCandidateAdd=true;
            //console.log(personId);
            if(personId){
              PersonsServiceForCandidate.getPerson(personId)
              .then(function(person){
                  // console.log(person);
                  // console.log(person.id);
                  if(person && person.hasOwnProperty('personNameBn') && person.hasOwnProperty('personNameBn')){
                    $scope.newCandidate.personNameBn=person.personNameBn;
                    $scope.newCandidate.personNameEn=person.personNameEn;
                    $scope.newCandidate.candidateDateOfBirthBnAF=person.candidateDateOfBirthBnAF;
                    $scope.newCandidate.fatherNameBn=person.fatherNameBn;
                    $scope.newCandidate.fatherNameEn=person.fatherNameEn;
                    $scope.newCandidate.genderEn=person.genderEn;
                    $scope.newCandidate.genderBn=person.genderBn;
                    $scope.newCandidate.personId=person.id;

                    $scope.formFieldsForNewCandidate = CandidatesService.getFormFields($scope.newCandidate,constitutionalPosts,politicalParties);
                    $scope.formOptionsForNewCandidate = {};
                    $scope.persons = [];
                  }
                })
            }

          }
        })

      };

      this.addFormsShowHide = function(candidate){
        this.addForms(candidate);
        if ($(".candidateEditForm").css("height") == "0px")
          $(".candidateEditForm").css("height", "auto");
        else
          $(".candidateEditForm").css("height", "0px")
      };


      this.addForms = function(candidate){
        // $scope.gotCandidate = candidate;
        // console.log(candidate,'candiad')
        CandidatesService.getCandidate(candidate.id).then(function(candidate){
          $scope.gotCandidate=candidate;

          if($scope.gotCandidate.hasOwnProperty('_2ElectionExpenseDetailsEER') && $scope.gotCandidate._2ElectionExpenseDetailsEER.length){
           var i=0;
           for(i=0;i<$scope.gotCandidate._2ElectionExpenseDetailsEER.length;i++){
             //console.log($scope.gotCandidate._2ElectionExpenseDetailsEER[i].dateOfApproval)
             if($scope.gotCandidate._2ElectionExpenseDetailsEER[i].hasOwnProperty('dateOfApproval'))
               $scope.gotCandidate._2ElectionExpenseDetailsEER[i].dateOfApproval= new Date($scope.gotCandidate._2ElectionExpenseDetailsEER[i].dateOfApproval);

             if($scope.gotCandidate._2ElectionExpenseDetailsEER[i].hasOwnProperty('dateOfMoneyPay'))
               $scope.gotCandidate._2ElectionExpenseDetailsEER[i].dateOfMoneyPay= new Date($scope.gotCandidate._2ElectionExpenseDetailsEER[i].dateOfMoneyPay);
           }
          }

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



          $scope.$broadcast('changeCandidate');

        });
        //$(".candidateEditForm").css("height", "0px");
        $location.hash('candidate-add-and-forms');
        $anchorScroll();

      }

      this.addNews = function (candidateId) {
        // console.log(candidateId);
        var candidateAllInfo = this.electionSeat;
        candidateAllInfo.candidateId = candidateId;
        $state.go('app.posts.list',candidateAllInfo);

      }

      this.addform=function (candidateId) {
          //console.log(candidateId)
          var candidateAllInfo = this.electionSeat;
          candidateAllInfo.candidateId = candidateId;
          //$state.go('app.candidates.editform',candidateAllInfo);

        var url = $state.href('app.candidates.editform', candidateAllInfo);
        //console.log(url)
        window.open(url,'_blank');
      }




      //this.politicalParties = politicalParties;
      CandidatesService.getCandidatesWhere(this.electionSeat).then(function (candidates) {
        //console.log(candidates);
        $scope.candidates = candidates;
      });

      this.goToAddEdit = function (pageType, candidateId) {
        switch (pageType) {
          case 'Affidavit':
            $state.go('app.candidates.addedit.editAffidavit', {candidateId: candidateId});
            break;
          case 'FSEE':
            $state.go('app.candidates.addedit.editFSEE', {candidateId: candidateId});
            break;
          case 'ALIE':
            $state.go('app.candidates.addedit.editALIE', {candidateId: candidateId});
            break;
          case 'EER':
            $state.go('app.candidates.addedit.editEER', {candidateId: candidateId});
            break;
          case 'Murdhanno':
            $state.go('app.candidates.addedit.editMurdhanno',{candidateId: candidateId});
            break;
          case 'TR':
            $state.go('app.candidates.addedit.editTR', {candidateId: candidateId});
            break;
          case 'TR2024':
            $state.go('app.candidates.addedit.editTR2024', {candidateId: candidateId});
            break;
        }
        //$location.hash('forms-cont');
        //$anchorScroll();

      }

      this.gotToForm=function(){
        $location.hash('forms-cont');
        $anchorScroll();
      }

      this.addCandidatesubmit = function () {
        if($scope.newCandidate.hasOwnProperty("isPublished")){
          if($scope.newCandidate.isPublished=='true'){
            $scope.newCandidate.isPublished=true;
          }
          if($scope.newCandidate.isPublished=='false'){
            $scope.newCandidate.isPublished=false;
          }
        }
        if($scope.newCandidate.hasOwnProperty("genderBn")){
          if($scope.newCandidate.genderBn=='পুরুষ'){
            $scope.newCandidate.genderBn='পুরুষ';
            $scope.newCandidate.genderEn='male';
          }
          if($scope.newCandidate.genderBn=='মহিলা'){
            $scope.newCandidate.genderBn='মহিলা';
            $scope.newCandidate.genderEn='female';
          }
          if($scope.newCandidate.genderBn=='তৃতীয় লিঙ্গ'){
            $scope.newCandidate.genderBn='তৃতীয় লিঙ্গ';
            $scope.newCandidate.genderEn='third_gender';
          }
        }

        //console.log($scope.newCandidate);

        CandidatesService.upsertCandidate($scope.newCandidate).then(function (candidate) {
          //$state.go('^.list');
          // console.log('new candidate added');
          // console.log(candidate);

          if(candidate && candidate.hasOwnProperty('personNameBn') && candidate.personNameBn){
            $scope.gotCandidate = candidate;
          }

          CoreService.toastSuccess(
            gettextCatalog.getString('Candidate saved'),
            gettextCatalog.getString('Your Candidate is safe with us!'),
            gettextCatalog.getString('By Scrolling down you may now add other forms(i.e. Affidavit/FSEE/ALIE/EER/TaxReturn')
          );

        })
          .catch(function (err) {
          CoreService.toastSuccess(
            gettextCatalog.getString('Error saving Candidate '),
            gettextCatalog.getString('This Candidate could not be saved: ') + err
          );
        });


      }

      this.saveIsPublished =function(){

        if($scope.gotCandidate.hasOwnProperty("isPublished")){
          if($scope.gotCandidate.isPublished=='true'){
            $scope.gotCandidate.isPublished=true;
          }
          if($scope.gotCandidate.isPublished=='false'){
            $scope.gotCandidate.isPublished=false;
          }
        }
        if($scope.gotCandidate.hasOwnProperty("genderBn")){
          if($scope.gotCandidate.genderBn=='পুরুষ'){
            $scope.gotCandidate.genderBn='পুরুষ';
            $scope.gotCandidate.genderEn='male';
          }
          if($scope.gotCandidate.genderBn=='মহিলা'){
            $scope.gotCandidate.genderBn='মহিলা';
            $scope.gotCandidate.genderEn='female';
          }
          if($scope.gotCandidate.genderBn=='তৃতীয় লিঙ্গ'){
            $scope.gotCandidate.genderBn='তৃতীয় লিঙ্গ';
            $scope.gotCandidate.genderEn='third_gender';
          }
        }
        CandidatesService.upsertCandidate($scope.gotCandidate).then(function (candidate) {
          //$state.go('^.list');
          // console.log('candidate');
          // console.log(candidate);
          if(candidate && candidate.hasOwnProperty('personNameBn') && candidate.personNameBn){
            CoreService.toastSuccess(
              gettextCatalog.getString('Candidate Updated'),
              gettextCatalog.getString('Your Candidate is save with us'));
          }
        });
      };
      this.changeCandidateIsPublished = function (data) {
          CoreService.confirm(data.isPublished? 'Make candidate draft': 'Make candidate published', 'So do you agree?',
            function () {

              data.isPublished = !data.isPublished;
              CandidatesService.upsertCandidate(data).then(function (candidate) {
                if(candidate && candidate.hasOwnProperty('personNameBn') && candidate.personNameBn){
                  CoreService.toastSuccess(
                    gettextCatalog.getString('Candidate Updated'),
                    gettextCatalog.getString('Your Candidate is save with us'));
                }
              });
            },
            function () {

            });
      };


       this.changeCandidateFeatured = function (data) {
          CoreService.confirm(data.isFeatured? 'Make candidate not featured': 'Make candidate featured', 'So do you agree?',
            function () {
              data.isFeatured = !data.isFeatured;
              CandidatesService.upsertCandidate(data).then(function (candidate) {
                if(candidate && candidate.hasOwnProperty('personNameBn') && candidate.personNameBn){
                  CoreService.toastSuccess(
                    gettextCatalog.getString('Candidate Updated'),
                    gettextCatalog.getString('Your Candidate is save with us'));
                }
              });
            },
            function () {
            });
      };


      this.changeCandidateResultType = function (data) {
        CoreService.confirm(data.resultType === 'elected'?'Make candidate not elected': 'Make candidate elected', 'So do you agree?',
          function () {

            if(data.resultType === 'elected'){
              data.resultType = 'notelected';
            }else{
              data.resultType = 'elected';
            }
            CandidatesService.upsertCandidate(data).then(function (candidate) {
              if(candidate && candidate.hasOwnProperty('personNameBn') && candidate.personNameBn){
                CoreService.toastSuccess(
                  gettextCatalog.getString('Candidate Updated'),
                  gettextCatalog.getString('Your Candidate is save with us'));
              }
            });
          },
          function () {
            //CoreService.alert('You don\'t agree!');
          });
      };


      this.deleteCandidate = function(id, index){ //console.log(id);
        CandidatesService.deleteCandidate(id,function () {
          CoreService.alert('You agree!');
            $scope.candidates.splice(index, 1);
        },
        function () {
          CoreService.alert('You don\'t agree!');
        });
        $scope.gotCandidate={};
        $scope.newCandidate={};
      };

      //pagination
      //this.currentElections = currentElections;
      this.currentPage = 1;
      this.currentPage2 = 1;
      this.pageSize = 5;
      this.pageChangeHandler = function (num) {
        //console.log('page changed to ' + num);
      };

    }]);

})();
