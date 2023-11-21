var path = require('path');
var PHPUnserialize = require('php-unserialize');
var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.votebdmongo;
var oldds = app.datasources.votebdold;


function IsNumeric(input) {
  return (input - 0) == input && ('' + input).trim().length > 0;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////MERGE profiles_17a (Probable Fund source of election expense)////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

oldds.connector.query("SELECT * FROM profiles_17a WHERE candidate_id<>0 AND publish='publish' limit 0,5000", '', function (err, rows, fields) {
  if (err) {
    console.log(err);
    throw err;
  }

  console.log(rows.length);
  //console.log(rows);

  var iter = 1;
  if (rows.length) {
    var comitbefore = {};
    var arr = [];
    var arr2 = [];
    rows.forEach(function (eachRow) {
      console.log("updating person: ", eachRow.person_id, " ,CandidateId: ", eachRow.candidate_id, " ,FSEEId: ", eachRow.PROFILE_ID);
      //console.log(eachRow);
      var _1total_abcdefg=0;
      var candidateAffidevit = {};
      candidateAffidevit.oldFSEEId = eachRow.PROFILE_ID;
      candidateAffidevit.statusFSEE = eachRow.publish;
      var incomeAmounts,incomeSource;
      //personal income/////////////////////////////////////////////////////////////////////////////////////////////////////////////
      candidateAffidevit._1a_personalIncomeFSEE = [];
      if(eachRow.PERSONAL_INCOME_AMOUNT)
        incomeAmounts = eachRow.PERSONAL_INCOME_AMOUNT.split("###");
      else
        incomeAmounts = [];
      if(eachRow.PERSONAL_INCOME_SOURCE)
        incomeSource = eachRow.PERSONAL_INCOME_SOURCE.split("###");
      else
        incomeSource=[];

      var totalIncome=0;
      var incSorc={};
      var nottttEnptyObj=false;

      if(incomeAmounts.length){
        for(var i=0;i<incomeAmounts.length;i++){
          incSorc={};
          if (incomeAmounts[i]) {
            incSorc.amount=incomeAmounts[i];
            if(IsNumeric(incomeAmounts[i]) && Number(incomeAmounts[i]))
              totalIncome+= parseInt(incomeAmounts[i]);

            nottttEnptyObj=true;
          }
          if(incomeSource[i]){
            incSorc.source=incomeSource[i];
            nottttEnptyObj=true;
          }

          if(nottttEnptyObj)
          candidateAffidevit._1a_personalIncomeFSEE.push(incSorc);
        }
      }

      if(totalIncome){
        candidateAffidevit._1a_personalIncomeTotalFSEE = totalIncome;
        _1total_abcdefg+=totalIncome
      }


      //from loan relative/////////////////////////////////////////////////////////////////////////////////////////////////////////////
      var LOAN_RELATIVE_AMOUNT,LOAN_RELATIVE_NAME,LOAN_RELATIVE_ADDRESS,LOAN_RELATIVE_RELATION,LOAN_RELATIVE_SOURCE;
      if(eachRow.LOAN_RELATIVE_AMOUNT)
        LOAN_RELATIVE_AMOUNT = eachRow.LOAN_RELATIVE_AMOUNT.split("###");
      else
        LOAN_RELATIVE_AMOUNT=[];

      if(eachRow.LOAN_RELATIVE_NAME)
        LOAN_RELATIVE_NAME = eachRow.LOAN_RELATIVE_NAME.split("###");
      else
        LOAN_RELATIVE_NAME=[];

      if(eachRow.LOAN_RELATIVE_ADDRESS)
        LOAN_RELATIVE_ADDRESS = eachRow.LOAN_RELATIVE_ADDRESS.split("###");
      else
        LOAN_RELATIVE_ADDRESS=[];

      if(eachRow.LOAN_RELATIVE_RELATION)
        LOAN_RELATIVE_RELATION = eachRow.LOAN_RELATIVE_RELATION.split("###");
      else
        LOAN_RELATIVE_RELATION=[];

      if(eachRow.LOAN_RELATIVE_SOURCE)
        LOAN_RELATIVE_SOURCE = eachRow.LOAN_RELATIVE_SOURCE.split("###");
      else
        LOAN_RELATIVE_SOURCE=[];

      var notEmptyObj=false;
      totalIncome=0;
      if(LOAN_RELATIVE_AMOUNT.length){
        //console.log(LOAN_RELATIVE_AMOUNT,LOAN_RELATIVE_NAME,LOAN_RELATIVE_ADDRESS,LOAN_RELATIVE_RELATION,LOAN_RELATIVE_SOURCE);

        candidateAffidevit._1b_loanRelativeFSEE = [];
        for(var i=0;i<LOAN_RELATIVE_AMOUNT.length;i++){
          incSorc={};
          if (LOAN_RELATIVE_AMOUNT[i]) {
            incSorc.amount=LOAN_RELATIVE_AMOUNT[i];
            if(IsNumeric(LOAN_RELATIVE_AMOUNT[i]) && Number(LOAN_RELATIVE_AMOUNT[i]))
              totalIncome+= parseInt(LOAN_RELATIVE_AMOUNT[i]);

            notEmptyObj=true;
          }
          if(LOAN_RELATIVE_NAME[i]){
            incSorc.name=LOAN_RELATIVE_NAME[i];
            notEmptyObj=true;
          }
          if(LOAN_RELATIVE_ADDRESS[i]){
            incSorc.address=LOAN_RELATIVE_ADDRESS[i];
            notEmptyObj=true;
          }
          if(LOAN_RELATIVE_RELATION[i]){
            incSorc.relation=LOAN_RELATIVE_RELATION[i];
            notEmptyObj=true;
          }
          if(LOAN_RELATIVE_SOURCE[i]){
            incSorc.source=LOAN_RELATIVE_SOURCE[i];
            notEmptyObj=true;
          }

          if(notEmptyObj)
            candidateAffidevit._1b_loanRelativeFSEE.push(incSorc);
        }
      }

      if(totalIncome){
        candidateAffidevit._1b_loanRelativeTotalFSEE = totalIncome;
        _1total_abcdefg+=totalIncome
      }


      //from free relative/////////////////////////////////////////////////////////////////////////////////////////////////////////////
      var FREE_RELATIVE_AMOUNT,FREE_RELATIVE_NAME,FREE_RELATIVE_ADDRESS,FREE_RELATIVE_RELATION,FREE_RELATIVE_SOURCE;
      if(eachRow.FREE_RELATIVE_AMOUNT)
        FREE_RELATIVE_AMOUNT = eachRow.FREE_RELATIVE_AMOUNT.split("###");
      else
        FREE_RELATIVE_AMOUNT=[];

      if(eachRow.FREE_RELATIVE_NAME)
        FREE_RELATIVE_NAME = eachRow.FREE_RELATIVE_NAME.split("###");
      else
        FREE_RELATIVE_NAME=[];

      if(eachRow.FREE_RELATIVE_ADDRESS)
        FREE_RELATIVE_ADDRESS = eachRow.FREE_RELATIVE_ADDRESS.split("###");
      else
        FREE_RELATIVE_ADDRESS=[];

      if(eachRow.FREE_RELATIVE_RELATION)
        FREE_RELATIVE_RELATION = eachRow.FREE_RELATIVE_RELATION.split("###");
      else
        FREE_RELATIVE_RELATION=[];

      if(eachRow.FREE_RELATIVE_SOURCE)
        FREE_RELATIVE_SOURCE = eachRow.FREE_RELATIVE_SOURCE.split("###");
      else
        FREE_RELATIVE_SOURCE=[];

      var notEmptyObj3=false;
      totalIncome=0;
      if(FREE_RELATIVE_AMOUNT.length){
        //console.log(FREE_RELATIVE_AMOUNT,FREE_RELATIVE_NAME,FREE_RELATIVE_ADDRESS,FREE_RELATIVE_RELATION,FREE_RELATIVE_SOURCE);

        candidateAffidevit._1c_freeRelativeFSEE = [];
        for(var i=0;i<FREE_RELATIVE_AMOUNT.length;i++){
          incSorc={};
          if (FREE_RELATIVE_AMOUNT[i]) {
            incSorc.amount=FREE_RELATIVE_AMOUNT[i];
            if(IsNumeric(FREE_RELATIVE_AMOUNT[i]) && Number(FREE_RELATIVE_AMOUNT[i]))
              totalIncome+= parseInt(FREE_RELATIVE_AMOUNT[i]);

            notEmptyObj3=true;
          }
          if(FREE_RELATIVE_NAME[i]){
            incSorc.name=FREE_RELATIVE_NAME[i];
            notEmptyObj3=true;
          }
          if(FREE_RELATIVE_ADDRESS[i]){
            incSorc.address=FREE_RELATIVE_ADDRESS[i];
            notEmptyObj3=true;
          }
          if(FREE_RELATIVE_RELATION[i]){
            incSorc.relation=FREE_RELATIVE_RELATION[i];
            notEmptyObj3=true;
          }
          if(FREE_RELATIVE_SOURCE[i]){
            incSorc.source=FREE_RELATIVE_SOURCE[i];
            notEmptyObj3=true;
          }

          if(notEmptyObj3)
            candidateAffidevit._1c_freeRelativeFSEE.push(incSorc);
        }
      }

      if(totalIncome){
        candidateAffidevit._1c_freeRelativeTotalFSEE = totalIncome;
        _1total_abcdefg+=totalIncome
      }

      //from loan man/////////////////////////////////////////////////////////////////////////////////////////////////////////////
      var LOAN_MAN_AMOUNT,LOAN_MAN_NAME,LOAN_MAN_ADDRESS;
      if(eachRow.LOAN_MAN_AMOUNT)
        LOAN_MAN_AMOUNT = eachRow.LOAN_MAN_AMOUNT.split("###");
      else
        LOAN_MAN_AMOUNT=[];

      if(eachRow.LOAN_MAN_NAME)
        LOAN_MAN_NAME = eachRow.LOAN_MAN_NAME.split("###");
      else
        LOAN_MAN_NAME=[];

      if(eachRow.LOAN_MAN_ADDRESS)
        LOAN_MAN_ADDRESS = eachRow.LOAN_MAN_ADDRESS.split("###");
      else
        LOAN_MAN_ADDRESS=[];

      var notEmptyObj4=false;
      totalIncome=0;
      if(LOAN_MAN_AMOUNT.length){
        //console.log(LOAN_MAN_AMOUNT,LOAN_MAN_NAME,LOAN_MAN_ADDRESS);

        candidateAffidevit._1d_loanManFSEE = [];
        for(var i=0;i<LOAN_MAN_AMOUNT.length;i++){
          incSorc={};
          if (LOAN_MAN_AMOUNT[i]) {
            incSorc.amount=LOAN_MAN_AMOUNT[i];
            if(IsNumeric(LOAN_MAN_AMOUNT[i]) && Number(LOAN_MAN_AMOUNT[i]))
              totalIncome+= parseInt(LOAN_MAN_AMOUNT[i]);

            notEmptyObj4=true;
          }
          if(LOAN_MAN_NAME[i]){
            incSorc.name=LOAN_MAN_NAME[i];
            notEmptyObj4=true;
          }
          if(LOAN_MAN_ADDRESS[i]){
            incSorc.address=LOAN_MAN_ADDRESS[i];
            notEmptyObj4=true;
          }

          if(notEmptyObj4)
            candidateAffidevit._1d_loanManFSEE.push(incSorc);
        }
      }

      if(totalIncome){
        candidateAffidevit._1d_loanManTotalFSEE = totalIncome;
        _1total_abcdefg+=totalIncome
      }

      //from free man/////////////////////////////////////////////////////////////////////////////////////////////////////////////
      var FREE_MAN_AMOUNT,FREE_MAN_NAME,FREE_MAN_ADDRESS;
      if(eachRow.FREE_MAN_AMOUNT)
        FREE_MAN_AMOUNT = eachRow.FREE_MAN_AMOUNT.split("###");
      else
        FREE_MAN_AMOUNT=[];

      if(eachRow.FREE_MAN_NAME)
        FREE_MAN_NAME = eachRow.FREE_MAN_NAME.split("###");
      else
        FREE_MAN_NAME=[];

      if(eachRow.FREE_MAN_ADDRESS)
        FREE_MAN_ADDRESS = eachRow.FREE_MAN_ADDRESS.split("###");
      else
        FREE_MAN_ADDRESS=[];

      var notEmptyObj4=false;
      totalIncome=0;
      if(FREE_MAN_AMOUNT.length){
        //console.log(FREE_MAN_AMOUNT,FREE_MAN_NAME,FREE_MAN_ADDRESS);

        candidateAffidevit._1e_freeManFSEE = [];
        for(var i=0;i<FREE_MAN_AMOUNT.length;i++){
          incSorc={};
          if (FREE_MAN_AMOUNT[i]) {
            incSorc.amount=FREE_MAN_AMOUNT[i];
            if(IsNumeric(FREE_MAN_AMOUNT[i]) && Number(FREE_MAN_AMOUNT[i]))
              totalIncome+= parseInt(FREE_MAN_AMOUNT[i]);

            notEmptyObj4=true;
          }
          if(FREE_MAN_NAME[i]){
            incSorc.name=FREE_MAN_NAME[i];
            notEmptyObj4=true;
          }
          if(FREE_MAN_ADDRESS[i]){
            incSorc.address=FREE_MAN_ADDRESS[i];
            notEmptyObj4=true;
          }

          if(notEmptyObj4)
            candidateAffidevit._1e_freeManFSEE.push(incSorc);
        }
      }

      if(totalIncome){
        candidateAffidevit._1e_freeManTotalFSEE = totalIncome;
        _1total_abcdefg+=totalIncome
      }


      //from free party/////////////////////////////////////////////////////////////////////////////////////////////////////////////
      var FREE_PARTY_AMOUNT,FREE_PARTY_NAME,FREE_PARTY_OFFICE;
      if(eachRow.FREE_PARTY_AMOUNT)
        FREE_PARTY_AMOUNT = eachRow.FREE_PARTY_AMOUNT.split("###");
      else
        FREE_PARTY_AMOUNT=[];

      if(eachRow.FREE_PARTY_NAME)
        FREE_PARTY_NAME = eachRow.FREE_PARTY_NAME.split("###");
      else
        FREE_PARTY_NAME=[];

      if(eachRow.FREE_PARTY_OFFICE)
        FREE_PARTY_OFFICE = eachRow.FREE_PARTY_OFFICE.split("###");
      else
        FREE_PARTY_OFFICE=[];

      var notEmptyObj4=false;
      totalIncome=0;
      if(FREE_PARTY_AMOUNT.length){
        //console.log(FREE_PARTY_AMOUNT,FREE_PARTY_NAME,FREE_PARTY_OFFICE);

        candidateAffidevit._1f_freePartyFSEE = [];
        for(var i=0;i<FREE_PARTY_AMOUNT.length;i++){
          incSorc={};
          if (FREE_PARTY_AMOUNT[i]) {
            incSorc.amount=FREE_PARTY_AMOUNT[i];
            if(IsNumeric(FREE_PARTY_AMOUNT[i]) && Number(FREE_PARTY_AMOUNT[i]))
              totalIncome+= parseInt(FREE_PARTY_AMOUNT[i]);

            notEmptyObj4=true;
          }
          if(FREE_PARTY_NAME[i]){
            incSorc.name=FREE_PARTY_NAME[i];
            notEmptyObj4=true;
          }
          if(FREE_PARTY_OFFICE[i]){
            incSorc.office=FREE_PARTY_OFFICE[i];
            notEmptyObj4=true;
          }

          if(notEmptyObj4)
            candidateAffidevit._1f_freePartyFSEE.push(incSorc);
        }
      }

      if(totalIncome){
        candidateAffidevit._1f_freePartyTotalFSEE = totalIncome;
        _1total_abcdefg+=totalIncome
      }

      //from free others/////////////////////////////////////////////////////////////////////////////////////////////////////////////
      var FREE_OTHERS_AMOUNT,FREE_OTHERS_NAME,FREE_OTHERS_ADDRESS;
      if(eachRow.FREE_OTHERS_AMOUNT)
        FREE_OTHERS_AMOUNT = eachRow.FREE_OTHERS_AMOUNT.split("###");
      else
        FREE_OTHERS_AMOUNT=[];

      if(eachRow.FREE_OTHERS_NAME)
        FREE_OTHERS_NAME = eachRow.FREE_OTHERS_NAME.split("###");
      else
        FREE_OTHERS_NAME=[];

      if(eachRow.FREE_OTHERS_ADDRESS)
        FREE_OTHERS_ADDRESS = eachRow.FREE_OTHERS_ADDRESS.split("###");
      else
        FREE_OTHERS_ADDRESS=[];

      var notEmptyObj4=false;
      totalIncome=0;
      if(FREE_OTHERS_AMOUNT.length){
        //console.log(FREE_OTHERS_AMOUNT,FREE_OTHERS_NAME,FREE_OTHERS_ADDRESS);

        candidateAffidevit._1g_freeOtherFSEE = [];
        for(var i=0;i<FREE_OTHERS_AMOUNT.length;i++){
          incSorc={};
          if (FREE_OTHERS_AMOUNT[i]) {
            incSorc.amount=FREE_OTHERS_AMOUNT[i];
            if(IsNumeric(FREE_OTHERS_AMOUNT[i]) && Number(FREE_OTHERS_AMOUNT[i]))
              totalIncome+= parseInt(FREE_OTHERS_AMOUNT[i]);

            notEmptyObj4=true;
          }
          if(FREE_OTHERS_NAME[i]){
            incSorc.name=FREE_OTHERS_NAME[i];
            notEmptyObj4=true;
          }
          if(FREE_OTHERS_ADDRESS[i]){
            incSorc.address=FREE_OTHERS_ADDRESS[i];
            notEmptyObj4=true;
          }

          if(notEmptyObj4)
            candidateAffidevit._1g_freeOtherFSEE.push(incSorc);
        }
      }

      if(totalIncome){
        candidateAffidevit._1g_freeOtherTotalFSEE = totalIncome;
        _1total_abcdefg+=totalIncome
      }

      if(_1total_abcdefg)
        candidateAffidevit._1total_abcdefgFSEE=_1total_abcdefg;

      if (eachRow.submission_date && (new Date(eachRow.submission_date) != "Invalid Date")) {
        candidateAffidevit.submissionDateFSEE = eachRow.submission_date;
        candidateAffidevit.submissionDateTimestampFSEE = eachRow.submission_date.getTime(); //save as timestamp
        candidateAffidevit.createdFSEE = eachRow.submission_date;
        candidateAffidevit.modifiedFSEE = eachRow.submission_date;
      }

      candidateAffidevit.createdByFSEE = eachRow.UPDATEDBY;
      candidateAffidevit.modifiedByFSEE = eachRow.UPDATEDBY;

      candidateAffidevit.isPublishedFSEE = true;

      //if(eachRow.PROFILE_ID==1724)
      //  console.log(candidateAffidevit);

      app.models.candidate.updateAll({oldId: eachRow.candidate_id}, candidateAffidevit, function (errr, info) {
        if (errr)
          throw errr;

        console.log(info, iter++);
      });

    })
  }


  oldds.disconnect();
});


