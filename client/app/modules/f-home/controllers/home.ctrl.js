(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:HomeCtrl
   * @description Home page controller
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.fHome')
    .controller('HomeCtrl', function($scope, $stateParams, HomeService, $http, $timeout, $interval, $location, $anchorScroll, $document, CoreService, gettextCatalog) {


      // console.log(Candidate)

      $('.myWrapper').easyTicker({
        height: '305',
      });


      $scope.currentElections=[];
      HomeService.getCurrentElectionsWithLimitSkip(5,0).then(function(data){
        $scope.currentElections=data;
      })


      $scope.elections=[];
      HomeService.getFeaturedElection(1).then(function(election) {
        $scope.featuredElections=election;

        $scope.featuredElectionId=$scope.featuredElections[0].id;
        $scope.femaleCandidate=0;
        for(var i=0; i<$scope.featuredElections[0].candidates.length; i++){
          if($scope.featuredElections[0].candidates[i].genderBn==="মহিলা"){
            $scope.femaleCandidate++;
          }
        }
        $scope.totalVoter=numberWithCommas($scope.featuredElections[0].totalVoter);
        $scope.maleVoter=numberWithCommas($scope.featuredElections[0].maleVoter);
        $scope.femaleVoter=numberWithCommas($scope.featuredElections[0].femaleVoter);


        var currentElectionCriteria={};
        currentElectionCriteria.currentElectionId = $scope.featuredElectionId;
        $scope.loadChartData = function () {
          HomeService.getCandidatesEducationWhere(currentElectionCriteria).then(function (candidates) {
            //console.log(candidates);
            $scope.educationData = candidates.data;
            $scope.educationChartBelowSscCount = $scope.educationData.all.c3data[0][1];
            var chart = c3.generate({
              data: {
                // iris data from R
                columns: $scope.educationData.all.c3data,
                type: 'pie'
              },
              bindto: "#education-chart"
            });
          });

          //chart-2-occupation
          HomeService.getCandidatesOccupationWhere(currentElectionCriteria).then(function (candidates) {
            //console.log(candidates);
            $scope.occupationData = candidates.data;
            $scope.occupationChartBusinessmenCount = $scope.occupationData.all.c3data[1][1];
            var chart = c3.generate({
              data: {
                columns: $scope.occupationData.all.c3data,
                type: 'pie'
              },
              bindto: "#occupationChart"
            });
          });
          //chart-3-cases
          HomeService.getCandidatesCasesWhere(currentElectionCriteria).then(function (candidates) {
            // console.log(candidates);
            $scope.casesData = candidates.data;
            $scope.pastCandidate302Case=$scope.casesData.all.pastCandidate302;
            $scope.presentCandidate302Case = $scope.casesData.all.presentCandidate302;
            //$scope.casesChartData = [];
            //candidates.data.table.forEach(function (val) {
            //  $scope.casesChartData.push([val.partyName, val.data.totalCases])
            //});
            //$scope.casesDataPresent302Count = $scope.casesData.all.c3data[3][1];
            //$scope.casesDataPast302Count = $scope.casesData.all.c3data[4][1];
            var chart = c3.generate({
              data: {
                columns: $scope.casesData.c3data,
                type: 'pie'
              },
              bindto: "#casesChart"
            });
          });

        };//loadchartdata

        $scope.loadChartData2 = function () {
          //chart-4-income
          HomeService.getCandidatesIncomeWhere(currentElectionCriteria).then(function (candidates) {
            // console.log(candidates);
            $scope.incomeData = candidates.data;
            $scope.incomeChartBelow2Lac   = $scope.incomeData.all.c3data[0][1];
            $scope.incomeChartAbove1Crore = $scope.incomeData.all.c3data[5][1];
            var chart = c3.generate({
              data: {
                columns: $scope.incomeData.all.c3data,
                type: 'pie'
              },
              bindto: "#incomeChart"
            });
          });

          //chart-5-asset
          //console.log("console.log(this.electionSeat)", $scope.electionSeat);
          HomeService.getCandidatesAssetWhere(currentElectionCriteria).then(function (candidates) {
            //console.log(candidates.data);
            $scope.assetData = candidates.data;
            $scope.assetChartBelow5Lac = $scope.assetData.all.c3data[0][1];
            $scope.assetChartAbove5Lac = $scope.assetData.all.c3data[1][1]+$scope.assetData.all.c3data[2][1]+$scope.assetData.all.c3data[3][1]+
                                         $scope.assetData.all.c3data[4][1]+$scope.assetData.all.c3data[5][1];
            var chart = c3.generate({
              data: {
                columns: $scope.assetData.all.c3data,
                type: 'pie'
              },
              bindto: "#assetChart"
            });
          });

          //chart-6-loan & liabilities
          HomeService.getCandidatesLoanWhere(currentElectionCriteria).then(function (candidates) {
            //console.log(candidates);
            $scope.loanData = candidates.data;
            $scope.loanChartAbove5Crore = $scope.loanData.all.c3data[5][1];
            var chart = c3.generate({
              data: {
                columns: $scope.loanData.all.c3data,
                type: 'pie'
              },
              bindto: "#loanChart"
            });
          });

          //chart-6-liabilities
          HomeService.getCandidatesLiabilityWhere(currentElectionCriteria).then(function (candidates) {
            //console.log(candidates);
            $scope.liabilityData = candidates.data;
            $scope.liabilityChartAbove5Crore = $scope.liabilityData.all.c3data[5][1];
            var chart = c3.generate({
              data: {
                columns: $scope.liabilityData.all.c3data,
                type: 'pie'
              },
              bindto: "#liabilityChart"
            });
          });

          //chart-7 Tax
          HomeService.getCandidatesTaxWhere(currentElectionCriteria).then(function (candidates) {
            // console.log(candidates);
            $scope.taxData = candidates.data;
            $scope.taxChartAbove10Lac = $scope.taxData.all.c3data[6][1];
            var chart = c3.generate({
              data: {
                columns: $scope.taxData.all.c3data,
                type: 'pie'
              },
              bindto: "#taxChart"
            });
          });

          //chart-8 Gender
          HomeService.getCandidatesGenderWhere(currentElectionCriteria).then(function (candidates) {
            // console.log(candidates);
            $scope.genderData = candidates.data;
            $scope.genderChartFemaleCount = $scope.genderData.all.c3data[1][1];
            var chart = c3.generate({
              data: {
                columns: $scope.genderData.all.c3data,
                type : 'pie'
              },
              bindto: "#genderChart"
            });
          });

        }; //loadhcartdata2



        $scope.candidateName = [];
        $scope.percentageofVote = [];
        var topCandidate = [];

        HomeService.topElectedCandidateWhere(currentElectionCriteria).then(candidate=>{
          topCandidate=candidate.data.all.c3data.sort((a, b) => b.percentageofCandidateVote - a.percentageofCandidateVote).slice(0,10);
          for(var i=0; i<topCandidate.length; i++){
            $scope.candidateName.push(topCandidate[i][0].candidateName);
            $scope.percentageofVote.push(topCandidate[i][0].percentageofCandidateVote);
          }
        })
        var currentElectionCandidateArray=[];
        var politicalPartyCandidateTotalVote=0;
        HomeService.getCurrentElectionCandidateVote($scope.featuredElectionId).then(function(candidates){
         candidates.forEach(function(data) {
           if(data.totalCountVote){
            if(!this[data.politicalParty.partyNameBn]) {
              this[data.politicalParty.partyNameBn] = { partyNameBn: data.politicalParty.partyNameBn, politicalPartyCandidateTotalVote:  0}
              currentElectionCandidateArray.push(this[data.politicalParty.partyNameBn]);
             }
            this[data.politicalParty.partyNameBn].politicalPartyCandidateTotalVote += Number(data.totalCountVote);
           }
          }, {});

          const totalCustingVote=105869352;
          $scope.percentageofPoliticalPartyVote=[];
          for(var i=0; i<currentElectionCandidateArray.length; i++){
            $scope.percentageofPoliticalPartyVote.push({partyNameBn:currentElectionCandidateArray[i].partyNameBn, politicalPartyCandidateTotalVote:((currentElectionCandidateArray[i].politicalPartyCandidateTotalVote*100)/totalCustingVote)})
          }
        })

        $scope.partyNameBn = [];
        $scope.candidatesTotalIncome = [];
        var electionid={
          firstElectionId : "56a5ea4b28a71eb81d91f953",
          secondElectionId : "5bf627d1baa616990d38f4d3"
        }

        $scope.options = {
          scales: {
            xAxes: [{
              stacked: false,
              beginAtZero: true,
              scaleLabel: {
                  labelString: 'Month'
              },
              ticks: {
                display: false
              }
            }]
          }
        };
        var outputArray = {
          firstElection:[],
          secondElection:[]
        };
        HomeService.firstElectionPoliticalPartyCandidateIncome(electionid.firstElectionId).then(function(candidates){
          let politicalPartyCandidateTotalIncome=0;
          candidates.forEach(function(data) {
            if(typeof data.grandTotalIncomeAF !=='undefined'){
              if(!this[data.politicalParty.partyNameBn]) {
                this[data.politicalParty.partyNameBn] = { partyNameBn: data.politicalParty.partyNameBn, politicalPartyCandidateTotalIncome:  0}
                outputArray.firstElection.push(this[data.politicalParty.partyNameBn]);
              }
              this[data.politicalParty.partyNameBn].politicalPartyCandidateTotalIncome += Number(data.grandTotalIncomeAF);
            }
          }, {});
        })

        HomeService.secondElectionPoliticalPartyCandidateIncome(electionid.secondElectionId).then(function(candidates){
          let politicalPartyCandidateTotalIncome=0;
          candidates.forEach(function(data) {
            if(typeof data.grandTotalIncomeAF!=='undefined'){
              if(!this[data.politicalParty.partyNameBn]) {
                this[data.politicalParty.partyNameBn] = { partyNameBn: data.politicalParty.partyNameBn, politicalPartyCandidateTotalIncome:  0}
                outputArray.secondElection.push(this[data.politicalParty.partyNameBn]);
              }
              this[data.politicalParty.partyNameBn].politicalPartyCandidateTotalIncome += Number(data.grandTotalIncomeAF);
            }
          }, {});

          for(var i=0; i<outputArray.firstElection.length; i++){
            for(var j=0; j<outputArray.secondElection.length; j++){
              if(outputArray.firstElection[i].partyNameBn==outputArray.secondElection[j].partyNameBn){
                var increaseIncome=((((outputArray.secondElection[j].politicalPartyCandidateTotalIncome)-(outputArray.firstElection[i].politicalPartyCandidateTotalIncome))*100)/(outputArray.firstElection[i].politicalPartyCandidateTotalIncome)).toFixed(0);
                $scope.partyNameBn.push(outputArray.firstElection[i].partyNameBn);
                $scope.candidatesTotalIncome.push(increaseIncome);
              }
            }
          }
        })

        $scope.$on('handleBroadcast', function (event, args) {
          // console.log("in child education");
          $scope.loadChartData();
          $scope.loadChartData2();
        });
        if($scope.featuredElectionId){
          $scope.loadChartData();
          $scope.loadChartData2();
        }
      });


      function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }


/*
      // SVG Map title starts
      $scope.initMapTitles = function () {
          $(function () {
              // wait till load event fires so all resources are available
              $('.tooltip').tooltipster({
                    theme: 'tooltipster-punk',
                    contentAsHTML: true
              });
          });
      };
      $scope.initMapTitles();
      /// SVG Map Title ends
*/
      $scope.countCurrentElection = 0;
      $scope.currentElections = $scope.currentElections;

      $scope.showMoreCurrentElection = function(){
        //console.log($scope.countCurrentElection);
        $scope.countCurrentElection+=10;
         HomeService.getCurrentElectionsWithLimitSkip(10,$scope.countCurrentElection).then(function(data){
           //console.log(data);
          if(data.length){
            $scope.newFetchCurrentElections = data;
            for(var i=0;i<$scope.newFetchCurrentElections.length;i++){
              $scope.currentElections.push($scope.newFetchCurrentElections[i]);
            }

            CoreService.toastSuccess(
              gettextCatalog.getString('Election search successfull'),
              gettextCatalog.getString('See more election from the database'));
          }else{
            CoreService.toastWarning(
              gettextCatalog.getString('Election search finished'),
              gettextCatalog.getString('No more election founded in the database'));
          }
        });
      }

      // this.electionSeat = electionSeat;
      // $scope.candidates=[];
      // this.formFields = HomeService.getFormFilter(currentElections,divisions,electionSeat);
      // //console.log(this.formFields);
      // this.formOptions = {};
      // this.submit = function () {
      //   // console.log(this.electionSeat);
      //   HomeService.getCandidatesWhere(this.electionSeat).then(function (candidates) {
      //     //console.log(candidates);
      //     $scope.candidates = candidates;
      //   });
      // };

      //pagination
      //this.currentElections = currentElections;
      this.currentPage = 1;
      this.currentPage2 = 1;
      this.pageSize = 10;
      this.pageChangeHandler = function(num) {
        // console.log('page changed to ' + num);
      };



      this.goTOTopp= function () {
        $location.hash('myCarousel');
        $anchorScroll();
      }



      $scope.toTheTop = function() {
        $document.scrollTopAnimated(0, 5000).then(function() {
          console && console.log('You just scrolled to the top!');
        });
      }

      //console.log(currentElections);

      var myCarousel = angular.element(document.getElementById('myCarousel'));
      $scope.toSection3 = function() {
        // console.log("go man");
        $document.scrollToElementAnimated(myCarousel);
      }


      var config = {headers:  {
        "Access-Control-Allow-Origin": "*"
      }
      };

      //$http.get('').success(function(news,dews){
      //  console.log(news,dews);
      //});
      //var url='http://rss.cnn.com/rss/cnn_topstories.rss';
      var url='http://shujan.org/feed/';
      var shujanFeedURL='https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fshujan.org%2Ffeed';
      $scope.sujonFeed=[];
      $http.get(shujanFeedURL,{cache:true}).then((res)=>{

        //console.log(res.data.items);
        for(var i=0;i<res.data.items.length;i++){
         // console.log(res.data.items[i]);
          var eachEntries={};
          eachEntries.newsTitle = res.data.items[i].title;
          eachEntries.link=res.data.items[i].link;
          eachEntries.publishedDate=res.data.items[i].publishedDate;
          eachEntries.author=res.data.items[i].author;
          eachEntries.category=res.data.items[i].categories[0];
          eachEntries.thumbImage=res.data.items[i].thumbnail;

//          for(var j=0; j<res.data.responseData.feed.entries[i].mediaGroups[0].contents.length;j++){
//            if(res.data.responseData.feed.entries[i].mediaGroups[0].contents[j].url.indexOf('gravatar.com')==-1)
//              eachEntries.thumbImage=res.data.responseData.feed.entries[i].mediaGroups[0].contents[j].url;
//          }
//
          if(!eachEntries.hasOwnProperty('thumbImage') && eachEntries.thumbImage==''){
            eachEntries.thumbImage='/images/content-placeholder.svg';
          }

          //console.log(eachEntries);
          $scope.sujonFeed.push(eachEntries);
          if(i>5)
            break;
        }
      }).catch(err=>{
        // console.log(err);
      });

      //console.log($scope.sujonFeed);

      var url2='https://votebd.wordpress.com/feed/';
      $scope.politicalViolance=[];
      $http.get('//api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url2),{cache:true}).then((res)=>{
        var resItems=res.data.items;
        for(var i=0;i<resItems.length;i++){
          //console.log(resItems,i);

          var eachEntries={};
          eachEntries.newsTitle = resItems[i].title;
          eachEntries.link=resItems[i].link;
          eachEntries.publishedDate=resItems[i].publishedDate;
          eachEntries.author=resItems[i].author;
          eachEntries.category=resItems[i].categories[0];
          eachEntries.thumbImage=res.data.items[i].thumbnail;

//          for(var j=0; j<res.data.responseData.feed.entries[i].mediaGroups[0].contents.length;j++){
//            if(res.data.responseData.feed.entries[i].mediaGroups[0].contents[j].url.indexOf('gravatar.com')==-1)
//              eachEntries.thumbImage=res.data.responseData.feed.entries[i].mediaGroups[0].contents[j].url;
//          }

          if(!eachEntries.hasOwnProperty('thumbImage')){
             eachEntries.thumbImage='/images/content-placeholder.svg';
          }

          $scope.politicalViolance.push( eachEntries );
          if(i>5)
            break;
        }
      });

      $scope.featuredCandidates=[];
      HomeService.getCandidatesFeatured().then(function (candidates) {
        $scope.featuredCandidates = candidates;
        //console.log($scope.featuredCandidates);
      })

    })
    .value('duScrollOffset', 30);

})();
