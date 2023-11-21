(function () {
  'use strict';
  angular
    .module('com.module.core')
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('router', {
          url: '/router',
          template: '<div class="lockscreen" style="height: 100vh"></div>',
          controller: 'RouteCtrl'
        })
        .state('error', {
          url: '/error',
          template: '<div class="text-center alert alert-danger" style="margin: 100px">An error occurred.</div>'
        })
        .state('app', {
          abstract: true,
          url: '/admin',
          templateUrl: 'modules/core/views/admin.html',
          controller: 'MainCtrl'
        })
        .state('app.home', {
          url: '',
          templateUrl: 'modules/core/views/admin/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('front.search', {
          url        : '/search',
          templateUrl: 'modules/core/views/front.html',
          controller : 'FrontCtrl'
        })
        .state('front', {
          abstract: true,
          url: '/front',
          templateUrl: 'modules/core/views/front.html',
          controller:'FrontCtrl'
        });
      $urlRouterProvider.otherwise('/front');
    });

})();
