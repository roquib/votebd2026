(function () {
  'use strict';
  angular
    .module('com.module.persons')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.persons', {
          abstract: true,
          url: '/persons',
          templateUrl: 'modules/persons/views/main.html'
        })
        .state('app.persons.list', {
          url: '',
          templateUrl: 'modules/persons/views/list.html',
          controllerAs: 'ctrl',
          controller: function (persons) {
            this.persons = persons;

            //pagination
            //this.currentElections = currentElections;
            this.currentPage = 1;
            this.currentPage2 = 1;
            this.pageSize = 10;
            this.pageChangeHandler = function(num) {
              // console.log('page changed to ' + num);
            };
          },
          resolve: {
            persons: function (PersonsService) {
              return PersonsService.getPersons();
            }
          }
        })
        .state('app.persons.add', {
          url: '/add',
          templateUrl: 'modules/persons/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, PersonsService, person) {
            this.person = person;
            this.formFields = PersonsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              PersonsService.upsertPerson(this.person).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            person: function () {
              return {};
            }
          }
        })
        .state('app.persons.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/persons/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, PersonsService, person) {
            this.person = person;
            this.formFields = PersonsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              PersonsService.upsertPerson(this.person).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            person: function ($stateParams, PersonsService) {
              return PersonsService.getPerson($stateParams.id);
            }
          }
        })
        .state('app.persons.view', {
          url: '/:id',
          templateUrl: 'modules/persons/views/view.html',
          controllerAs: 'ctrl',
          controller: function (person) {
            this.person = person;
          },
          resolve: {
            person: function ($stateParams, PersonsService) {
              return PersonsService.getPerson($stateParams.id);
            }
          }
        })
        .state('app.persons.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, PersonsService, person) {
            PersonsService.deletePerson(person.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            person: function ($stateParams, PersonsService) {
              return PersonsService.getPerson($stateParams.id);
            }
          }
        });
    });

})();
