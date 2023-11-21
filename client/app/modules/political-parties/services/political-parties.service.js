(function () {
  'use strict';
  angular
    .module('com.module.politicalParties')
    .service('PoliticalPartiesService', function ($state, CoreService, PoliticalParty, gettextCatalog) {

      this.getPoliticalParties = function () {
        return PoliticalParty.find().$promise;
      };

      this.getPoliticalParty = function (id) {
        return PoliticalParty.findById({
          id: id
        }).$promise;
      };

      this.upsertPoliticalParty = function (constitutionalPost) {
        return PoliticalParty.upsert(constitutionalPost).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Political Party saved'),
              gettextCatalog.getString('Your Political Party is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Political Party '),
              gettextCatalog.getString('This Political Party could no be saved: ') + err
            );
          }
        );
      };

      this.deletePoliticalParty = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            PoliticalParty.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Political Party deleted'),
                gettextCatalog.getString('Your Political Party is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Political Party'),
                gettextCatalog.getString('Your Political Party is not deleted! ') + err);
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
            key: 'oldId',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Old Id')
            }
          },
          {
            key: 'partyNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Political Party Name (Bangla)'),
              required: true
            }
          },
          {
            key: 'partyNameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Political Party Name (English)'),
              required: true
            }
          },
          {
            key: 'detail',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Destription')
            }
          },{
            key: 'estDate',
            type: 'datepicker',
            templateOptions: {
              label: 'Est. Date',
              type: 'text',
              datepickerPopup: 'dd-MMMM-yyyy',
              datepickerOptions: {
                format: 'dd-MMMM-yyyy'
              }
            }
          },
          {
            key: 'chairpersonNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Chairperson Name (Bangla)')
            }
          },
          {
            key: 'gsNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('General Secretary Name (Bangla)')
            }
          },
          {
            key: 'partyConstitutionBn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Constitutional Policy (Bangla)')
            }
          },
          {
            key: 'politicalPartyMarka',
            type: 'hidden',
             "hide": true,
            templateOptions: {
              label: gettextCatalog.getString('Political Party Marka')
            }
          }
        ];
      };

    });

})();
