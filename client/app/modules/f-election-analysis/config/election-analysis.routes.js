(function () {
  'use strict';
  angular
    .module('com.module.fElectionAnalysis')
    .config(function ($stateProvider) {
      $stateProvider
        .state('front.electionAnalysis.Among-The-Candidates-In-A-Constituency-About-How-Much-Money-Spent', {
          url: '/Among-The-Candidates-In-A-Constituency-About-How-Much-Money-Spent',
          templateUrl: 'modules/f-election-analysis/views/eerb-analysis/Among-The-Candidates-In-A-Constituency-About-How-Much-Money-Spent.html',
          controller: 'AmongTheCandidatesInAConstituencyAboutHowMuchMoneySpentCrtl',
          controllerAs: 'ctrl'
        }).state('front.electionAnalysis.Among-All-The-Candidates-For-300-Constituencies-About-Money-Spent-Percentage', {
          url: '/Among-All-The-Candidates-For-300-Constituencies-About-Money-Spent-Percentage',
          templateUrl: 'modules/f-election-analysis/views/eerb-analysis/Among-All-The-Candidates-For-300-Constituencies-About-Money-Spent-Percentage.html',
          controller: 'AmongAllTheCandidatesFor300ConstituenciesAboutMoneySpentPercentageCrtl',
          controllerAs: 'ctrl'
        }).state('front.electionAnalysis.Between-The-Elected-Male-And-Female-Candidates-On-Average-Campaign-Expenses', {
          url: '/Between-The-Elected-Male-And-Female-Candidates-On-Average-Campaign-Expenses',
          templateUrl: 'modules/f-election-analysis/views/eerb-analysis/Between-The-Elected-Male-And-Female-Candidates-On-Average-Campaign-Expenses.html',
          controller: 'BetweenTheElectedMaleAndFemaleCandidatesOnAverageCampaignExpensesCrtl',
          controllerAs: 'ctrl'
        });
    }
  );

})();


























