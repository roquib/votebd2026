(function () {
  'use strict';
  angular
    .module('com.module.fPoliticalParty')
    .service('PoliticalPartyService', function (CoreService, Candidate,PoliticalParty) {
      this.getAll= function () {
        return PoliticalParty.find({}
        ).$promise;
      };
    });

})();
