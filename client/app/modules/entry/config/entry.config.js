(function () {
  'use strict';
  angular
    .module('com.module.entry')
    .run(function ($rootScope, $http, CoreService, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Entry'), 'app.entry.list', 'fa-info');

    });

})();
