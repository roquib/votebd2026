(function () {
  'use strict';
  angular
    .module('com.module.fHome')
    .run(function ($rootScope, $sce, gettextCatalog){
      $rootScope.cdnUrl=$sce.trustAsResourceUrl('https://thp.sgp1.cdn.digitaloceanspaces.com');
      $rootScope.bdMapUrl=$sce.trustAsResourceUrl('/images/bdmaps/divisions2.svg');
//      $sceDelegateProvider.resourceUrlWhitelist([
//            // Allow same origin resource loads.
//            'self',
//            // Allow loading from our assets domain. **.
//            'https://thp.sgp1.cdn.digitaloceanspaces.com/**'
//      ]);
    });

})();
