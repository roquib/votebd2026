(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.fPoliticalParty.controller:PoliticalPartyAllPartiesCtrl
   * @description Candidate Search controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.fPoliticalParty')
    .controller('PoliticalPartyAllPartiesCtrl', function ($scope, PoliticalPartyService, $rootScope) {
      $scope.ppList = [];
      PoliticalPartyService.getAll()
        .then(function (ppdata) {
          if ($rootScope.locale.lang === 'bn_BD') {
            for (var i = 0; i < ppdata.length; i++) {
              $scope.ppList.push({
                partyName: ppdata[i].partyNameBn,
                chairPersonName: ppdata[i].chairpersonNameBn
              });
            }
          } else {
            for (var i = 0; i < ppdata.length; i++) {
              $scope.ppList.push({
                partyName: ppdata[i].partyNameEn,
                chairPersonName: ppdata[i].chairpersonNameBn
              });
            }
          }
        });

    });

})();
