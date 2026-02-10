(function () {
    'use strict';
    angular
        .module('com.module.candidates')
        .controller('CandidateEditFormCrtl', ["$scope", '$state','$location','$anchorScroll','elections','currentElections','divisions','newCandidate','constitutionalPosts','politicalParties','CandidatesService','CandidateAnalysisService','$stateParams','PersonsServiceForCandidate','CoreService','gettextCatalog', 'User', function ($scope, $state, $location, $anchorScroll,elections, currentElections, divisions,newCandidate, constitutionalPosts,politicalParties, CandidatesService,CandidateAnalysisService, $stateParams, PersonsServiceForCandidate,CoreService,gettextCatalog, User) {
            // console.log($stateParams);
            // console.log("ashraf");
            // console.log(newCandidate);


            $scope.gotCandidate = newCandidate;
            $scope.formFieldsForGotCandidate = CandidatesService.getCandidateGeneralFields(elections,currentElections, divisions,newCandidate, constitutionalPosts,politicalParties, $stateParams);
            $scope.formOptionsForGotCandidate = {};

            // console.log(CandidatesService.getCandidate($scope.gotCandidate.candidateId));

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

              // console.log($scope.gotCandidate);

              //$scope.gotCandidate.id = $scope.gotCandidate.candidateId;
              //$scope.updateCandidate = {};
              //$scope.updateCandidate.id = $scope.gotCandidate.candidateId;
              //$scope.updateCandidate.currentElectionId  = $scope.gotCandidate.currentElectionId;
              //$scope.updateCandidate.districtId  = $scope.gotCandidate.districtId;
              //$scope.updateCandidate.divisionId  = $scope.gotCandidate.divisionId;
              //$scope.updateCandidate.electionId  = $scope.gotCandidate.electionId;
              //$scope.updateCandidate.electionSeatId  = $scope.gotCandidate.electionSeatId;
              //$scope.updateCandidate.unionId  = $scope.gotCandidate.unionId;
              //$scope.updateCandidate.upazillaId  = $scope.gotCandidate.upazillaId;
              //
              //$scope.updateCandidate.personNameBn  = $scope.gotCandidate.personNameBn;
              //$scope.updateCandidate.personNameEn  = $scope.gotCandidate.personNameEn;
              //$scope.updateCandidate.fatherNameEn  = $scope.gotCandidate.fatherNameEn;
              //$scope.updateCandidate.fatherNameBn  = $scope.gotCandidate.fatherNameBn;
              //$scope.updateCandidate.genderBn  = $scope.gotCandidate.genderBn;
              //$scope.updateCandidate.genderEn  = $scope.gotCandidate.genderEn;
              //$scope.updateCandidate.constitutionalPostBn  = $scope.gotCandidate.constitutionalPostBn;
              //$scope.updateCandidate.candidateType  = $scope.gotCandidate.candidateType;
              //$scope.updateCandidate.resultType  = $scope.gotCandidate.resultType;
              //$scope.updateCandidate.politicalPartyId  = $scope.gotCandidate.politicalPartyId;
              //$scope.updateCandidate.constitutionalPostId  = $scope.gotCandidate.constitutionalPostId;
              //$scope.updateCandidate.electionCandidatePostId  = $scope.gotCandidate.electionCandidatePostId;
              //$scope.updateCandidate.isPublished  = $scope.gotCandidate.isPublished;



                //CandidatesService.upsertCandidate($scope.updateCandidate).then(function (candidate) {
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

            //pagination
            //this.currentElections = currentElections;
            this.currentPage = 1;
            this.currentPage2 = 1;
            this.pageSize = 5;
            this.pageChangeHandler = function (num) {
                // console.log('page changed to ' + num);
            };


        }]);

})();
