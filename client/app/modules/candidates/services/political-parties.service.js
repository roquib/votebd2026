(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .service('PoliticalPartiesServiceForCandidate', function ($state, CoreService, PoliticalParty, gettextCatalog) {

      this.getPoliticalParties = function () {
        return PoliticalParty.find().$promise;
      };

      this.getPoliticalParty = function (id) {
        return PoliticalParty.findById({
          id: id
        }).$promise;
      };
    });

})();
