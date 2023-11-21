(function () {
  angular
    .module('com.module.bannerSettings')
    .service('BannerSettingService', function (CoreService, $rootScope,  $filter, CurrentElection, BannerSetting, gettextCatalog) {

      this.getCurrentElections = function () {
        return BannerSetting.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getCurrentElection = function (id) {
        return Bannersetting.findById({
          id: id
        }).$promise;
      };

      this.upsertBannerSetting = function (currentElection) {
        return BannerSetting.upsert(currentElection).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Current Election saved'),
              gettextCatalog.getString('Your Current Election is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Current Election '),
              gettextCatalog.getString('This Current Election could no be saved: ') + err
            );
          }
        );
      };


      this.getFormFields = function (elections, electionSeat) {
        var electionOptions = elections.map(function (election) {
          var nameFld = '';
          if ($rootScope.locale.lang == "bn_BD")
            nameFld = election.nameBn;
          else
            nameFld = election.nameEn;
          return {
            name: nameFld,
            value: election.id
          };
        });
        console.log(elections);
        var firstElectionOptions = [];
        // elections[25].currentElections.map(function (currentElection) {
        //   return {
        //     name: currentElection.currentElectionNameBn,
        //     value: currentElection.id
        //   };
        // });
        return [
          {
            key: 'electionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Election'),
              required: true,
              options: electionOptions
            }
          },
          {
            key: 'firstElectionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('First Current Election'),
              required: true,
              options: firstElectionOptions
            },
            controller: function ($scope, CurrentElectionsServiceForCA) {
              //when current election change then
              $scope.$watch('model.electionId', function (newValue, oldValue, theScope) {
                if (newValue !== oldValue) {
                  if ($scope.model[$scope.options.key] && oldValue) {
                    // reset this select
                    $scope.model[$scope.options.key] = '';
                  }
                  CurrentElectionsServiceForCA.getCurrentElections(newValue).then(function (currentElections) {
                    //console.log(currentElections);
                    $scope.to.options = currentElections.map(function (currentElection) {
                      var nameFld = '';
                      if ($rootScope.locale.lang == "bn_BD")
                        nameFld = $filter('date')(currentElection.electionDate, "yyyy") + '-' +currentElection.currentElectionNameBn;
                      else
                        nameFld = $filter('date')(currentElection.electionDate, "yyyy") + '-' +currentElection.currentElectionNameEn;
                      return {
                        name: nameFld,
                        value: currentElection.id
                      };
                    });
                  });
                }
              });
            }
          },
          {
            key: 'secondElectionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Second Current Election'),
              required: true,
              options: firstElectionOptions
            },
            controller: function ($scope, CurrentElectionsServiceForCA) {
              //when current election change then
              $scope.$watch('model.electionId', function (newValue, oldValue, theScope) {
                if (newValue !== oldValue) {
                  if ($scope.model[$scope.options.key] && oldValue) {
                    // reset this select
                    $scope.model[$scope.options.key] = '';
                  }
                  CurrentElectionsServiceForCA.getCurrentElections(newValue).then(function (currentElections) {
                    //console.log(currentElections);
                    $scope.to.options = currentElections.map(function (currentElection) {
                      var nameFld = '';
                      if ($rootScope.locale.lang == "bn_BD")
                        nameFld = $filter('date')(currentElection.electionDate, "yyyy") + '-' +currentElection.currentElectionNameBn;
                      else
                        nameFld = $filter('date')(currentElection.electionDate, "yyyy") + '-' +currentElection.currentElectionNameEn;
                      return {
                        name: nameFld,
                        value: currentElection.id
                      };
                    });
                  });
                }
              });
            }
          }
        ];
      };
    });
})();
