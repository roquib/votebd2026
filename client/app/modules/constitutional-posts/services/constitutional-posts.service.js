(function () {
  'use strict';
  angular
    .module('com.module.constitutionalPosts')
    .service('ConstitutionalPostsService', function ($state, CoreService, ConstitutionalPost, gettextCatalog) {

      this.getConstitutionalPosts = function () {
        return ConstitutionalPost.find().$promise;
      };

      this.getConstitutionalPost = function (id) {
        return ConstitutionalPost.findById({
          id: id
        }).$promise;
      };

      this.upsertConstitutionalPost = function (constitutionalPost) {
        return ConstitutionalPost.upsert(constitutionalPost).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Constitutional Post saved'),
              gettextCatalog.getString('Your Constitutional Post is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Constitutional Post '),
              gettextCatalog.getString('This Constitutional Post could no be saved: ') + err
            );
          }
        );
      };

      this.deleteConstitutionalPost = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            ConstitutionalPost.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Constitutional Post deleted'),
                gettextCatalog.getString('Your Constitutional Post is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Constitutional Post'),
                gettextCatalog.getString('Your Constitutional Post is not deleted! ') + err);
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
            key: 'constitutionalPostNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name (Bangla)'),
              required: true
            }
          },
          {
            key: 'constitutionalPostNameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name (English)'),
              required: true
            }
          },
          {
            key: 'detail',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Destription')
            }
          },
          {
            key: 'isPublished',
            type: 'select',
            "defaultValue": true,
            templateOptions: {
              label: 'Publish',
              options: [
                {name: 'Publish', value: true},
                {name: 'Draft', value: false}
              ]
            }
          }
        ];
      };

    });

})();
