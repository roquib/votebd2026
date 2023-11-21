(function () {
  'use strict';
  angular
    .module('com.module.politicalPartyExpenses')
    .service('PoliticalPartiesServiceForPPE', function ($state, CoreService, PoliticalParty) {

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
