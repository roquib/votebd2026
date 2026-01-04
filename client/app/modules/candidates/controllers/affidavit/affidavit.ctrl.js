(function () {
  "use strict";
  angular
    .module("com.module.candidates")
    .controller("CandidateEditAffidavitCrtl", [
      "$scope",
      "$stateParams",
      "Upload",
      "$timeout",
      "CandidatesService",
      "ElectionCandidatePostsService",
      "CoreService",
      "gettextCatalog",
      "LoopBackAuth",
      "User",
      function (
        $scope,
        $stateParams,
        Upload,
        $timeout,
        CandidatesService,
        ElectionCandidatePostsService,
        CoreService,
        gettextCatalog,
        LoopBackAuth,
        User
      ) {
        $scope.uploadPic = function (candidatePhoto) {
          candidatePhoto.upload = Upload.upload({
            url: "http://192.168.1.2:3000/upload",
            data: { candidatePhoto: candidatePhoto },
          });

          candidatePhoto.upload.then(
            function (response) {
              $timeout(function () {
                $scope.$parent.gotCandidate.candidatePhoto = response.data;
                //$scope.uploadedFileName=response.data;
                candidatePhoto.result = response.data;
              });
            },
            function (response) {
              if (response.status > 0)
                $scope.errorMsg = response.status + ": " + response.data;
            },
            function (evt) {
              // Math.min is to fix IE which reports 200% sometimes
              candidatePhoto.progress = Math.min(
                100,
                parseInt((100.0 * evt.loaded) / evt.total)
              );
            }
          );
        };

        // console.log('LoopBackAuth.currentUserId');
        // console.log(LoopBackAuth.currentUserId);

        console.log("affidavit controller initiation");
        //console.log($location);
        //console.log($scope.gotCandidate);
        $scope.electionCandidatePosts = [];

        $scope.$on("changeCandidate", function () {
          $scope.initiateCandidate("noNeedToSearchCandidate");
        });

        $scope.initiateCandidate = function (msg) {
          if (msg == "needToSearchCandidate") {
            if (
              $stateParams.hasOwnProperty("candidateId") &&
              $stateParams.candidateId
            ) {
              CandidatesService.getCandidate($stateParams.candidateId).then(
                function (candidate) {
                  $scope.$parent.gotCandidate = candidate;

                  //ElectionCandidatePostsService.getElectionCandidatePostsByCurrentElection(candidate.currentElectionId).then(function(electionCandidatePosts){
                  //  console.log('electionCandidatePosts');
                  //  console.log(electionCandidatePosts);
                  //  $scope.electionCandidatePosts = electionCandidatePosts;
                  //})

                  $scope.initiateGotCandidate();

                  // console.log(typeof $scope.gotCandidate.submitDateAF );

                  if ($scope.gotCandidate.submitDateAF)
                    $scope.gotCandidate.submitDateAF = new Date(
                      $scope.gotCandidate.submitDateAF.replace(/-/g, "/")
                    );

                  // console.log(typeof $scope.gotCandidate.submitDateAF )
                }
              );
            }
          } else {
            $scope.initiateGotCandidate();
          }
        };

        $scope.initiateGotCandidate = function () {
          // console.log('call hoyeche');
        };

        $scope.initiateCandidate("needToSearchCandidate");

        this.add_lawPresentAF = function () {
          if (!$scope.gotCandidate.hasOwnProperty("lawPresentAF"))
            $scope.gotCandidate.lawPresentAF = [];

          $scope.gotCandidate.lawPresentAF.push({});
        };
        this.delete_lawPresentAF = function () {
          $scope.gotCandidate.lawPresentAF.pop();
        };

        this.add_lawPastAF = function () {
          if (!$scope.gotCandidate.hasOwnProperty("lawPastAF"))
            $scope.gotCandidate.lawPastAF = [];

          $scope.gotCandidate.lawPastAF.push({});
        };
        this.delete_lawPastAF = function () {
          $scope.gotCandidate.lawPastAF.pop();
        };

        this.add_incomeSourceAF = function () {
          if (!$scope.gotCandidate.hasOwnProperty("incomeSourceAF"))
            $scope.gotCandidate.incomeSourceAF = [];

          $scope.gotCandidate.incomeSourceAF.push({});
        };
        this.delete_incomeSourceAF = function () {
          $scope.gotCandidate.incomeSourceAF.pop();
        };

        this.add_assetMaterialAF = function () {
          if (!$scope.gotCandidate.hasOwnProperty("assetMaterialAF"))
            $scope.gotCandidate.assetMaterialAF = [];

          $scope.gotCandidate.assetMaterialAF.push({});
        };
        this.delete_assetMaterialAF = function () {
          $scope.gotCandidate.assetMaterialAF.pop();
        };

        this.add_assetImmaterialAF = function () {
          if (!$scope.gotCandidate.hasOwnProperty("assetImmaterialAF"))
            $scope.gotCandidate.assetImmaterialAF = [];

          $scope.gotCandidate.assetImmaterialAF.push({});
        };
        this.delete_assetImmaterialAF = function () {
          $scope.gotCandidate.assetImmaterialAF.pop();
        };

        this.add_commitmentAndAchievementWhileMpAF = function () {
          if (
            !$scope.gotCandidate.hasOwnProperty(
              "commitmentAndAchievementWhileMpAF"
            )
          )
            $scope.gotCandidate.commitmentAndAchievementWhileMpAF = [];

          $scope.gotCandidate.commitmentAndAchievementWhileMpAF.push({});
        };
        this.delete_commitmentAndAchievementWhileMpAF = function () {
          $scope.gotCandidate.commitmentAndAchievementWhileMpAF.pop();
        };

        this.add_loanAF = function () {
          if (!$scope.gotCandidate.hasOwnProperty("loanAF"))
            $scope.gotCandidate.loanAF = [];

          $scope.gotCandidate.loanAF.push({});
        };
        this.delete_loanAF = function () {
          $scope.gotCandidate.loanAF.pop();
        };

        this.add_dependentsAF = function () {
          if (!$scope.gotCandidate.hasOwnProperty("dependentsAF"))
            $scope.gotCandidate.dependentsAF = [];

          $scope.gotCandidate.dependentsAF.push({});
        };
        this.delete_dependentsAF = function () {
          $scope.gotCandidate.dependentsAF.pop();
        };

        this.add_electionHistoryAF = function () {
          if (!$scope.gotCandidate.hasOwnProperty("electionHistoryAF"))
            $scope.gotCandidate.electionHistoryAF = [];

          $scope.gotCandidate.electionHistoryAF.push({});
        };
        this.delete_electionHistoryAF = function () {
          $scope.gotCandidate.electionHistoryAF.pop();
        };

        /*===========ChangeOrder==============*/
        this.changeCaseListOrder = function (whichCase) {
          if (whichCase == "past_case") {
            if (
              $scope.gotCandidate.lawPastAF &&
              $scope.gotCandidate.lawPastAF.length
            ) {
              $scope.gotCandidate.lawPastAF.reverse();
            }
          } else if (whichCase == "present_case") {
            if (
              $scope.gotCandidate.lawPresentAF &&
              $scope.gotCandidate.lawPresentAF.length
            ) {
              $scope.gotCandidate.lawPresentAF.reverse();
            }
          } else if (whichCase == "asset_Material") {
            if (
              $scope.gotCandidate.assetMaterialAF &&
              $scope.gotCandidate.assetMaterialAF.length
            ) {
              $scope.gotCandidate.assetMaterialAF.reverse();
            }
          } else if (whichCase == "asset_Immaterial") {
            if (
              $scope.gotCandidate.assetImmaterialAF &&
              $scope.gotCandidate.assetImmaterialAF.length
            ) {
              $scope.gotCandidate.assetImmaterialAF.reverse();
            }
          }
          this.submit();
        };

        this.submit = function () {
          function IsNumeric(input) {
            return input - 0 == input && ("" + input).trim().length > 0;
          }

          $scope.gotCandidate.statusAF = true;
          $scope.gotCandidate.isPublishedAF = true;
          //$scope.gotCandidate.submissionDateFSEE=true;

          //incomeSourceAF
          var totalOwnIncomeAF = 0,
            totalDependentIncomeAF = 0;
          if (
            $scope.gotCandidate.hasOwnProperty("incomeSourceAF") &&
            $scope.gotCandidate.incomeSourceAF.length
          ) {
            for (
              var i = 0;
              i < $scope.gotCandidate.incomeSourceAF.length;
              i++
            ) {
              if (
                $scope.gotCandidate.incomeSourceAF[i].hasOwnProperty("own") &&
                IsNumeric($scope.gotCandidate.incomeSourceAF[i].own) &&
                Number($scope.gotCandidate.incomeSourceAF[i].own)
              ) {
                $scope.gotCandidate.incomeSourceAF[i].own = Number(
                  $scope.gotCandidate.incomeSourceAF[i].own
                );
                totalOwnIncomeAF += $scope.gotCandidate.incomeSourceAF[i].own;
              }
            }
            for (i = 0; i < $scope.gotCandidate.incomeSourceAF.length; i++) {
              if (
                $scope.gotCandidate.incomeSourceAF[i].hasOwnProperty(
                  "dependents"
                ) &&
                IsNumeric($scope.gotCandidate.incomeSourceAF[i].dependents) &&
                Number($scope.gotCandidate.incomeSourceAF[i].dependents)
              ) {
                $scope.gotCandidate.incomeSourceAF[i].dependents = Number(
                  $scope.gotCandidate.incomeSourceAF[i].dependents
                );
                totalDependentIncomeAF +=
                  $scope.gotCandidate.incomeSourceAF[i].dependents;
              }
            }
          }

          $scope.gotCandidate.totalOwnIncomeAF = 0;
          if (totalOwnIncomeAF)
            $scope.gotCandidate.totalOwnIncomeAF = totalOwnIncomeAF;

          $scope.gotCandidate.totalDependentIncomeAF = 0;
          if (totalDependentIncomeAF)
            $scope.gotCandidate.totalDependentIncomeAF = totalDependentIncomeAF;

          $scope.gotCandidate.grandTotalIncomeAF =
            $scope.gotCandidate.totalOwnIncomeAF +
            $scope.gotCandidate.totalDependentIncomeAF;

          //assetMaterialAF
          var assetMaterialOwnTotalAF = 0,
            assetMaterialHusbandWifeTotalAF = 0,
            assetMaterialDependantsTotalAF = 0;
          if (
            $scope.gotCandidate.hasOwnProperty("assetMaterialAF") &&
            $scope.gotCandidate.assetMaterialAF.length
          ) {
            for (
              var i = 0;
              i < $scope.gotCandidate.assetMaterialAF.length;
              i++
            ) {
              if (
                $scope.gotCandidate.assetMaterialAF[i].hasOwnProperty(
                  "priceOwn"
                ) &&
                IsNumeric($scope.gotCandidate.assetMaterialAF[i].priceOwn) &&
                Number($scope.gotCandidate.assetMaterialAF[i].priceOwn)
              ) {
                $scope.gotCandidate.assetMaterialAF[i].priceOwn = Number(
                  $scope.gotCandidate.assetMaterialAF[i].priceOwn
                );
                assetMaterialOwnTotalAF +=
                  $scope.gotCandidate.assetMaterialAF[i].priceOwn;
              }
            }
            for (i = 0; i < $scope.gotCandidate.assetMaterialAF.length; i++) {
              if (
                $scope.gotCandidate.assetMaterialAF[i].hasOwnProperty(
                  "priceHusbandWife"
                ) &&
                IsNumeric(
                  $scope.gotCandidate.assetMaterialAF[i].priceHusbandWife
                ) &&
                Number($scope.gotCandidate.assetMaterialAF[i].priceHusbandWife)
              ) {
                $scope.gotCandidate.assetMaterialAF[i].priceHusbandWife =
                  Number(
                    $scope.gotCandidate.assetMaterialAF[i].priceHusbandWife
                  );
                assetMaterialHusbandWifeTotalAF +=
                  $scope.gotCandidate.assetMaterialAF[i].priceHusbandWife;
              }
            }
            for (i = 0; i < $scope.gotCandidate.assetMaterialAF.length; i++) {
              if (
                $scope.gotCandidate.assetMaterialAF[i].hasOwnProperty(
                  "priceDependants"
                ) &&
                IsNumeric(
                  $scope.gotCandidate.assetMaterialAF[i].priceDependants
                ) &&
                Number($scope.gotCandidate.assetMaterialAF[i].priceDependants)
              ) {
                $scope.gotCandidate.assetMaterialAF[i].priceDependants = Number(
                  $scope.gotCandidate.assetMaterialAF[i].priceDependants
                );
                assetMaterialDependantsTotalAF +=
                  $scope.gotCandidate.assetMaterialAF[i].priceDependants;
              }
            }
          }

          $scope.gotCandidate.assetMaterialOwnTotalAF = 0;
          if (assetMaterialOwnTotalAF)
            $scope.gotCandidate.assetMaterialOwnTotalAF =
              assetMaterialOwnTotalAF;

          $scope.gotCandidate.assetMaterialHusbandWifeTotalAF = 0;
          if (assetMaterialHusbandWifeTotalAF)
            $scope.gotCandidate.assetMaterialHusbandWifeTotalAF =
              assetMaterialHusbandWifeTotalAF;

          $scope.gotCandidate.assetMaterialDependantsTotalAF = 0;
          if (assetMaterialDependantsTotalAF)
            $scope.gotCandidate.assetMaterialDependantsTotalAF =
              assetMaterialDependantsTotalAF;

          $scope.gotCandidate.assetMaterialTotalAF =
            $scope.gotCandidate.assetMaterialOwnTotalAF +
            $scope.gotCandidate.assetMaterialHusbandWifeTotalAF +
            $scope.gotCandidate.assetMaterialDependantsTotalAF;

          //////////////////////////////////////

          //assetImmaterialAF
          var assetImmaterialOwnTotalAF = 0,
            assetImmaterialHusbandWifeTotalAF = 0,
            assetImmaterialDependantsTotalAF = 0,
            assetJointOwnershipTotalAF = 0,
            assetJointSharePartTotalAF = 0;
          if (
            $scope.gotCandidate.hasOwnProperty("assetImmaterialAF") &&
            $scope.gotCandidate.assetImmaterialAF.length
          ) {
            for (
              var i = 0;
              i < $scope.gotCandidate.assetImmaterialAF.length;
              i++
            ) {
              if (
                $scope.gotCandidate.assetImmaterialAF[i].hasOwnProperty(
                  "priceOwn"
                ) &&
                IsNumeric($scope.gotCandidate.assetImmaterialAF[i].priceOwn) &&
                Number($scope.gotCandidate.assetImmaterialAF[i].priceOwn)
              ) {
                $scope.gotCandidate.assetImmaterialAF[i].priceOwn = Number(
                  $scope.gotCandidate.assetImmaterialAF[i].priceOwn
                );
                assetImmaterialOwnTotalAF +=
                  $scope.gotCandidate.assetImmaterialAF[i].priceOwn;
              }
            }
            for (i = 0; i < $scope.gotCandidate.assetImmaterialAF.length; i++) {
              if (
                $scope.gotCandidate.assetImmaterialAF[i].hasOwnProperty(
                  "priceHusbandWife"
                ) &&
                IsNumeric(
                  $scope.gotCandidate.assetImmaterialAF[i].priceHusbandWife
                ) &&
                Number(
                  $scope.gotCandidate.assetImmaterialAF[i].priceHusbandWife
                )
              ) {
                $scope.gotCandidate.assetImmaterialAF[i].priceHusbandWife =
                  Number(
                    $scope.gotCandidate.assetImmaterialAF[i].priceHusbandWife
                  );
                assetImmaterialHusbandWifeTotalAF +=
                  $scope.gotCandidate.assetImmaterialAF[i].priceHusbandWife;
              }
            }
            for (i = 0; i < $scope.gotCandidate.assetImmaterialAF.length; i++) {
              if (
                $scope.gotCandidate.assetImmaterialAF[i].hasOwnProperty(
                  "priceDependants"
                ) &&
                IsNumeric(
                  $scope.gotCandidate.assetImmaterialAF[i].priceDependants
                ) &&
                Number($scope.gotCandidate.assetImmaterialAF[i].priceDependants)
              ) {
                $scope.gotCandidate.assetImmaterialAF[i].priceDependants =
                  Number(
                    $scope.gotCandidate.assetImmaterialAF[i].priceDependants
                  );
                assetImmaterialDependantsTotalAF +=
                  $scope.gotCandidate.assetImmaterialAF[i].priceDependants;
              }
            }
            for (i = 0; i < $scope.gotCandidate.assetImmaterialAF.length; i++) {
              if (
                $scope.gotCandidate.assetImmaterialAF[i].hasOwnProperty(
                  "priceJointOwnership"
                ) &&
                IsNumeric(
                  $scope.gotCandidate.assetImmaterialAF[i].priceJointOwnership
                ) &&
                Number(
                  $scope.gotCandidate.assetImmaterialAF[i].priceJointOwnership
                )
              ) {
                $scope.gotCandidate.assetImmaterialAF[i].priceJointOwnership =
                  Number(
                    $scope.gotCandidate.assetImmaterialAF[i].priceJointOwnership
                  );
                assetJointOwnershipTotalAF +=
                  $scope.gotCandidate.assetImmaterialAF[i].priceJointOwnership;
              }
            }
            for (i = 0; i < $scope.gotCandidate.assetImmaterialAF.length; i++) {
              if (
                $scope.gotCandidate.assetImmaterialAF[i].hasOwnProperty(
                  "priceJointSharePart"
                ) &&
                IsNumeric(
                  $scope.gotCandidate.assetImmaterialAF[i].priceJointSharePart
                ) &&
                Number(
                  $scope.gotCandidate.assetImmaterialAF[i].priceJointSharePart
                )
              ) {
                $scope.gotCandidate.assetImmaterialAF[i].priceJointSharePart =
                  Number(
                    $scope.gotCandidate.assetImmaterialAF[i].priceJointSharePart
                  );
                assetJointSharePartTotalAF +=
                  $scope.gotCandidate.assetImmaterialAF[i].priceJointSharePart;
              }
            }
          }

          $scope.gotCandidate.assetImmaterialOwnTotalAF = 0;
          if (assetImmaterialOwnTotalAF)
            $scope.gotCandidate.assetImmaterialOwnTotalAF =
              assetImmaterialOwnTotalAF;

          $scope.gotCandidate.assetImmaterialHusbandWifeTotalAF = 0;
          if (assetImmaterialHusbandWifeTotalAF)
            $scope.gotCandidate.assetImmaterialHusbandWifeTotalAF =
              assetImmaterialHusbandWifeTotalAF;

          $scope.gotCandidate.assetImmaterialDependantsTotalAF = 0;
          if (assetImmaterialDependantsTotalAF)
            $scope.gotCandidate.assetImmaterialDependantsTotalAF =
              assetImmaterialDependantsTotalAF;

          $scope.gotCandidate.assetJointOwnershipTotalAF = 0;
          if (assetJointOwnershipTotalAF)
            $scope.gotCandidate.assetJointOwnershipTotalAF =
              assetJointOwnershipTotalAF;

          $scope.gotCandidate.assetJointSharePartTotalAF = 0;
          if (assetJointSharePartTotalAF)
            $scope.gotCandidate.assetJointSharePartTotalAF =
              assetJointSharePartTotalAF;

          $scope.gotCandidate.assetImmaterialTotalAF =
            $scope.gotCandidate.assetImmaterialOwnTotalAF +
            $scope.gotCandidate.assetImmaterialHusbandWifeTotalAF +
            $scope.gotCandidate.assetImmaterialDependantsTotalAF +
            $scope.gotCandidate.assetJointOwnershipTotalAF +
            $scope.gotCandidate.assetJointSharePartTotalAF;

          $scope.gotCandidate.assetGrandTotalAF =
            $scope.gotCandidate.assetMaterialTotalAF +
            $scope.gotCandidate.assetImmaterialTotalAF;
          //loanAF////////////////////////////////////////////////
          var totalLoan = 0;
          var totalSingleAmountAF = 0;
          var totalJointAmoutAF = 0;
          var totalDependedantsAmountAF = 0;
          var totalDirectorOrChairmenAmoutAF = 0;
          var loanAmount = 0;

          if (
            $scope.gotCandidate.hasOwnProperty("loanAF") &&
            $scope.gotCandidate.loanAF.length
          ) {
            for (var i = 0; i < $scope.gotCandidate.loanAF.length; i++) {
              loanAmount = 0;

              if (IsNumeric($scope.gotCandidate.loanAF[i].loanAmount)) {
                totalLoan += Number($scope.gotCandidate.loanAF[i].loanAmount);
                loanAmount = Number($scope.gotCandidate.loanAF[i].loanAmount);
              }

              //totalSingleAmountAF=0;
              if (
                $scope.gotCandidate.loanAF[i].loanType == "single" &&
                loanAmount
              )
                totalSingleAmountAF += loanAmount;

              //totalJointAmoutAF=0;
              if (
                $scope.gotCandidate.loanAF[i].loanType == "joint" &&
                loanAmount
              )
                totalJointAmoutAF += loanAmount;

              //totalDependedantsAmountAF=0;
              if (
                $scope.gotCandidate.loanAF[i].loanType == "dependants" &&
                loanAmount
              )
                totalDependedantsAmountAF += loanAmount;

              //totalDirectorOrChairmenAmoutAF=0;
              if (
                $scope.gotCandidate.loanAF[i].loanType == "director_chairman" &&
                loanAmount
              )
                totalDirectorOrChairmenAmoutAF += loanAmount;
            }

            if (totalSingleAmountAF)
              $scope.gotCandidate.totalSingleAmountAF = totalSingleAmountAF;
            if (totalJointAmoutAF)
              $scope.gotCandidate.totalJointAmoutAF = totalJointAmoutAF;
            if (totalDependedantsAmountAF)
              $scope.gotCandidate.totalDependedantsAmountAF =
                totalDependedantsAmountAF;
            if (totalDirectorOrChairmenAmoutAF)
              $scope.gotCandidate.totalDirectorOrChairmenAmoutAF =
                totalDirectorOrChairmenAmoutAF;

            $scope.gotCandidate.totalLoanAF = totalLoan;
          }

          /////////////////////////////////////////

          // console.log($scope.gotCandidate);

          //law related field
          if ($scope.gotCandidate.criminalCourtStatusAF) {
            $scope.gotCandidate.criminalCourtStatusBnAF = "হ্যা";
          } else {
            $scope.gotCandidate.criminalCourtStatusAF = false;
            $scope.gotCandidate.criminalCourtStatusBnAF = "না";
          }

          if ($scope.gotCandidate.pastCriminalCourtStatusAF) {
            $scope.gotCandidate.pastCriminalCourtStatusBnAF = "হ্যা";
          } else {
            $scope.gotCandidate.pastCriminalCourtStatusAF = false;
            $scope.gotCandidate.pastCriminalCourtStatusBnAF = "না";
          }

          if ($scope.gotCandidate.hasOwnProperty("lawPresentAF"))
            $scope.gotCandidate.lawPresentCountAF =
              $scope.gotCandidate.lawPresentAF.length;
          if ($scope.gotCandidate.hasOwnProperty("lawPastAF"))
            $scope.gotCandidate.lawPastCountAF =
              $scope.gotCandidate.lawPastAF.length;

          //$scope.gotCandidate.sdf = LoopBackAuth.currentUserId;

          //console.log("before");
          User.getCurrent().$promise.then(function (user) {
            //console.log(user.id);
            $scope.gotCandidate.createdByAF = user.id;
            $scope.gotCandidate.modifiedByAF = user.id;
            //console.log("$scope.gotCandidate");
            //console.log($scope.gotCandidate);

            CandidatesService.upsertCandidate($scope.gotCandidate).then(
              function (candidate) {
                //$state.go('^.list');
                if (
                  candidate &&
                  candidate.hasOwnProperty("personNameBn") &&
                  candidate.personNameBn
                ) {
                  CoreService.toastSuccess(
                    gettextCatalog.getString("Candidate Updated"),
                    gettextCatalog.getString(
                      "Your Candidate Affidavit form is save with us"
                    )
                  );
                  //console.log('candidate',candidate);
                }
              }
            );
          });
          //console.log("after");
        };
      },
    ]);
})();
