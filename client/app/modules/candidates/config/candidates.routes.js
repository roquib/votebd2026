(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.candidates', {
          abstract: true,
          url: '/candidates',
          templateUrl: 'modules/candidates/views/main.html'
        })
        .state('app.candidates.list', {
          //url: '/:currentElectionId/:electionId/:divisionId/:districtId/:upazillaId/:unionId/:electionSeatId',
          url: '',
          templateUrl: 'modules/candidates/views/list.html',
          controllerAs: 'ctrl',
          controller: 'CandidateCrtl',
          resolve: {
            elections: [
              'ElectionsServiceForES',
              function (ElectionsServiceForES) {
                return ElectionsServiceForES.getElections();
              }
            ],
            currentElections: [
              'CurrentElectionsServiceForES',
              function (CurrentElectionsServiceForCandidate) {
                return CurrentElectionsServiceForCandidate.getCurrentElections();
              }
            ],
            divisions: function (DivisionsServiceForSeats) {
              return DivisionsServiceForSeats.getDivisions();
            },
            electionSeat: function () {
              return {};
            }
          }
        })
        .state('app.candidates.addedit', {
          url: '/addedit/:currentElectionId/:electionId/:divisionId/:districtId/:upazillaId/:unionId/:electionSeatId',
          templateUrl: 'modules/candidates/views/addform.html',
          controllerAs: 'ctrl',
          controller: 'AddEditCrtl',
          resolve: {
            elections: [
              'ElectionsServiceForES',
              function (ElectionsServiceForES) {
                return ElectionsServiceForES.getElections();
              }
            ],
            currentElections: [
              'CurrentElectionsServiceForES',
              function (CurrentElectionsServiceForCandidate) {
                return CurrentElectionsServiceForCandidate.getCurrentElections();
              }
            ],
            divisions: function (DivisionsServiceForSeats) {
              return DivisionsServiceForSeats.getDivisions();
            },
            politicalParties: function (PoliticalPartiesServiceForCandidate) {
              return PoliticalPartiesServiceForCandidate.getPoliticalParties();
            },
            constitutionalPosts: function (ConstitutionalPostsService) {
              return ConstitutionalPostsService.getConstitutionalPosts();
            },
            electionSeat: function () {
              return {};
            }
          }
        })
        .state('app.candidates.editform', {
          url: '/editform/:currentElectionId/:electionId/:divisionId/:districtId/:upazillaId/:unionId/:electionSeatId/:candidateId',
          templateUrl: 'modules/candidates/views/editform.html',
          controllerAs: 'ctrl',
          controller: 'CandidateEditFormCrtl',
          resolve: {
            elections: [
              'ElectionsServiceForES',
              function (ElectionsServiceForES) {
                return ElectionsServiceForES.getElections();
              }
            ],
            currentElections: [
              'CurrentElectionsServiceForES',
              function (CurrentElectionsServiceForCandidate) {
                return CurrentElectionsServiceForCandidate.getCurrentElections();
              }
            ],
            divisions: function (DivisionsServiceForSeats) {
              return DivisionsServiceForSeats.getDivisions();
            },
            politicalParties: function (PoliticalPartiesServiceForCandidate) {
              return PoliticalPartiesServiceForCandidate.getPoliticalParties();
            },
            constitutionalPosts: function (ConstitutionalPostsService) {
              return ConstitutionalPostsService.getConstitutionalPosts();
            },
            newCandidate: function (CandidatesService,$stateParams) {
              return CandidatesService.getCandidate($stateParams.candidateId);
            },
            electionSeat: function () {
              return {};
            }
          }
        })

        .state('app.candidates.candidateMerge', {
          url: '/merge',
          templateUrl: 'modules/candidates/views/candidateMerge.html',
          controllerAs: 'ctrl',
          controller: 'CandidateMergeCrtl'
        })

        .state('app.candidates.addedit.editAffidavit', {
          url: '/affidavit/:candidateId',
          templateUrl: 'modules/candidates/views/affidavit/edit.html',
          controllerAs: 'ctrl',
          controller: 'CandidateEditAffidavitCrtl'
        })
        .state('app.candidates.addedit.editFSEE', {
          url: '/fsee/:candidateId',
          templateUrl: 'modules/candidates/views/fsee/edit.html',
          controllerAs: 'ctrl',
          controller: 'CandidateEditFSEECrtl'
        })
        .state('app.candidates.addedit.editALIE', {
          url: '/alie/:candidateId',
          templateUrl: 'modules/candidates/views/alie/edit.html',
          controllerAs: 'ctrl',
          controller: 'CandidateEditALIECrtl'
        })
        .state('app.candidates.addedit.editEER', {
          url: '/eer/:candidateId',
          templateUrl: 'modules/candidates/views/eer/edit.html',
          controllerAs: 'ctrl',
          controller: 'CandidateEditEERCrtl'
        })
        .state('app.candidates.addedit.editMurdhanno', {
          url: '/murdhanno/:candidateId',
          templateUrl: 'modules/candidates/views/murdhanno/edit.html',
          controllerAs: 'ctrl',
          controller: 'CandidateEditMurdhannoCrtl'
        })
        .state('app.candidates.addedit.editTR', {
          url: '/tr/:candidateId',
          templateUrl: 'modules/candidates/views/tax-return/edit.html',
          controllerAs: 'ctrl',
          controller: 'CandidateEditTaxReturnCrtl'
        });

    });

})();
