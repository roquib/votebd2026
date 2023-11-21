(function () {
  'use strict';
  angular
    .module('com.module.electionCandidatePosts')
    .factory('DataService', function DataService($http, $q){
      return {
        sports: sports,
        teams: teams,
        players: players
      };

      function sports() {
        var deferred = $q.defer();
        // dummy data
        var data = [{
          id: 1,
          name: 'Soccer'
        }, {
          id: 2,
          name: 'Basketball'
        }];
        deferred.resolve(data);
        return deferred.promise;
      }

      function teams(sport_id) {
        var deferred = $q.defer();
        // dummy data
        var data = [{
          id: 1,
          fk: 1,
          name: 'Bayern Munich'
        }, {
          id: 2,
          fk: 1,
          name: 'Real Madrid'
        }, {
          id: 3,
          fk: 2,
          name: 'Cleveland'
        }];
        if(!!sport_id) {
          var tmp = [];
          angular.forEach(data, function(val) {
            if(val.fk === sport_id)
              tmp.push(val);
          });
          deferred.resolve(tmp);
        } else {
          deferred.resolve(data);
        }


        return deferred.promise;
      }

      function players(team_id) {
        var deferred = $q.defer();
        // dummy data
        var data = [{
          id: 1,
          fk: 1,
          name: 'Mario Götze'
        }, {
          id: 1,
          fk: 2,
          name: 'Javier Hernandez'
        }, {
          id: 2,
          fk: 3,
          name: 'LeBron James'
        }];
        if(!!team_id) {
          var tmp = [];
          angular.forEach(data, function(val) {
            if(val.fk === team_id)
              tmp.push(val);
          });
          deferred.resolve(tmp);
        } else {
          deferred.resolve(data);
        }


        return deferred.promise;
      }

    });

})();
