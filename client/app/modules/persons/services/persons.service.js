(function () {
  'use strict';
  angular
    .module('com.module.persons')
    .service('PersonsService', function ($state, LoopBackAuth, CoreService, User, Person, gettextCatalog) {

      this.getPersons = function () {
        return Person.find({
          //filter: {
          //  limit: 30
          //}
        }).$promise;
      };

      this.getPerson = function (id) {
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
        return Person.upsert(person).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Person saved'),
              gettextCatalog.getString('Your person is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving person '),
              gettextCatalog.getString('This person could no be saved: ') + err
            );
          }
        );
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
                {name: 'Female', value: 'female'}
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
                {name: 'মহিলা', value: 'মহিলা'}
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
