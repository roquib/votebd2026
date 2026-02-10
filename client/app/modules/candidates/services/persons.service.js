(function () {
  'use strict';
  angular
    .module('com.module.candidates')
    .service('PersonsServiceForCandidate', function ($state,$resource, LoopBackAuth, CoreService, User, Person, gettextCatalog) {

      this.getPersons = function () {
        return Person.find({
          filter: {
            limit: 30
          }
        }).$promise;
      };

      this.getPersonByName = function (personName, personFatherName) {
        if(!personName)
          personName='-1';
        if(!personFatherName)
          personFatherName='';
        if(personName){
          console.log("personName", personName);
          console.log("personFatherName", personFatherName);

          return Person.find({
            filter: {
              fields:['id','personNameBn','fatherNameBn'],
              limit: 100,
              where: {
                or: [
                  { personNameEn: {"like": personName,"options":"i"}, fatherNameEn: {"like": personFatherName,"options":"i"}},
                  { personNameBn: {"like": personName,"options":"i"}, fatherNameBn: {"like": personFatherName,"options":"i"}}
                ]
              },
              include: [
                'candidates'
              ]
            }
          }).$promise;
        }

      };

      this.getPerson = function (id) {
        // console.log(id);
        return Person.findById({
          id: id
        }).$promise;

      };

      this.upsertPerson = function (person) {
        // console.log(LoopBackAuth.currentUserId);

        //var cUser = User.getCurrent();
        //console.log(cUser);
        person.createdBy = LoopBackAuth.currentUserId;
        person.modifiedBy = LoopBackAuth.currentUserId;
        //console.log(cUser.id); 56448f887ae51e967b47824c
        //console.log(person);
        //return;
        return Person.upsert(person).$promise;
      };

      this.deletePerson = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Person.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Person deleted'),
                gettextCatalog.getString('Your person is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting person'),
                gettextCatalog.getString('Your person is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function () {
        return [
          {
            key: 'personNameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Person Name (English)'),
              required: true
            }
          },
          {
            key: 'personNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Person Name (Bangla)'),
              required: true
            }
          },
          {
            key: 'genderEn',
            type: 'select',
            templateOptions: {
              label: 'Gender (English)',
              options: [
                {name: 'Male', value: 'male'},
                {name: 'Female', value: 'female'},
                {name: 'Third Gender', value: 'third_gender'}
              ],
              required: true
            }
          },
          {
            key: 'genderBn',
            type: 'select',
            templateOptions: {
              label: 'Gender (Bangla)',
              options: [
                {name: 'পুরুষ', value: 'পুরুষ'},
                {name: 'মহিলা', value: 'মহিলা'},
                {name: 'তৃতীয় লিঙ্গ', value: 'তৃতীয় লিঙ্গ'}
              ],
              required: true
            }
          },
          {
            key: 'fatherNameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Father Name (English)'),
            }
          },
          {
            key: 'fatherNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Father Name (Bangla)'),
            }
          },
          {
            key: 'motherNameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Mother Name (English)'),
            }
          },
          {
            key: 'motherNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Mother Name (Bangla)'),
            }
          },
          {
            key: 'currentAddressBn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Current Address (Bangla)')
            }
          },
          {
            key: 'permanentAddressBn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Permanent Address (Bangla)')
            }
          }
        ];
      };

    });

})();
