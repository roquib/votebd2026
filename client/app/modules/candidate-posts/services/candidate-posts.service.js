(function () {
  'use strict';
  angular
    .module('com.module.candidatePosts')
    .service('CandidatePostsService', function (CoreService, CandidatePost, gettextCatalog) {

      this.getCandidatePosts = function () {
        return CandidatePost.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getCandidatePost = function (id) {
        return CandidatePost.findById({
          id: id
        }).$promise;
      };

      this.upsertCandidatePost = function (candidatePost) {
        return CandidatePost.upsert(candidatePost).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Candidate Post saved'),
              gettextCatalog.getString('Your Candidate Post is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Ccandidate Post '),
              gettextCatalog.getString('This Candidate Post could no be saved: ') + err
            );
          }
        );
      };

      this.deleteCandidatePost = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            CandidatePost.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Candidate Post deleted'),
                gettextCatalog.getString('Your Candidate Post is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Candidate Post'),
                gettextCatalog.getString('Your Candidate Post is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function (elections) {
        var electionOptions = elections.map(function (election) {
          return {
            name: election.nameBn,
            value: election.id
          };
        });
        return [
          {
            key: 'postNameBn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Post Name (Bangla)'),
              required: true
            }
          },
          {
            key: 'postNameEn',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Post Name (English)'),
              required: true
            }
          },
          {
            key: 'electionId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Election'),
              required: true,
              options: electionOptions
            }
          },
          {
            key: 'postDescResponsibilityBn',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Post Responsibility (Bangla)')
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
