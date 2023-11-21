'use strict';

angular.module('com.module.core').factory('Search', ['$http',
    function ($http) {
        return {
            getCustomSearchResults: function (search_term, result_count) {
                var urlBase = 'http://localhost:3000/customsearch',
                    callbackName = 'JSON_CALLBACK',
                    url = urlBase + '/' + search_term + '/' + result_count + '?callback=' + callbackName;

                return $http.jsonp(url);
            }
        };
    }
]);