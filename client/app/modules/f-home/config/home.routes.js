(function () {
  'use strict';
  angular
    .module('com.module.fHome')
    .config(function ($stateProvider) {
      $stateProvider
        .state('front.home', {
          url: '',
          templateUrl: 'modules/f-home/views/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.home.affidavit', {
          url: '',
          views:{
            'nationalElection':{
              templateUrl: 'modules/f-home/views/affidavit.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.fsee', {
          url: '',
          views:{
            'nationalElection':{
              templateUrl: 'modules/f-home/views/fsee.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.alie', {
          url: '',
          views:{
            'nationalElection':{
              templateUrl: 'modules/f-home/views/alie.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.eer', {
          url: '',
          views:{
            'nationalElection':{
              templateUrl: 'modules/f-home/views/eer.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.ppe', {
          url: '',
          views:{
            'nationalElection':{
              templateUrl: 'modules/f-home/views/ppe.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.citycorporaton-election', {
          url: '',
          views:{
            'otherElection':{
              templateUrl: 'modules/f-home/views/citycorporaton-election.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.municipal-election', {
          url: '',
          views:{
            'otherElection':{
              templateUrl: 'modules/f-home/views/municipal-election.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.upazilla-election', {
          url: '',
          views:{
            'otherElection':{
              templateUrl: 'modules/f-home/views/upazilla-election.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.citycorporaton-election.affidavit-cc', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/citycorp/affidavit-cc.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.citycorporaton-election.fsee-cc', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/citycorp/fsee-cc.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.citycorporaton-election.alie-cc', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/citycorp/alie-cc.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.citycorporaton-election.eer-cc', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/citycorp/eer-cc.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.citycorporaton-election.ppe-cc', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/citycorp/ppe-cc.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.municipal-election.muni-affidavit', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/municipal/muni-affidavit.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.municipal-election.muni-fsee', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/municipal/muni-fsee.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.municipal-election.muni-alie', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/municipal/muni-alie.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.municipal-election.muni-eer', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/municipal/muni-eer.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.upazilla-election.upaz-affidavit', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/upazilla/upaz-affidavit.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.upazilla-election.upaz-fsee', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/upazilla/upaz-fsee.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.upazilla-election.upaz-alie', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/upazilla/upaz-alie.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })
        .state('front.home.upazilla-election.upaz-eer', {
          url: '',
          views:{
            'cityCorporation':{
              templateUrl: 'modules/f-home/views/upazilla/upaz-eer.html',
              controllerAs: 'ctrl',
              controller: function () {
              }
            }
          }
        })

    }
  );

})();
