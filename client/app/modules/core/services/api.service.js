(function () {
  'use strict';
  angular
    .module('com.module.core')
    .service('ApiService', function ($q, $http, ENV) {

      this.checkConnection = function () {
        // console.log('ENV.apiUrl');
        // console.log(ENV.apiUrl);

        return $q(function (resolve, reject) {
          $http.get(ENV.apiUrl + '/settings')
            .success(resolve)
            .error(reject);
        });
      };

    });

})();
