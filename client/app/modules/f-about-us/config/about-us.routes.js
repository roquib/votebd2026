(function () {
  'use strict';
  angular
    .module('com.module.fAboutUs')
    .config(function ($stateProvider) {
      $stateProvider
        .state('front.aboutUs', {
          abstract: true,
          url: '/about-us',
          templateUrl: 'modules/f-about-us/views/main.html',
          controller: 'AboutUsCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.aboutUs.howWeWork', {
          url: '/how-we-work',
          templateUrl: 'modules/f-about-us/views/how-we-work.html',
          controller: 'AboutUsHowWeWorkCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.aboutUs.purposeObjective', {
          url: '/purpose-objective',
          templateUrl: 'modules/f-about-us/views/purpose-objective.html',
          controller: 'AboutUsPurposeObjectiveCtrl',
          controllerAs: 'ctrl'
        })
        .state('front.aboutUs.ourAchievements', {
          url: '/our-achievements',
          templateUrl: 'modules/f-about-us/views/our-achievements.html',
          controller: 'AboutUsOurAchievementsCtrl',
          controllerAs: 'ctrl'
        })

      .state('front.aboutUs.join-us', {
        url: '/join-us',
        templateUrl: 'modules/f-about-us/views/join-us.html',
        controller: 'JoinUsCtrl',
        controllerAs: 'ctrl'
      })
      .state('front.aboutUs.contact-us', {
        url: '/contact-us',
        templateUrl: 'modules/f-about-us/views/contact-us.html',
        controller: 'ContactUsCtrl',
        controllerAs: 'ctrl'
      });
    }
  );

})();
