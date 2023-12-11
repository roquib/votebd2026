(function () {
  "use strict";
  angular
    .module("com.module.politicalParties")
    .config(function ($stateProvider) {
      $stateProvider
        .state("app.politicalParties", {
          abstract: true,
          url: "/politicalParties",
          templateUrl: "modules/political-parties/views/main.html",
        })
        .state("app.politicalParties.list", {
          url: "",
          templateUrl: "modules/political-parties/views/list.html",
          controllerAs: "ctrl",
          controller: function (politicalParties) {
            this.politicalParties = politicalParties;
          },
          resolve: {
            politicalParties: function (PoliticalPartiesService) {
              return PoliticalPartiesService.getPoliticalParties();
            },
          },
        })
        .state("app.politicalParties.add", {
          url: "/add",
          templateUrl: "modules/political-parties/views/form.html",
          controllerAs: "ctrl",
          controller: function (
            $scope,
            $state,
            PoliticalPartiesService,
            politicalParty,
            Upload,
            $timeout
          ) {
            $scope.uploadPic = function (politicalPartyMarka) {
              politicalPartyMarka.upload = Upload.upload({
                url: "http://192.168.0.103:3000/uploadsymbol",
                data: { politicalPartyMarka: politicalPartyMarka },
              });
              // console.log(politicalPartyMarka.upload);
              politicalPartyMarka.upload.then(
                function (response) {
                  $timeout(function () {
                    $scope.politicalPartyMarka = response.data;
                    politicalPartyMarka.result = response.data;
                  });
                },
                function (response) {
                  if (response.status > 0)
                    $scope.errorMsg = response.status + ": " + response.data;
                },
                function (evt) {
                  // Math.min is to fix IE which reports 200% sometimes
                  politicalPartyMarka.progress = Math.min(
                    100,
                    parseInt((100.0 * evt.loaded) / evt.total)
                  );
                }
              );
            };

            this.politicalParty = politicalParty;
            this.formFields = PoliticalPartiesService.getFormFields();
            // console.log(this.formFields.length);
            this.formOptions = {};
            this.submit = function () {
              this.politicalParty.politicalPartyMarka =
                $scope.politicalPartyMarka;
              PoliticalPartiesService.upsertPoliticalParty(
                this.politicalParty
              ).then(function () {
                $state.go("^.list");
              });
            };
          },
          resolve: {
            politicalParty: function () {
              return {};
            },
          },
        })
        .state("app.politicalParties.edit", {
          url: "/:id/edit",
          templateUrl: "modules/political-parties/views/form.html",
          controllerAs: "ctrl",
          controller: function (
            $scope,
            $state,
            PoliticalPartiesService,
            politicalParty,
            Upload,
            $timeout
          ) {
            $scope.uploadPic = function (politicalPartyMarka) {
              politicalPartyMarka.upload = Upload.upload({
                url: "http://192.168.0.103:3000/uploadsymbol",
                data: { politicalPartyMarka: politicalPartyMarka },
              });
              // console.log(politicalPartyMarka.upload);
              politicalPartyMarka.upload.then(
                function (response) {
                  $timeout(function () {
                    $scope.politicalPartyMarka = response.data;
                    politicalPartyMarka.result = response.data;
                    // console.log($scope.politicalPartyMarka);
                  });
                },
                function (response) {
                  if (response.status > 0)
                    $scope.errorMsg = response.status + ": " + response.data;
                },
                function (evt) {
                  // Math.min is to fix IE which reports 200% sometimes
                  politicalPartyMarka.progress = Math.min(
                    100,
                    parseInt((100.0 * evt.loaded) / evt.total)
                  );
                }
              );
            };

            this.politicalParty = politicalParty;
            this.formFields = PoliticalPartiesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              this.politicalParty.politicalPartyMarka =
                $scope.politicalPartyMarka;
              PoliticalPartiesService.upsertPoliticalParty(
                this.politicalParty
              ).then(function () {
                $state.go("^.list");
              });
            };
          },
          resolve: {
            politicalParty: function ($stateParams, PoliticalPartiesService) {
              return PoliticalPartiesService.getPoliticalParty($stateParams.id);
            },
          },
        })
        .state("app.politicalParties.view", {
          url: "/:id",
          templateUrl: "modules/political-parties/views/view.html",
          controllerAs: "ctrl",
          controller: function (politicalParty) {
            this.politicalParty = politicalParty;
          },
          resolve: {
            politicalParty: function ($stateParams, PoliticalPartiesService) {
              return PoliticalPartiesService.getPoliticalParty($stateParams.id);
            },
          },
        })
        .state("app.politicalParties.delete", {
          url: "/:id/delete",
          template: "",
          controllerAs: "ctrl",
          controller: function (
            $state,
            PoliticalPartiesService,
            politicalParty
          ) {
            PoliticalPartiesService.deletePoliticalParty(
              politicalParty.id,
              function () {
                $state.go("^.list");
              },
              function () {
                $state.go("^.list");
              }
            );
          },
          resolve: {
            politicalParty: function ($stateParams, PoliticalPartiesService) {
              return PoliticalPartiesService.getPoliticalParty($stateParams.id);
            },
          },
        });
    });
})();
