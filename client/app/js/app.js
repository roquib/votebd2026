
(function () {
  'use strict';
  /**
   * @ngdoc overview
   * @name loopbackApp
   * @description
   * # loopbackApp
   *
   * Main module of the application.
   */
  angular
    .module('loopbackApp', [
      'angular-loading-bar',
      'angular.filter',
      'angularBootstrapNavTree',
      'angularFileUpload',
      'btford.markdown',
      'oitozero.ngSweetAlert',
      'config',
      'formly',
      'formlyBootstrap',
      'lbServices',
      'monospaced.elastic',
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.bootstrap',
      'ui.codemirror',
      'ui.gravatar',
      'ui.grid',
      'ui.router',
      'toasty',
      'autofields',
      'gettext',
      'angular-underscore/filters',
      'schemaForm',
      'ui.select',
      'duScroll',
      'jkuri.gallery',
      'angularUtils.directives.dirPagination',
      'ui.sortable',
      'com.module.core',
      'com.module.about',
      'com.module.divisions',
      'com.module.districts',
      'com.module.upazillas',
      'com.module.unions',
      'com.module.elections',
      'com.module.currentElections',
      'com.module.seats',
      'com.module.electionSeats',
      'com.module.constitutionalPosts',
      'com.module.politicalParties',
      'com.module.politicalPartyExpenses',
      'com.module.candidatePosts',
      'com.module.electionCandidatePosts',
      'com.module.persons',
      'com.module.candidates',
      'com.module.browser',
      'com.module.events',
      'com.module.files',
      'com.module.entry',
      'com.module.notes',
      'com.module.pages',
      'com.module.posts',
      'com.module.products',
      'com.module.sandbox',
      'com.module.users',
      'com.module.settings',
      'com.module.fHome',
      'com.module.fCandidateSearch',
      'com.module.fCandidateAnalysis',
      'com.module.fAboutUs',
      'com.module.fPoliticalParty',
      'com.module.fCandidateComparison',
      'com.module.fElectionAnalysis',
      'com.module.fElectionResult',
      'com.module.constituencies',
      'com.module.candidatechart',
      'com.module.bannerSettings'
    ])
    .value('duScrollDuration', 2000)
    .value('duScrollOffset', 30)
    .config(['$locationProvider',
      function ($locationProvider) {

        // html 5 mode is by default turned off, so be sure
        // that it is not turned on somewhere
        //console.log("aisilo hash e");

        //$locationProvider.html5Mode({enabled:false});
      }])
    .run(function ($rootScope, $cookies, gettextCatalog) {

      //console.log('$location');
      //$location.hash('##');
      //console.log($location);

      $rootScope.locales = {
        //'de': {
        //  lang: 'de',
        //  country: 'DE',
        //  name: gettextCatalog.getString('German')
        //},
        'en': {
          lang: 'en',
          country: 'US',
          name: gettextCatalog.getString('English')
        },
        'bn_BD': {
          lang: 'bn_BD',
          country: 'BD',
          name: gettextCatalog.getString('Bangla')
        },
        //'es_MX': {
        //  lang: 'es_MX',
        //  country: 'MX',
        //  name: gettextCatalog.getString('Spanish')
        //},
        //'fr': {
        //  lang: 'fr',
        //  country: 'FR',
        //  name: gettextCatalog.getString('Français')
        //},
        //'nl': {
        //  lang: 'nl',
        //  country: 'NL',
        //  name: gettextCatalog.getString('Dutch')
        //},
        //'pt-BR': {
        //  lang: 'pt_BR',
        //  country: 'BR',
        //  name: gettextCatalog.getString('Portuguese Brazil')
        //},
        //'ru_RU': {
        //  lang: 'ru_RU',
        //  country: 'RU',
        //  name: gettextCatalog.getString('Russian')
        //}
      };

      var lang = $cookies.lang || navigator.language || navigator.userLanguage;

      $rootScope.locale = $rootScope.locales[lang];

      if ($rootScope.locale === undefined) {
        $rootScope.locale = $rootScope.locales[lang];
        if ($rootScope.locale === undefined) {
          $rootScope.locale = $rootScope.locales['bn_BD'];
        }
      }

      gettextCatalog.setCurrentLanguage($rootScope.locale.lang);

    })
    .run(function (formlyConfig) {
      /*
       ngModelAttrs stuff
       */
      var ngModelAttrs = {};

      function camelize (string) {
        string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
          return chr ? chr.toUpperCase() : '';
        });
        // Ensure 1st char is always lowercase
        return string.replace(/^([A-Z])/, function (match, chr) {
          return chr ? chr.toLowerCase() : '';
        });
      }

      /*
       timepicker
       */
      ngModelAttrs = {};

      // attributes
      angular.forEach([
        'meridians',
        'readonly-input',
        'mousewheel',
        'arrowkeys'
      ], function (attr) {
        ngModelAttrs[camelize(attr)] = {attribute: attr};
      });

      // bindings
      angular.forEach([
        'hour-step',
        'minute-step',
        'show-meridian'
      ], function (binding) {
        ngModelAttrs[camelize(binding)] = {bound: binding};
      });

      formlyConfig.setType({
        name: 'multiselect',
        extends: 'select',
        defaultOptions: {
          ngModelAttrs: {
            'true': {
              value: 'multiple'
            }
          }
        }
      });

      formlyConfig.setType({
        name: 'timepicker',
        template: '<timepicker ng-model="model[options.key]"></timepicker>',
        wrapper: [
          'bootstrapLabel',
          'bootstrapHasError'
        ],
        defaultOptions: {
          ngModelAttrs: ngModelAttrs,
          templateOptions: {
            timepickerOptions: {}
          }
        }
      });

      formlyConfig.setType({
        name: 'datepicker',
        template: '<datepicker ng-model="model[options.key]" ></datepicker>',
        wrapper: [
          'bootstrapLabel',
          'bootstrapHasError'
        ],
        defaultOptions: {
          ngModelAttrs: ngModelAttrs,
          templateOptions: {
            datepickerOptions: {}
          }
        }
      });

      formlyConfig.setType({
        name: 'custom',
        templateUrl: 'custom.html'
      });

      formlyConfig.setType({
        name: 'repeatSection',
        templateUrl: 'repeatSection.html',
        controller: function($scope) {
          $scope.formOptions = {formState: $scope.formState};
          $scope.addNew = addNew;

          $scope.copyFields = copyFields;


          function copyFields(fields) {
            fields = angular.copy(fields);
            addRandomIds(fields);
            return fields;
          }

          function addNew() {
            $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
            var repeatsection = $scope.model[$scope.options.key];
            var lastSection = repeatsection[repeatsection.length - 1];
            var newsection = {};
            if (lastSection) {
              newsection = angular.copy(lastSection);
            }
            repeatsection.push(newsection);
          }

          function addRandomIds(fields) {
            unique++;
            angular.forEach(fields, function(field, index) {
              if (field.fieldGroup) {
                addRandomIds(field.fieldGroup);
                return; // fieldGroups don't need an ID
              }

              if (field.templateOptions && field.templateOptions.fields) {
                addRandomIds(field.templateOptions.fields);
              }

              field.id = field.id || (field.key + '_' + index + '_' + unique + getRandomInt(0, 9999));
            });
          }

          function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
          }
        }
      });

    });

})();
