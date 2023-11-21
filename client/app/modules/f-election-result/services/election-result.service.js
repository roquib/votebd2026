(function () {
  'use strict';
  angular
    .module('com.module.fElectionResult')
    .service('ElectionResultService', function (CoreService, Candidate,PoliticalParty, $filter, gettextCatalog, $rootScope) {
      this.verifyFilterData = function (criteria) {
        var whereCriteria = {};
        if (criteria.hasOwnProperty("currentElectionId") && criteria.currentElectionId)
          whereCriteria.currentElectionId = criteria.currentElectionId;
        else
          return false;

          if (criteria.hasOwnProperty("politicalPartyId") && criteria.politicalPartyId) {
            if (criteria.politicalPartyId !== '-1') {
              whereCriteria.politicalPartyId = criteria.politicalPartyId;
            }

          } else {
            //return false;
          }

        if (criteria.hasOwnProperty("divisionId") && criteria.divisionId) {
          if (criteria.divisionId !== '-1') {
            whereCriteria.divisionId = criteria.divisionId;
          }

        } else {
          //return false;
        }

        if (criteria.hasOwnProperty("districtId") && criteria.districtId) {
          if (criteria.districtId !== '-1') {
            whereCriteria.districtId = criteria.districtId;
          }

        } else {
          //return false;
        }

        //
        //if(criteria.hasOwnProperty("upazillaId") && criteria.upazillaId)
        //  whereCriteria.upazillaId = criteria.upazillaId;
        //
        //if(criteria.hasOwnProperty("unionId") && criteria.unionId)
        //  whereCriteria.unionId = criteria.unionId;
        if (criteria.hasOwnProperty("electionSeatId") && criteria.electionSeatId) {
          if (criteria.electionSeatId !== '-1') {
            whereCriteria.electionSeatId = criteria.electionSeatId;
          }

        } else {
          //return false;
        }
        if (criteria.hasOwnProperty("candidateType") && criteria.candidateType) {
          if (criteria.candidateType === 'possible' || criteria.candidateType === 'eligible' || criteria.candidateType === 'withdrawn') {
            whereCriteria.candidateType = criteria.candidateType;
          } else if (criteria.candidateType === 'elected' || criteria.candidateType === 'notelected') {
            whereCriteria.resultType = criteria.candidateType;
          }
        } else {
          //return false;
        }

        if (criteria.hasOwnProperty("electionCandidatePostId") && criteria.electionCandidatePostId) {
          if (criteria.electionCandidatePostId !== '-1') {
            whereCriteria.electionCandidatePostId = criteria.electionCandidatePostId;
          }

        } else {
          //return false;
        }
        //console.log(whereCriteria);

        return whereCriteria;
        //return false;
      };
      this.getElectedCandidate=  function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getElectedCandidates({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getElectedCandidateByCw=  function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getElectedCandidatesByCw({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getCandidateFormSubmitStatistics=  function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getCandidateFormSubmitStatistics({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };      this.getCandidateFormReviewStatistics=  function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getCandidateFormEntryReviewStatistics({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getCandidateFormEntryStatistics=  function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getCandidateFormEntryStatistics({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getCandidateList=  function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getCandidateLists({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
      this.getCandidateInfo=  function (electionSeatCriteria, limit) {
        var whereCriteria = this.verifyFilterData(electionSeatCriteria);
        // console.log(limit);

        return Candidate.getCandidateLists({
            whereCriteria: whereCriteria,
            limit: limit,
            type: $rootScope.locale.lang
          }
        ).$promise;
      };
    });

})();
